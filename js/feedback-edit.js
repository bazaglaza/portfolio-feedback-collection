if (sessionStorage.getItem(SESSION_STORAGE_SUGGESTIONS_KEY) != null) {
    SUGGESTIONS_DATA = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_SUGGESTIONS_KEY));
} else {
    SUGGESTIONS_DATA = [];
}

const CURRENT_SUGGESTION_INDEX = getSuggestionIndexById(SUGGESTIONS_DATA, getCurrentSuggestionId());

const SUGGESTION = SUGGESTIONS_DATA[CURRENT_SUGGESTION_INDEX];

const CATEGORY_DISPLAY_FIELD_DICT = {
    "Feature": "feature",
    "UI": "ui",
    "UX": "ux",
    "Enhancement": "enhancement",
    "Bug": "bug"
}

const CATEGORY_SELECTOR_LIST = ["Feature", "UI", "UX", "Enhancement", "Bug"];

const STATUS_DISPLAY_FIELD_DICT = {
    "Suggestion": "suggestion",
    "Planned": "planned",
    "In Progress": "in-progress",
    "Live": "live"
}

const STAUTUS_SELECTOR_LIST = ["Suggestion", "Planned", "In Progress", "Live"];


//---Get all necessary page elements---
let title_field = document.getElementsByClassName("creation-form-container__feedback-title-text")[0];

let category_selector = document.getElementById("category-selector");
let status_selector = document.getElementById("state-selector");

let feedback_body_field = document.getElementsByClassName("creation-form-container__feedback-body-text")[0];

//--Get all page buttons---
let edit_cancel_button = document.getElementById("edit-cancel-button");
let delete_suggestion_button = document.getElementById("delete-suggestion-button");
let save_suggestion_button = document.getElementById("save-feedback-button");

//---MAIN CODE FOR EDIT SUGGESTION PAGE---
fillSuggestionDataForEdit(SUGGESTION);

//---Onclicks handling---
edit_cancel_button.onclick = function(){
    window.location.href = 'feedback-detail.html';
}

save_suggestion_button.onclick = function(){
    SUGGESTION["title"] = title_field.value;
    SUGGESTION["category"] = CATEGORY_DISPLAY_FIELD_DICT[getSelectorCurrentValue(category_selector)];
    SUGGESTION["status"] = STATUS_DISPLAY_FIELD_DICT[getSelectorCurrentValue(status_selector)];
    SUGGESTION["description"] = feedback_body_field.value;

    SUGGESTIONS_DATA[CURRENT_SUGGESTION_INDEX] = SUGGESTION;

    saveDataToDBbyKey(SESSION_STORAGE_SUGGESTIONS_KEY, SUGGESTIONS_DATA);

    window.location.href = 'index.html';
}

delete_suggestion_button.onclick = function(){

    SUGGESTIONS_DATA.splice(CURRENT_SUGGESTION_INDEX, 1);

    saveDataToDBbyKey(SESSION_STORAGE_SUGGESTIONS_KEY, SUGGESTIONS_DATA);

    window.location.href = 'index.html';
}

//---Edit suggestion update functions---
function fillSuggestionDataForEdit(suggestion){
    let edit_window_title = document.getElementsByClassName("creation-form-container__title")[0];
    let current_title_text = edit_window_title.innerText;
    edit_window_title.innerText = current_title_text + " '" + suggestion.title + "'";

    title_field.value = suggestion["title"];
    addSelector(category_selector, CATEGORY_SELECTOR_LIST, getDisplayValueFromDBValue(CATEGORY_DISPLAY_FIELD_DICT, suggestion["category"]));
    addSelector(status_selector, STAUTUS_SELECTOR_LIST, getDisplayValueFromDBValue(STATUS_DISPLAY_FIELD_DICT, suggestion["status"]));
    feedback_body_field.value = suggestion["description"]
}

function getDisplayValueFromDBValue(display_field_dict, db_value){
    let result = null;

    for(const [display, db] of Object.entries(display_field_dict)){
        if (db_value == db) {
            result = display;
            break;
        }
    }

    return result;
}
