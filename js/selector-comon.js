const DEFAULT_HIDDENT_CLASS_EXTENTION = "__hidden";
const DEFAULT_MAIN_FIELD_CLASS_EXTENTION = "__main-field";
const DEFAULT_MAIN_FIELD_INPUT_CLASS_EXTENTION = "__input-field";
const DEFAULT_MAIN_FIELD_ARROW_CLASS_EXTENTION = "__arrow";
const DEFAULT_OPTIONS_WINDOW_CLASS_EXTENTION = "__options-container";
const DEFAULT_ACTIVE_OPTION_CLASS_EXTENTION = "__option_active";
const DEFAULT_BACKGROUND_OPTIONS_WINDOW_CLASS = "__background";
const DEFAULT_OPTION_CLASS_EXTENTION = "__option";
const DEFAULT_OPTION_NAME_FIELD_CLASS = "__selection";
const DEFAULT_ACTIVE_OPTIONS_WINDOW_CLASS_FOR_MAIN_FIELD = "options-window";

//----Public functions-------
function addSelector(selector_main_elemet, options=["Basic"], default_option=options[0]){
    createSelector(selector_main_elemet, options, default_option);
    putOnClickActionToMainSelectorField(selector_main_elemet);
    putOnClickActionsToOptionsWindow(selector_main_elemet);
    putOnClickActionsToOptions(selector_main_elemet);
}

function getSelectorCurrentValue(element, input_field_extention=DEFAULT_MAIN_FIELD_INPUT_CLASS_EXTENTION){
    return element.getElementsByClassName(getSelectorMainClass(element) + input_field_extention)[0].innerText;
}

//---Creating the divs for Selector---
function createSelector(selector_main_elemet, options=["Basic"], default_option=options[0]){
    let selector_class = getSelectorMainClass(selector_main_elemet);

    let selector_main_field = createSelectorMainField(selector_class, options, default_option);
    let selector_options_container = createSelectorOptionsContainer(selector_class, options, default_option);

    selector_main_elemet.appendChild(selector_main_field);
    selector_main_elemet.appendChild(selector_options_container);
}

function createSelectorMainField(selector_main_class, options, default_option){
    let main_field = document.createElement('div');
    main_field.classList.add(selector_main_class + DEFAULT_MAIN_FIELD_CLASS_EXTENTION);

    let text_field = document.createElement('div');
    let arrow_field = document.createElement('div');

    text_field.classList.add(selector_main_class + DEFAULT_MAIN_FIELD_INPUT_CLASS_EXTENTION);
    arrow_field.classList.add(selector_main_class + DEFAULT_MAIN_FIELD_ARROW_CLASS_EXTENTION);

    if (options.includes(default_option)){
        text_field.innerText = default_option;
    }

    main_field.appendChild(text_field);
    main_field.appendChild(arrow_field);

    return main_field;
}
function createSelectorOptionsContainer(selector_main_class, options, default_option){
    let options_container = document.createElement('div');
    options_container.classList = selector_main_class + DEFAULT_OPTIONS_WINDOW_CLASS_EXTENTION + " " + selector_main_class + DEFAULT_HIDDENT_CLASS_EXTENTION;

    let background_window = document.createElement('div');
    background_window.classList.add(selector_main_class + DEFAULT_BACKGROUND_OPTIONS_WINDOW_CLASS);

    let options_window = createOptionsSelectorWindow(selector_main_class, options, default_option)

    options_container.appendChild(background_window);
    options_container.appendChild(options_window);

    return options_container;
}
function createOptionsSelectorWindow(selector_main_class, options, default_option){
    let options_selector_window = document.createElement('div');
    options_selector_window.classList = selector_main_class + "__options";

    options.forEach(function(item){
        if (item == default_option){
            options_selector_window.appendChild(createOptionField(selector_main_class, item, true));
        } else {
            options_selector_window.appendChild(createOptionField(selector_main_class, item));
        }
    })

    return options_selector_window;
}
function createOptionField(selector_main_class, option, isActive = false){
    let option_element = document.createElement('div');
    option_element.classList = selector_main_class + DEFAULT_OPTION_CLASS_EXTENTION;

    if (isActive) {
        option_element.classList.add(selector_main_class + DEFAULT_ACTIVE_OPTION_CLASS_EXTENTION);
    }

    let selector_selection = document.createElement('div');
    selector_selection.classList = selector_main_class + "__selection"
    selector_selection.innerText = option;

    let selector_checkbox = document.createElement('div');
    selector_checkbox.classList = selector_main_class + "__checkbox";

    option_element.appendChild(selector_selection);
    option_element.appendChild(selector_checkbox);

    return option_element;
}
//-------------------------------------

//---Onclick actions functions---
function putOnClickActionToMainSelectorField(element){
    let main_selector_class = getSelectorMainClass(element);
    let main_field = getSelectorMainFieldElement(element);
    let options_window = getSelectorOptionsWindowElement(element);

    main_field.onclick = function (){
        if (isOptionsWindowHidden(element)){
            showSelectorOptionsWindow(element);
        }
    }
}
function putOnClickActionsToOptionsWindow(element){
    let main_selector_class = getSelectorMainClass(element);
    let background_area = element.getElementsByClassName(main_selector_class + DEFAULT_BACKGROUND_OPTIONS_WINDOW_CLASS)[0];

    background_area.onclick = function(){
        hideSelectorOptionsWindow(element);
    }
}
function putOnClickActionsToOptions(element, option_class_extention=DEFAULT_OPTION_CLASS_EXTENTION){
    let main_selector_class = getSelectorMainClass(element);
    let all_option_list = Array.from(element.getElementsByClassName(main_selector_class + option_class_extention));

    all_option_list.forEach(function(item){
        item.onclick = function(){
            changeSelectorActiveOption(element, item);
            hideSelectorOptionsWindow(element);
        }
    })
}
//-------------------------------

//---Helpers----
function showSelectorOptionsWindow(element, hidden_class_extantion=DEFAULT_HIDDENT_CLASS_EXTENTION){
    let options_window = getSelectorOptionsWindowElement(element);
    let main_selector_class = getSelectorMainClass(element);
    let main_field = getSelectorMainFieldElement(element);

    options_window.classList.remove(main_selector_class + hidden_class_extantion);
    main_field.classList.add(DEFAULT_ACTIVE_OPTIONS_WINDOW_CLASS_FOR_MAIN_FIELD);
}
function hideSelectorOptionsWindow(element, hidden_class_extantion=DEFAULT_HIDDENT_CLASS_EXTENTION){
    let options_window = getSelectorOptionsWindowElement(element);
    let main_selector_class = getSelectorMainClass(element);
    let main_field = getSelectorMainFieldElement(element);

    options_window.classList.add(main_selector_class + hidden_class_extantion);
    main_field.classList.remove(DEFAULT_ACTIVE_OPTIONS_WINDOW_CLASS_FOR_MAIN_FIELD);
}

function getSelectorMainClass(element){
    return element.classList[0];
}
function getSelectorMainFieldElement(element, main_field_class_extention=DEFAULT_MAIN_FIELD_CLASS_EXTENTION){
    let main_selector_class = getSelectorMainClass(element);
    return element.getElementsByClassName(main_selector_class + main_field_class_extention)[0];
}
function getSelectorOptionsWindowElement(element, options_window_class_extention=DEFAULT_OPTIONS_WINDOW_CLASS_EXTENTION){
    let main_selector_class = getSelectorMainClass(element);
    return element.getElementsByClassName(main_selector_class + options_window_class_extention)[0];
}

function isOptionsWindowHidden(element, hidden_class_extantion=DEFAULT_HIDDENT_CLASS_EXTENTION){
    let options_window = getSelectorOptionsWindowElement(element);
    let main_selector_class = getSelectorMainClass(element);

    if (options_window.classList.contains(main_selector_class + hidden_class_extantion)){
        return true;
    } else {
        return false;
    }
}

function changeSelectorActiveOption(element, new_option){
    let current_option = getCurrentActiveOption(element);
    deactivateSelectorOption(element, current_option);
    activateSelectorOption(element,new_option);
}

function getCurrentActiveOption(element,
    option_class_extention=DEFAULT_OPTION_CLASS_EXTENTION,
    active_class_extention=DEFAULT_ACTIVE_OPTION_CLASS_EXTENTION){

    let main_selector_class = getSelectorMainClass(element);
    let active_class = main_selector_class + active_class_extention;

    let current_option = null;

    let all_options_list = element.getElementsByClassName(main_selector_class + option_class_extention);

    Array.from(all_options_list).forEach(function(item){
        if (item.classList.contains(active_class)){
            current_option = item;
        }
    })

    return current_option;
}

function activateSelectorOption(element, option_element,
    main_field_input_class_extention=DEFAULT_MAIN_FIELD_INPUT_CLASS_EXTENTION,
    active_class_extention=DEFAULT_ACTIVE_OPTION_CLASS_EXTENTION,
    option_name_field_class_extention=DEFAULT_OPTION_NAME_FIELD_CLASS){

    let main_selector_class = getSelectorMainClass(element);
    let active_class = main_selector_class + active_class_extention;

    option_element.classList.add(active_class);

    let main_field_input = element.getElementsByClassName(main_selector_class + main_field_input_class_extention)[0];
    let option_name_field =  option_element.getElementsByClassName(main_selector_class + option_name_field_class_extention)[0];

    main_field_input.innerText = option_element.innerText;
}
function deactivateSelectorOption(element, option_element, active_class_extention=DEFAULT_ACTIVE_OPTION_CLASS_EXTENTION){
    let main_selector_class = getSelectorMainClass(element);
    let active_class = main_selector_class + active_class_extention;
    option_element.classList.remove(active_class);
}
