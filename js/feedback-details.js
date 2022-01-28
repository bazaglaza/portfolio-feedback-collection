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

const current_suggestion_index = getSuggestionIndexById(SUGGESTIONS_DATA, getCurrentSuggestionId())

const current_suggestion = SUGGESTIONS_DATA[current_suggestion_index];

const edit_button = document.getElementById("edit-feedback-button");
const post_comment_button = document.getElementById("post-comment-button");

let comments_container = document.getElementsByClassName("comments-container")[0];

//---Initial pac\ge elements generation---
addSuggestionOverview(current_suggestion, "suggestion-overview");

addAllcomments(current_suggestion, comments_container);

let comments_section_header = document.getElementsByClassName("comments-container__header")[0];

comments_section_header.innerText = (0 ? (!current_suggestion.comments.length) : current_suggestion.comments.length) + " Comments";

//-----------------------
//---Onklick handlings---
//-----------------------
edit_button.onclick = function(){
    window.location.href = 'feedback-edit.html';
}
post_comment_button.onclick = function(){
    const post_comment_textarea = document.getElementsByClassName("add-comment__text-input")[0];
    let new_comment = {
        "content": post_comment_textarea.value,
        "user": C_USER
    }
    addNewComment(new_comment, current_suggestion);

    SUGGESTIONS_DATA[current_suggestion_index] = current_suggestion;
    saveDataToDBbyKey(SESSION_STORAGE_SUGGESTIONS_KEY, SUGGESTIONS_DATA);
    location.reload();
}

const voting = document.getElementsByClassName("suggestion__voting")[0];
voting.onclick = function(){
    console.log(this);
    changeVoteStatus(this);
}

addOnclickActionsForReplyButtons("comment__reply-button");
addOnclickActionsForReplyButtons("reply__reply-button");

//---Mobile resolution handling---

let suggestion_div = document.getElementsByClassName("suggestion")[0];
if (window.innerWidth < 710) {
    rebuildSuggestionDivForMobile(suggestion_div);
}

window.addEventListener("resize", function(){
  if (window.innerWidth < 710) {
      rebuildSuggestionDivForMobile(suggestion_div);
  } else {
      rebuildSuggestionDivForNotMobile(suggestion_div);
  }
});

//---Functions for Feedbask details page---
function createSuggestionDivForDetails(suggestion_data){
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

function addSuggestionOverview(suggestion_data, container_class){
    let suggestion_overview = document.getElementsByClassName(container_class)[0];
    suggestion_overview.appendChild(createSuggestionDivForDetails(suggestion_data));
}

function createCommentDiv(comment_data, comment_type = "comment"){
    let main_class = "";
    let id = "";

    if (comment_type == "comment") {
        main_class = "comment";
        id = "c" + comment_data.id;
    } else if (comment_type == "reply") {
        main_class = "comment reply";
    } else {
        main_class = comment_type;
    }

    let main_div = document.createElement('div');
    main_div.classList = main_class;
    main_div.id = id;

    main_div.appendChild(createHeaderDiv(comment_data, comment_type));
    main_div.appendChild(createCommentTextDiv(comment_data));

    return main_div;
}

function createHeaderDiv(comment_data, comment_type = "comment"){

    let header = document.createElement('div');
    header.classList = "comment__header";

    let user_picture = document.createElement('div');
    user_picture.classList = "comment__user-picture";

    let user_picture_img = document.createElement("img");
    user_picture_img.src = comment_data.user.image;

    let user_name_container = document.createElement('div');
    user_name_container.classList = "comment__user-name";

    let user_real_name_parag = document.createElement('p');
    user_real_name_parag.classList = "comment__real-name"
    user_real_name_parag.innerHTML = comment_data.user.name;

    let user_nick_name_parag = document.createElement('p');
    user_nick_name_parag.classList = "comment__nick-name"
    user_nick_name_parag.innerHTML = "@" + comment_data.user.username;


    let reply_button = document.createElement('div');
    reply_button.classList = comment_type + "__reply-button";
    reply_button.innerHTML = "Reply";
    if (comment_data.id) {
        reply_button.id = comment_data.id;
    }

    header.appendChild(user_picture);
    header.appendChild(user_name_container);
    header.appendChild(reply_button);

    user_picture.appendChild(user_picture_img);

    user_name_container.appendChild(user_real_name_parag);
    user_name_container.appendChild(user_nick_name_parag);

    return header;
}

function createCommentTextDiv(comment_data){

    let comment_text = document.createElement('div');
    let paragraph = document.createElement('p')
    comment_text.appendChild(paragraph);

    comment_text.classList = "comment__text";

    if (comment_data.replyingTo) {
        paragraph.innerHTML = "<span class='reply-to'>@" + comment_data.replyingTo + "</span> " + comment_data.content;
    } else {
        paragraph.innerHTML = comment_data.content;
    }

    return comment_text;
}

function addAllcomments(suggestion_data, comments_container){
    let comments = [];
    let comment_type = "";
    if (suggestion_data.comments){
        comments = suggestion_data.comments;
        comment_type = "comment";
    } else if (suggestion_data.replies){
        comments = suggestion_data.replies
        comment_type = "reply";
    } else {
        return;
    }

    comments.forEach(function(item){
        let comment = comments_container.appendChild(createCommentDiv(item, comment_type));
        if(item.replies) {
            addAllcomments(item, comment);
        }
    })
}

function addNewComment(comment, suggestion){
    comment["id"] = getNewCommentId();
    suggestion["comments"].push(comment);
}

function createReplyDiv(main_class='reply-window'){
    if (document.getElementsByClassName(main_class)[0]){
        document.getElementsByClassName(main_class)[0].remove();
    }
    let container = document.createElement('div');
    container.classList = main_class;
    let text_area = document.createElement('textarea');
    text_area.classList = main_class + "__text-area";
    let post_button = document.createElement('button');
    post_button.classList = main_class + "__post-button";
    post_button.innerText = "Post Reply";
    container.appendChild(text_area);
    container.appendChild(post_button);
    return container;
}

function removeReplyDiv(element){
    element.remove();
}

function addOnclickActionsForReplyButtons(reply_buttons_class){

    if(document.getElementsByClassName(reply_buttons_class)){

        let reply_reply_button = document.getElementsByClassName(reply_buttons_class);

        Array.from(reply_reply_button).forEach(function(item){

            item.onclick = function(){
                let comment_container = this.parentElement.parentElement.getElementsByClassName("comment__text")[0];
                let reply_to_user_element = comment_container.parentElement.getElementsByClassName("comment__nick-name")[0];
                let reply_user_nikname = reply_to_user_element.innerText.slice(1);

                if (comment_container.firstChild == comment_container.lastChild){
                    let reply_div = createReplyDiv();
                    comment_container.appendChild(reply_div);

                    const post_reply_button = comment_container.getElementsByClassName("reply-window__post-button")[0];

                    post_reply_button.onclick = function(){
                        addReplyToComment(this.parentElement, reply_user_nikname);
                        removeReplyDiv(this.parentElement);
                        location.reload();
                    }
                }
            }
        })
    }
}

function addReplyToComment(reply_window, reply_to_user){
    let text_area = reply_window.getElementsByClassName("reply-window__text-area")[0];
    let reply_content = text_area.value;
    if(reply_content != ""){
        let reply_object = {
            "content" : reply_content,
            "replyingTo" : reply_to_user,
            "user": C_USER
        }
        let comment_head = reply_window;
        while (comment_head.classList != "comment"){
            comment_head = comment_head.parentElement;
        }
        comment_id = parseInt(comment_head.id.substring(1));
        addReplyToCommentForSuggestion(current_suggestion, comment_id, reply_object);
    }
}

function addReplyToCommentForSuggestion(suggestion, comment_id, reply_object){
    suggestion.comments.forEach(function(item){

        if(item.id == comment_id){
            if (item.replies){
                item.replies.push(reply_object);
            } else {
                item["replies"] = [reply_object];
            }
        }
    })
    SUGGESTIONS_DATA[current_suggestion_index] = suggestion;
    saveDataToDBbyKey(SESSION_STORAGE_SUGGESTIONS_KEY, SUGGESTIONS_DATA)
}
