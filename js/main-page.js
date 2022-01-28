const CATEGORY_LIST = [
    "ui",
    "ux",
    "enhancement",
    "bug",
    "feature",
    "all"
]
const CATEGORY_FILTER_IDS = {
    "ui": "ui-filter",
    "ux": "ux-filter",
    "enhancement": "enchancement-filter",
    "bug": "bug-filter",
    "feature": "feature-filter",
    "all": "all-filter",
}
const STAUSES_LIST = [
    "suggestion",
    "planned",
    "in-progress",
    "live"
]

const SORT_MENU_IDS = [
    "most-upvotes",
    "least-upvotes",
    "most-comments",
    "least-comments"
]

const SORT_TITLES_DICT = {
    "most-upvotes": "Most Upvotes",
    "least-upvotes": "Least Upvotes",
    "most-comments": "Most Comments",
    "least-comments": "Least Comments",
}

let CURRENT_CATEGORY = "all";

let CURRENT_SORT_OPTION_ID = "most-upvotes";

//---Load data from Database---
if (sessionStorage.getItem(SESSION_STORAGE_SUGGESTIONS_KEY) != null) {
    SUGGESTIONS_DATA = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_SUGGESTIONS_KEY));
} else {
    SUGGESTIONS_DATA = [];
}

if (sessionStorage.getItem(SESSION_STORAGE_CURRENT_USER_KEY) != null) {
    C_USER = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_CURRENT_USER_KEY));
} else {
    C_USER = {};
}

//---MAIN PAGE CODE---

updateMainPage();

//---Onklick for filtering by tag optoins on the main page
CATEGORY_LIST.forEach(function (element, index, array) {
    let filter = document.getElementById(CATEGORY_FILTER_IDS[element]);
    filter.onclick = function(){
        let current_filter = document.getElementById(CATEGORY_FILTER_IDS[CURRENT_CATEGORY]);
        current_filter.classList.remove("tag_active");
        CURRENT_CATEGORY = element;
        filter.classList.add("tag_active");
        updateMainPage();
    }
})

let sort_button = document.getElementsByClassName("body-container__sort-header")[0];
let sort_menu = document.getElementsByClassName("body-container__sort-menu")[0];

//---Onklick for sort menue to open and close sort options---
sort_button.onclick = function(){

    if(sort_menu.style.display === "block"){
        sort_menu.style.display = "none";
    } else {
        sort_menu.style.display = "block";
    }
}

//---Onklick for sort menue to open and close sort options---
SORT_MENU_IDS.forEach(function(element, index, array){

    let menu_item = document.getElementById(element);

    menu_item.onclick = function(){

        let current_option = document.getElementById(CURRENT_SORT_OPTION_ID);

        current_option.classList.remove("sort-menu_active");

        CURRENT_SORT_OPTION_ID = element;

        menu_item.classList.add("sort-menu_active");
        sort_menu.style.display = "none";

        updateMainPage();
        updateSortTitle();
    }
})

//---Oncklick for all Add new suggestion buttons on the main page---
let add_suggestion_button = document.getElementsByClassName("add-suggestion-button");
Array.from(add_suggestion_button).forEach(function(item){
    item.onclick = function(){
        window.location.href = 'feedback-new.html';
    }
})

//--Burger onclick---



//---Mobile Resolution changing---

window.addEventListener("resize", function(){
  if (window.innerWidth < 710) {
      rebuildMainPageHeaderForMobile();
      rebuildAllSuggestionsDivsForMobile();
      addBurgerOnclickAction();
  } else {
      rebuildMainPageHeaderForNotMobile();
      rebuildAllSuggestionsDivsForNotMobile();
  }
});

//-----Main Page Updates functions------------
function updateMainPage(){

    let showed_items_counter = 0;
    let statuses_stats = [0, 0, 0];

    clearMainSuggestionsList();

    if (SUGGESTIONS_DATA){
        let suggestions_to_show = filterSuggestionsByCategory(SUGGESTIONS_DATA, CURRENT_CATEGORY);

        suggestions_to_show = sortSuggestions(suggestions_to_show);

        if(suggestions_to_show.length) {
            suggestions_to_show.forEach(function(element) {
                addSuggestionToMainBody(element);
                statuses_stats = updateStatsNumbers(statuses_stats, element);
                showed_items_counter += 1;
            })
        } else {
            showEmptySuggestionBlock();
        }
    } else {
        showEmptySuggestionBlock();
    }

    let votings = document.getElementsByClassName("suggestion__voting");
    let suggestions = document.getElementsByClassName("suggestion__center-part");

    Array.from(suggestions).forEach(function(item){
        item.onclick = function(){
            setCurrentSuggestionId(item.parentElement.id);
            console.log(item.parentElement.id);
            console.log(getCurrentSuggestionId());
            window.location.href = 'feedback-detail.html';
        }
    })

    Array.from(votings).forEach(function(item){
        item.onclick = function(){
            changeVoteStatus(item);
        }
    })

    updateRoadmapStats(statuses_stats[0], statuses_stats[1], statuses_stats[2]);
    updateNumberOfShowedSuggestions(showed_items_counter);

    if (window.innerWidth < 710) {
        rebuildMainPageHeaderForMobile();
        rebuildAllSuggestionsDivsForMobile();
        addBurgerOnclickAction();
    } else {
        rebuildMainPageHeaderForNotMobile();
        rebuildAllSuggestionsDivsForNotMobile();
    }
}

function updateSortTitle(){
    let options_title_text = document.getElementById("sort-title-text");
    options_title_text.innerText = SORT_TITLES_DICT[CURRENT_SORT_OPTION_ID];
}

function updateNumberOfShowedSuggestions(suggestions_number){
    document.getElementsByClassName("body-container__number")[0].innerHTML = suggestions_number;

}

function updateRoadmapStats(planned = 0, in_progress = 0, live = 0){
    let planned_box = document.getElementById("planned-number");
    let in_progress_box = document.getElementById("in-progress-number");
    let live_box = document.getElementById("live-number");

    planned_box.innerHTML = planned;
    in_progress_box.innerHTML = in_progress;
    live_box.innerHTML = live;
}

function updateStatsNumbers(stats_array, item){
    let res_array = stats_array;
    if (item['status'] == "planned") {
        res_array[0] += 1;
    } else if (item['status'] == "in-progress"){
        res_array[1] += 1;
    } else if (item['status'] == "live"){
        res_array[2] += 1;
    }
    return res_array;
}

function clearMainSuggestionsList() {
    hideEmptySuggestionBlock();
    let suggestions_list = document.getElementsByClassName("suggestions_list")[0];
    while(suggestions_list.firstChild){
        suggestions_list.removeChild(suggestions_list.firstChild);
    }
}

//---Main Page heplers---
function sortSuggestions(suggestions){

    switch (CURRENT_SORT_OPTION_ID){
        case "most-upvotes":
            suggestions.sort(sortHighToLow("upvotes"));
            break;
        case "least-upvotes":
            suggestions.sort(sortHighToLow("upvotes")).reverse();
            break;
        case "most-comments":
            suggestions.sort(sortHighToLow("comments"));
            break;
        case "least-comments":
            suggestions.sort(sortHighToLow("comments")).reverse()
            break;
    }

    return suggestions;
}

function sortHighToLow(key){
    if (key == "comments"){
        return function(a,b){
            if (!a[key] && !b[key]){
                return 0;
            } else if (!a[key]) {
                return 1;
            } else if (!b[key]) {
                return -1;
            } else if (a[key].length < b[key].length) {
                return 1;
            } else if (a[key].length > b[key].length) {
                return -1;
            }
            return 0;
        }
    } else {
        return function(a,b){
            if (a[key] < b[key]) {
                return 1;
            } else if (a[key] > b[key]){
                return -1;
            }
            return 0;
        }
    }
}

function filterSuggestionsByCategory(suggestions_array, category){
    let result_array = [];

    if (!suggestions_array || !CATEGORY_LIST.includes(category) || (category == "all")) {
        result_array = suggestions_array;
    } else {
        suggestions_array.forEach(function(element){
            if(element.category == category){
                result_array.push(element);
            }
        })
    }
    return result_array;
}

function hideEmptySuggestionBlock(){
    let empty_block = document.getElementsByClassName('body-container__empty-suggestions-window')[0];
    empty_block.style.display = 'none';
}

function showEmptySuggestionBlock() {
    let empty_block = document.getElementsByClassName('body-container__empty-suggestions-window')[0];
    empty_block.style.display = 'block';
}

function addSuggestionToMainBody(suggestion_data){
    let main_suggestion_body = document.getElementsByClassName("suggestions_list")[0];
    let new_suggestion = createSuggestionDevForMain(suggestion_data);
    main_suggestion_body.appendChild(new_suggestion);
}

function createSuggestionDevForMain(suggestion_data){
    let suggestion = document.createElement("div");
    suggestion.classList = "suggestion";
    suggestion.id = suggestion_data.id;

    let left_part = createLeftSuggestionPart(suggestion_data);
    let center_part = createCenterSuggestionPart(suggestion_data);
    let right_part = createRightSuggestionPart(suggestion_data);

    suggestion.appendChild(left_part);
    suggestion.appendChild(center_part);
    suggestion.appendChild(right_part);

    return suggestion;
}

function rebuildMainPageHeaderForMobile(){ // TODO need to refactor
    if (document.getElementsByClassName("body-container__header-container")[0]){
        return;
    }

    let container = document.getElementsByClassName("body-container__summary")[0];

    let header = document.getElementsByClassName("body-container__header")[0];
    let category_filter = document.getElementsByClassName("body-container__filter")[0];
    let summary = document.getElementsByClassName("body-container__stats")[0];

    header.remove();
    category_filter.remove();
    summary.remove();

    let header_container = document.createElement('div');
    header_container.classList.add("body-container__header-container");
    let burger = document.createElement('div');
    burger.classList.add("body-container__burger");
    let popup_background = document.createElement('div');
    popup_background.classList.add("body-container__popup-background");
    let popup_container = document.createElement('div');
    popup_container.classList.add("body-container__popup-container");

    header_container.appendChild(header);
    header_container.appendChild(burger);

    popup_container.appendChild(category_filter);
    popup_container.appendChild(summary);

    popup_background.appendChild(popup_container);

    container.appendChild(header_container);
    container.appendChild(popup_background);
}

function rebuildMainPageHeaderForNotMobile(){
    if (document.getElementsByClassName("body-container__header-container")[0]){
        let container = document.getElementsByClassName("body-container__summary")[0];

        let header = document.getElementsByClassName("body-container__header")[0];
        let category_filter = document.getElementsByClassName("body-container__filter")[0];
        let summary = document.getElementsByClassName("body-container__stats")[0];

        let header_container = document.getElementsByClassName("body-container__header-container")[0];
        let popup_background = document.getElementsByClassName("body-container__popup-background")[0];

        header_container.remove();
        popup_background.remove();

        container.appendChild(header);
        container.appendChild(category_filter);
        container.appendChild(summary);
    }
}

function rebuildAllSuggestionsDivsForMobile(){
    let suggestions = document.getElementsByClassName("suggestion");

    Array.from(suggestions).forEach(function(item){
        rebuildSuggestionDivForMobile(item);
    })
}

function rebuildAllSuggestionsDivsForNotMobile(){
    let suggestions = document.getElementsByClassName("suggestion");

    Array.from(suggestions).forEach(function(item){
        rebuildSuggestionDivForNotMobile(item);
    })
}

function addBurgerOnclickAction(){
    if (document.getElementsByClassName("body-container__burger")[0]){
        var burger_button = document.getElementsByClassName("body-container__burger")[0];
    }

    burger_button.onclick = function(){
        if (isBurgerOptionsActive()){
            hideBurgerOptions();
        } else {
            showBurgerOptions();
        }
//        burger_button.style.display = isBurgerOptionsActive() ? "none" : "block";
        console.log(burger_button)
    }

}

function isBurgerOptionsActive(){
    let burger_option_window = document.getElementsByClassName("body-container__popup-background")[0];

    return (burger_option_window.style.display == "block") ? true : false;
}

function showBurgerOptions(){
    let burger_option_window = document.getElementsByClassName("body-container__popup-background")[0];
    burger_button = document.getElementsByClassName("body-container__burger")[0]

    burger_option_window.style.display = "block";
    burger_button.style.backgroundImage = "url('../assets/shared/mobile/icon-close.svg')";
}

function hideBurgerOptions(){
    let burger_option_window = document.getElementsByClassName("body-container__popup-background")[0];
    burger_button = document.getElementsByClassName("body-container__burger")[0]

    burger_option_window.style.display = "none";
    burger_button.style.backgroundImage = "url('../assets/shared/mobile/icon-hamburger.svg')";
}
