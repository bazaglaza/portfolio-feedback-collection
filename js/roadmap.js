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

let planned_column = document.getElementById("planned-column");
let in_progress_column = document.getElementById("in-progress-column");
let live_column = document.getElementById("live-column");
let stats = {
    "planned": 0,
    "in-progress": 0,
    "live": 0
}


//---Adding all card to the screen---
SUGGESTIONS_DATA.forEach(function(item){

    switch (item.status){
        case "planned":
            planned_column.appendChild(createRoadmapCard(item));
            stats["planned"] += 1;
            break;
        case "in-progress":
            in_progress_column.appendChild(createRoadmapCard(item));
            stats["in-progress"] += 1;
            break;
        case "live":
            live_column.appendChild(createRoadmapCard(item));
            stats["live"] += 1;
            break;
    }
})

//---Cards onclick---
let all_cards = document.getElementsByClassName("card");

if(all_cards){
    Array.from(all_cards).forEach(function(item){
        item.onclick = function(event){
            let voting_area = item.getElementsByClassName("card__voting")[0].contains(event.target);
            setCurrentSuggestionId(item.id);
            if(!voting_area){
                console.log(item.id);
                console.log(getCurrentSuggestionId());
                window.location.href = 'feedback-detail.html';
            }
        }
    })
}
//---Votings onklick---
let all_votings_objects = document.getElementsByClassName("card__voting");

if(all_votings_objects){
    Array.from(all_votings_objects).forEach(function(item){
        item.onclick = function(){
            changeVoteStatus(item, "card__voting_voted");
        }
    })
}

//---Mobile resolution handling---


if (window.innerWidth < 710) {
    addClickHandlersForsSummaryStatuses();
}

//---Helpers---

function createRoadmapCard(suggestion){
    let main_div = document.createElement('div');
    main_div.classList = "card";
    main_div.id = suggestion.id;

    main_div.appendChild(createHeaderDiv(suggestion));
    main_div.appendChild(createTitleDiv(suggestion));
    main_div.appendChild(createDescriptionDiv(suggestion));
    main_div.appendChild(createTagDiv(suggestion));
    main_div.appendChild(createFooterDiv(suggestion));

    return main_div;
}

function createHeaderDiv(suggestion, header_div_class="card__header"){
    let header_div = document.createElement('div');
    header_div.classList = header_div_class;
    let suggestion_status = "";

    switch (suggestion.status){
        case "planned":
            suggestion_status = "Planned";
            break;
        case "in-progress":
            suggestion_status = "In Progress";
            break;
        case "live":
            suggestion_status = "Live";
            break;
        case "suggestion":
            suggestion_status = "Suggestion";
            break;
    }

    header_div.innerText = suggestion_status;

    return header_div;
}

function createTitleDiv(suggestion, title_div_class="card__title"){
    let title_div = document.createElement('div');
    title_div.classList = title_div_class;

    title_div.innerText = suggestion.title;

    return title_div;
}

function createDescriptionDiv(suggestion, description_div_class="card__description"){
    let description_div = document.createElement('div');
    description_div.classList = description_div_class;

    description_div.innerText = suggestion.description;

    return description_div;
}

function createTagDiv(suggestion, tag_div_class="tag"){
    let tag_div = document.createElement('div');
    tag_div.classList = "tag";

    tag_div.innerText = suggestion.category;

    return tag_div;
}

function createFooterDiv(suggestion, fitter_div_class="card__voting-comments-container"){
    let footer_div = document.createElement('div');
    footer_div.classList = fitter_div_class;

    footer_div.appendChild(createVotingDiv(suggestion));

    footer_div.appendChild(createCommentsDiv(suggestion));

    return footer_div;
}

function createVotingDiv(suggestion,
    main_class="card__voting",
    voting_arrow_class="card__voting-arrow",
    voting_number_class="card__voting-number",
    voted_class="card__voting_voted"){

    let voting_div = document.createElement('div');
    voting_div.classList = main_class;
    voting_div.id = "c" + suggestion.id;

    let voting_arrow_div = document.createElement('div');
    voting_arrow_div.classList = voting_arrow_class;
    let voting_number_div = document.createElement('div');
    voting_number_div.classList = voting_number_class;

    if (suggestion.upvotes) {
        voting_number_div.innerText = suggestion.upvotes;
    } else {
        voting_number_div.innerText = "0";
    }
    if (C_USER["voted-suggestions"].includes(suggestion["id"])) {
        voting_div.classList.add(voted_class);
    }

    voting_div.appendChild(voting_arrow_div);
    voting_div.appendChild(voting_number_div);

    return voting_div;
}

function createCommentsDiv(suggestion){
    let comments_div = document.createElement('div');
    comments_div.classList = "card__comments";

    let comment_icon_div = document.createElement('div');
    comment_icon_div.classList = "card__comment-icon";
    let comment_number_div = document.createElement('div');
    comment_number_div.classList = "card__comment-number";

    if (suggestion.comments.length){
        comment_number_div.innerText = suggestion.comments.length;
    } else {
        comment_number_div.innerText = "0";
    }

    comments_div.appendChild(comment_icon_div);
    comments_div.appendChild(comment_number_div);

    return comments_div;
}

function isSuggestionInRoadmap(suggestion, roadmap_statuses_arrray=["planned", "in-progress", "live"]){

    if (roadmap_statuses_arrray.includes(suggestion.status)) {
        return true;
    } else {
        return false;
    }
}

function addClickHandlersForsSummaryStatuses(){
    const statuses_class_name = "summary__header";
    const columns_class_name = "cards__column";

    let statuses = document.getElementsByClassName(statuses_class_name);
    let cards_columns = document.getElementsByClassName(columns_class_name);

    for (let i = 0; i < statuses.length; i++){
        statuses[i].onclick = function(){
            status_active_class_name = statuses_class_name + "_active";
            column_active_class_name = columns_class_name + "_active";

            removeCalssFromArrayOfElements(statuses, status_active_class_name);
            removeCalssFromArrayOfElements(cards_columns, column_active_class_name);

            statuses[i].classList.add(status_active_class_name);
            cards_columns[i].classList.add(column_active_class_name);
        }
    }
}

function removeCalssFromArrayOfElements(elements_array, class_to_delete){
    Array.from(elements_array).forEach(function(item){
        if (item.classList.contains(class_to_delete)){
            item.classList.remove(class_to_delete);
        }
    })
}
