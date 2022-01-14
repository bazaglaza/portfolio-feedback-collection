//---Create Suggestion Div---
function createLeftSuggestionPart(suggestion_data,
    container_class = "suggestion__left-part",
    main_class = "suggestion__voting",
    vouting_number_class = "suggestion__voting-number",
    vouting_arrow_class = "suggestion__voting-arrow",
    voted_class = "suggestion__voting_voted") {

    let left_part = document.createElement("div");
    left_part.classList = container_class;

    let voting = document.createElement("div");
    voting.classList = main_class;
    voting.id = "s" + suggestion_data["id"];

    let voting_number = document.createElement("div");
    let voting_arrow = document.createElement("div");

    voting_number.classList = vouting_number_class;
    if (suggestion_data.upvotes) {
        voting_number.innerHTML = suggestion_data.upvotes;
    } else {
        voting_number.innerHTML = 0;
    }
    if (C_USER["voted-suggestions"].includes(suggestion_data["id"])) {
        voting.classList.add(voted_class);
    }

    voting_arrow.classList = vouting_arrow_class;

    voting.appendChild(voting_arrow);
    voting.appendChild(voting_number);

    left_part.appendChild(voting);

    return left_part;
}

function createCenterSuggestionPart(suggection_data,
    container_class = "suggestion__center-part",
    title_class = "suggestion__suggestion-title",
    description_class = "suggestion__suggestion-description",
    tag_class = "suggestion__suggestion-tag tag") {

    let center_part = document.createElement("div");
    center_part.classList = container_class;

    let title = document.createElement("div");
    let description = document.createElement("div");
    let category = document.createElement("div");

    title.classList = title_class;
    if (suggection_data.title){
        title.innerHTML = suggection_data.title;
    } else {
        title.innerHTML = "";
    }

    description.classList = description_class;
    description.innerHTML = suggection_data.description;
    category.classList = tag_class;
    category.innerHTML = suggection_data.category;

    center_part.appendChild(title);
    center_part.appendChild(description);
    center_part.appendChild(category);

    return center_part;
}

function createRightSuggestionPart(suggection_data,
    container_class = "suggestion__right-part",
    icon_class = "suggestion__comment-icon",
    comments_number_class = "suggestion__comments-number",
    comments_icon_imgHTML = "<img src='assets/shared/icon-comments.svg' alt='Comments icon'>"){

    let right_part = document.createElement("div");
    right_part.classList = container_class;

    let icon = document.createElement("div");
    let number = document.createElement("div");
    icon.classList = icon_class;
    icon.innerHTML = comments_icon_imgHTML;
    number.classList = comments_number_class;
    if(suggection_data.comments) {
        number.innerHTML = suggection_data.comments.length;
    } else {
        number.innerHTML = 0;
    }

    right_part.appendChild(icon);
    right_part.appendChild(number);

    return right_part;
}

//---Working with votes---
function changeVoteStatus(suggestion, voted_class = "suggestion__voting_voted"){
    let suggestion_id = votingIdToSuggestionId(suggestion.id);
    let suggestion_index = getSuggestionIndexById(SUGGESTIONS_DATA, suggestion_id);
    if (C_USER["voted-suggestions"].includes(suggestion_id)) {
        SUGGESTIONS_DATA[suggestion_index]["upvotes"] -= 1;
        C_USER["voted-suggestions"].splice(C_USER["voted-suggestions"].indexOf(suggestion_id), 1)
        if (suggestion.classList.contains(voted_class)){
            suggestion.classList.remove(voted_class);
        }
    } else {
        SUGGESTIONS_DATA[suggestion_index]["upvotes"] += 1;
        C_USER["voted-suggestions"].push(suggestion_id);
        suggestion.classList.add(voted_class);
    }

    suggestion.lastChild.innerText = SUGGESTIONS_DATA[suggestion_index]["upvotes"]

    saveDataToDBbyKey(SESSION_STORAGE_SUGGESTIONS_KEY, SUGGESTIONS_DATA);
    saveDataToDBbyKey(SESSION_STORAGE_CURRENT_USER_KEY, C_USER);
}

function votingIdToSuggestionId(voting_id){
    return parseInt(voting_id.substring(1));
}
