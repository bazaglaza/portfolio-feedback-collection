//---Current user data---
const INITIAL_USER = {
  "image": "./assets/user-images/image-zena.jpg", // Needto change
  "name": "Konstantin Karikov",
  "username": "kkarikov",
  "voted-suggestions": []
}

const INITIAL_CURRENT_SUGGESTION_ID = 1;

const INITIAL_SUGGESTION_ID = 12;
const INITIAL_COMMENTS_ID = 15;

//---Initital data-------
const INITIAL_DATA = [
  {
    "id": 1,
    "title": "Add tags for solutions",
    "category": "enhancement",
    "upvotes": 112,
    "status": "suggestion",
    "description": "Easier to search for solutions based on a specific stack.",
    "comments": [
      {
        "id": 1,
        "content": "Awesome idea! Trying to find framework-specific projects within the hubs can be tedious",
        "user": {
          "image": "./assets/user-images/image-suzanne.jpg",
          "name": "Suzanne Chang",
          "username": "upbeat1811"
        }
      },
      {
        "id": 2,
        "content": "Please use fun, color-coded labels to easily identify them at a glance",
        "user": {
          "image": "./assets/user-images/image-thomas.jpg",
          "name": "Thomas Hood",
          "username": "brawnybrave"
        }
      }
    ]
  },
  {
    "id": 2,
    "title": "Add a dark theme option",
    "category": "feature",
    "upvotes": 99,
    "status": "suggestion",
    "description": "It would help people with light sensitivities and who prefer dark mode.",
    "comments": [
      {
        "id": 3,
        "content": "Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.",
        "user": {
          "image": "./assets/user-images/image-elijah.jpg",
          "name": "Elijah Moss",
          "username": "hexagon.bestagon"
        }
      },
      {
        "id": 4,
        "content": "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
        "user": {
          "image": "./assets/user-images/image-james.jpg",
          "name": "James Skinner",
          "username": "hummingbird1"
        },
        "replies": [
          {
            "content": "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
            "replyingTo": "hummingbird1",
            "user": {
              "image": "./assets/user-images/image-anne.jpg",
              "name": "Anne Valentine",
              "username": "annev1990"
            }
          },
          {
            "content": "Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I'd prefer not to use one of such extensions, however, for security and privacy reasons.",
            "replyingTo": "annev1990",
            "user": {
              "image": "./assets/user-images/image-ryan.jpg",
              "name": "Ryan Welles",
              "username": "voyager.344"
            }
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "title": "Q&A within the challenge hubs",
    "category": "feature",
    "upvotes": 65,
    "status": "suggestion",
    "description": "Challenge-specific Q&A would make for easy reference.",
    "comments": [
      {
        "id": 5,
        "content": "Much easier to get answers from devs who can relate, since they've either finished the challenge themselves or are in the middle of it.",
        "user": {
          "image": "./assets/user-images/image-george.jpg",
          "name": "George Partridge",
          "username": "soccerviewer8"
        }
      }
    ]
  },
  {
    "id": 4,
    "title": "Add image/video upload to feedback",
    "category": "enhancement",
    "upvotes": 51,
    "status": "suggestion",
    "description": "Images and screencasts can enhance comments on solutions.",
    "comments": [
      {
        "id": 6,
        "content": "Right now, there is no ability to add images while giving feedback which isn't ideal because I have to use another app to show what I mean",
        "user": {
          "image": "./assets/user-images/image-javier.jpg",
          "name": "Javier Pollard",
          "username": "warlikeduke"
        }
      },
      {
        "id": 7,
        "content": "Yes I'd like to see this as well. Sometimes I want to add a short video or gif to explain the site's behavior..",
        "user": {
          "image": "./assets/user-images/image-roxanne.jpg",
          "name": "Roxanne Travis",
          "username": "peppersprime32"
        }
      }
    ]
  },
  {
    "id": 5,
    "title": "Ability to follow others",
    "category": "feature",
    "upvotes": 42,
    "status": "suggestion",
    "description": "Stay updated on comments and solutions other people post.",
    "comments": [
      {
        "id": 8,
        "content": "I also want to be notified when devs I follow submit projects on FEM. Is in-app notification also in the pipeline?",
        "user": {
          "image": "./assets/user-images/image-victoria.jpg",
          "name": "Victoria Mejia",
          "username": "arlen_the_marlin"
        },
        "replies": [
          {
            "content": "Bumping this. It would be good to have a tab with a feed of people I follow so it's easy to see what challenges they’ve done lately. I learn a lot by reading good developers' code.",
            "replyingTo": "arlen_the_marlin",
            "user": {
              "image": "./assets/user-images/image-zena.jpg",
              "name": "Zena Kelley",
              "username": "velvetround"
            }
          }
        ]
      },
      {
        "id": 9,
        "content": "I've been saving the profile URLs of a few people and I check what they’ve been doing from time to time. Being able to follow them solves that",
        "user": {
          "image": "./assets/user-images/image-jackson.jpg",
          "name": "Jackson Barker",
          "username": "countryspirit"
        }
      }
    ]
  },
  {
    "id": 6,
    "title": "Preview images not loading",
    "category": "bug",
    "upvotes": 3,
    "status": "suggestion",
    "description": "Challenge preview images are missing when you apply a filter.",
    "comments": []
  },
  {
    "id": 7,
    "title": "More comprehensive reports",
    "category": "feature",
    "upvotes": 123,
    "status": "planned",
    "description": "It would be great to see a more detailed breakdown of solutions.",
    "comments": [
      {
        "id": 10,
        "content": "This would be awesome! It would be so helpful to see an overview of my code in a way that makes it easy to spot where things could be improved.",
        "user": {
          "image": "./assets/user-images/image-victoria.jpg",
          "name": "Victoria Mejia",
          "username": "arlen_the_marlin"
        }
      },
      {
        "id": 11,
        "content": "Yeah, this would be really good. I'd love to see deeper insights into my code!",
        "user": {
          "image": "./assets/user-images/image-jackson.jpg",
          "name": "Jackson Barker",
          "username": "countryspirit"
        }
      }
    ]
  },
  {
    "id": 8,
    "title": "Learning paths",
    "category": "feature",
    "upvotes": 28,
    "status": "planned",
    "description": "Sequenced projects for different goals to help people improve.",
    "comments": [
      {
        "id": 12,
        "content": "Having a path through the challenges that I could follow would be brilliant! Sometimes I'm not sure which challenge would be the best next step to take. So this would help me navigate through them!",
        "user": {
          "image": "./assets/user-images/image-george.jpg",
          "name": "George Partridge",
          "username": "soccerviewer8"
        }
      }
    ]
  },
  {
    "id": 9,
    "title": "One-click portfolio generation",
    "category": "feature",
    "upvotes": 62,
    "status": "in-progress",
    "description": "Add ability to create professional looking portfolio from profile.",
    "comments": [
      {
        "id": 13,
        "content": "I haven't built a portfolio site yet, so this would be really helpful. Might it also be possible to choose layout and colour themes?!",
        "user": {
          "image": "./assets/user-images/image-ryan.jpg",
          "name": "Ryan Welles",
          "username": "voyager.344"
        }
      }
    ]
  },
  {
    "id": 10,
    "title": "Bookmark challenges",
    "category": "feature",
    "upvotes": 31,
    "status": "in-progress",
    "description": "Be able to bookmark challenges to take later on.",
    "comments": [
      {
        "id": 14,
        "content": "This would be great! At the moment, I'm just starting challenges in order to save them. But this means the My Challenges section is overflowing with projects and is hard to manage. Being able to bookmark challenges would be really helpful.",
        "user": {
          "image": "./assets/user-images/image-suzanne.jpg",
          "name": "Suzanne Chang",
          "username": "upbeat1811"
        }
      }
    ]
  },
  {
    "id": 11,
    "title": "Animated solution screenshots",
    "category": "bug",
    "upvotes": 9,
    "status": "in-progress",
    "description": "Screenshots of solutions with animations don’t display correctly.",
    "comments": []
  },
  {
    "id": 12,
    "title": "Add micro-interactions",
    "category": "enhancement",
    "upvotes": 71,
    "status": "live",
    "description": "Small animations at specific points can add delight.",
    "comments": [
      {
        "id": 15,
        "content": "I'd love to see this! It always makes me so happy to see little details like these on websites.",
        "user": {
          "image": "./assets/user-images/image-victoria.jpg",
          "name": "Victoria Mejia",
          "username": "arlen_the_marlin"
        },
        "replies": [
          {
            "content": "Me too! I'd also love to see celebrations at specific points as well. It would help people take a moment to celebrate their achievements!",
            "replyingTo": "arlen_the_marlin",
            "user": {
              "image": "./assets/user-images/image-suzanne.jpg",
              "name": "Suzanne Chang",
              "username": "upbeat1811"
            }
          }
        ]
      }
    ]
  }
]

//---Key for sessionstorage to store all data for suggestions---
const SESSION_STORAGE_SUGGESTIONS_KEY = "suggestions";
const SESSION_STORAGE_SUGGESTIONS_ID_KEY = "suggestions-id";
const SESSION_STORAGE_COMMENTS_ID_KEY = "comments-id";
const SESSION_STORAGE_CURRENT_USER_KEY = "current-user"
const SESSION_STORAGE_CURRENT_SUGGESTION_ID_KEY = "current-suggestion-id"

//---Load data to sessionStorage---
if (sessionStorage.getItem(SESSION_STORAGE_SUGGESTIONS_KEY) == null) {
    saveDataToDBbyKey(SESSION_STORAGE_SUGGESTIONS_KEY, INITIAL_DATA);
    saveDataToDBbyKey(SESSION_STORAGE_SUGGESTIONS_ID_KEY, INITIAL_SUGGESTION_ID);
    saveDataToDBbyKey(SESSION_STORAGE_COMMENTS_ID_KEY, INITIAL_COMMENTS_ID);
}
if (sessionStorage.getItem(SESSION_STORAGE_CURRENT_USER_KEY) == null) {
    saveDataToDBbyKey(SESSION_STORAGE_CURRENT_USER_KEY, INITIAL_USER);
}
if (sessionStorage.getItem(SESSION_STORAGE_CURRENT_SUGGESTION_ID_KEY) == null) {
    saveDataToDBbyKey(SESSION_STORAGE_CURRENT_SUGGESTION_ID_KEY, INITIAL_CURRENT_SUGGESTION_ID);
}

//---Onklick for GoBack button on all pages where---
if (document.getElementsByClassName("go-back")[0]){
    document.getElementsByClassName("go-back")[0].onclick = function(){
        history.back();
    }
}

//---Functions to work with DB---
function loadDataFromDBbyKey(key){
    if (sessionStorage.getItem(key) != null) {
        return JSON.parse(sessionStorage.getItem(key));
    } else {
        console.log("ERRROR: Cannot find any inforamtion by " + key + " key in the sessionStorage");
        return null;
    }
}

function saveDataToDBbyKey(key, data){
    if (sessionStorage.getItem(key) != null) {
        sessionStorage.setItem(key, JSON.stringify(data));
        console.log("Data in sessionStoreage was succesfuly updated for " + key + " key." );
    } else {
        sessionStorage.setItem(key, JSON.stringify(data));
        console.log("New data with " + key + " key was succesfuly created.");
    }
}

function getNewSuggestionId() {
    let new_suggestion_id = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_SUGGESTIONS_ID_KEY)) + 1;
    sessionStorage.setItem(SESSION_STORAGE_SUGGESTIONS_ID_KEY, new_suggestion_id);
    return new_suggestion_id;
}

function getNewCommentId(){
    let new_comments_id = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_COMMENTS_ID_KEY)) + 1;
    sessionStorage.setItem(SESSION_STORAGE_COMMENTS_ID_KEY, new_comments_id);
    return new_comments_id;
}

function getSuggestionIndexById(suggestions, id){
    let suggestion_index = -1;
    suggestions.forEach(function(item, index){
        if (item["id"] == id) {
            suggestion_index = index;
            return;
        }
    })
    return suggestion_index;
}

function getCurrentSuggestionId(){
    return JSON.parse(sessionStorage.getItem(SESSION_STORAGE_CURRENT_SUGGESTION_ID_KEY));
}
function setCurrentSuggestionId(new_id){
    sessionStorage.setItem(SESSION_STORAGE_CURRENT_SUGGESTION_ID_KEY, new_id);
}
