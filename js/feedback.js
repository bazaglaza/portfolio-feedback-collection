if (sessionStorage.getItem(SESSION_STORAGE_SUGGESTIONS_KEY) != null) {
    SUGGESTIONS_DATA = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_SUGGESTIONS_KEY));
} else {
    SUGGESTIONS_DATA = [];
}
const CATEGORY_DISPLAY_FIELD_DICT = {
    "Feature": "feature",
    "UI": "ui",
    "UX": "ux",
    "Enhancement": "enhancement",
    "Bug": "bug"
}

const CATEGORY_SELECTOR_LIST = ["Feature", "UI", "UX", "Enhancement", "Bug"];

let category_selector = document.getElementById('category-selector');

addSelector(category_selector, CATEGORY_SELECTOR_LIST);

let add_feedback_button = document.getElementById("add-feedback-button");
let cancel_button = document.getElementById("cancel-button");

add_feedback_button.onclick = function(){
    let title_field = document.getElementsByClassName("creation-form-container__feedback-title-text")[0];
    let feedback_body_field = document.getElementsByClassName("creation-form-container__feedback-body-text")[0];
    let new_suggestion = {
        "category": CATEGORY_DISPLAY_FIELD_DICT[getSelectorCurrentValue(category_selector)],
        "comments": [],
        "description": feedback_body_field.value,
        "id": 0,
        "status": "suggestion",
        "title": title_field.value,
        "upvotes": 0,
    }
    console.log(new_suggestion);

    addNewSuggestionToList(new_suggestion);
    saveDataToDBbyKey(SESSION_STORAGE_SUGGESTIONS_KEY, SUGGESTIONS_DATA);

    window.location.href = 'index.html';
}

cancel_button.onclick = function(){
    window.location.href = 'index.html';
}

function addNewSuggestionToList(suggestion){

    suggestion["id"] = getNewSuggestionId();

    SUGGESTIONS_DATA.push(suggestion);
}

//-----Test selector----
