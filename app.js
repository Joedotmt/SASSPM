let USER_PREFS = null;
preferencesLoad();





let pb_address = localStorage.getItem("pb_address");
const pb = connect_pb(pb_address);
function connect_pb(address)
{
    imfofiff.value = address;
    if (address == null)
    {
        address = "https://demo-petition.pockethost.io/";
        imfofiff.value = address;
        window.alert("No pocketbase server found. Default set to " + address);
        open_account_dialog();
    }
    localStorage.setItem("pb_address", address);

    let my_pb = new PocketBase(address);

    // Await the result of the checkConnection call properly
    withLoadingIndicator(async () =>
    {
        const connectionStatus = await checkConnection(my_pb);
        return connectionStatus; // Return the status
    }, "Connecting to Backend");

    return my_pb;
}
async function checkConnection(pb)
{
    try
    {
        // Send a simple request to the PocketBase root URL
        const response = await pb.health.check();

        // If the request is successful, the connection is working
        console.log('PocketBase server is reachable!', response);
        return true;
    } catch (error)
    {
        // If the request fails, log the error and assume the backend is not connected
        console.log('Failed to connect to PocketBase:', error);
        return false;
    }
}



//const pb = new PocketBase("http://192.168.1.193:8090");

//const pb = new PocketBase('https://library.pockethost.io');


const borrower_groups =
    "Agree, Disagree";

set_borrower_levels_lists();

const themeDialog = document.getElementById('theme_dialog');
const themeColorContainer = document.getElementById('theme_color_draggable_list_container');

let USER_PREFS_before_edit;

function showThemePickerModal()
{
    USER_PREFS_before_edit = JSON.parse(JSON.stringify(USER_PREFS));
    loadThemePickerModal();
    themeDialog.showModal();
}

function cancelThemePickerModal()
{
    USER_PREFS = USER_PREFS_before_edit;
    themeDialog.close();
}

function saveThemePickerModal()
{
    const colorDivs = Array.from(themeColorContainer.querySelectorAll('div[data-color]'));
    const colorAssignments = ['books', 'borrowers', 'transactions'];

    colorAssignments.forEach((item, index) =>
    {
        USER_PREFS[`${item}_color`] = colorDivs[index].dataset.color.toLowerCase();
    });

    preferencesSave();
    themeDialog.close();
}

function loadThemePickerModal()
{
    const colorAssignments = ['books', 'borrowers', 'transactions'];
    const colorDivs = colorAssignments.map(item =>
        themeColorContainer.querySelector(`div[data-color="${USER_PREFS[`${item}_color`]}"]`)
    );

    themeColorContainer.innerHTML = '';
    colorDivs.forEach(div => themeColorContainer.appendChild(div));
}

function preferencesLoad()
{
    USER_PREFS = JSON.parse(localStorage.getItem("USER_PREFS")) || preferencesReset();
}

function preferencesReset()
{
    const DEFAULT_USER_PREFS = {
        books_color: "green",
        borrowers_color: "blue",
        transactions_color: "red"
    };
    USER_PREFS = DEFAULT_USER_PREFS;
    preferencesSave();
    return DEFAULT_USER_PREFS;
}

function preferencesSave()
{
    localStorage.setItem("USER_PREFS", JSON.stringify(USER_PREFS));
}






let loaded_book_records;
let loaded_borrower_records;
let current_page;

collection_change();

function display_panel_book_lost_scrapped_editing_handle()
{
    if (display_panel_book_scrapped_editing.checked)
    {
        display_panel_book_lost_editing.disabled = true;
    } else
    {
        display_panel_book_lost_editing.disabled = false;
    }
    if (display_panel_book_lost_editing.checked)
    {
        display_panel_book_scrapped_editing.disabled = true;
    } else
    {
        display_panel_book_scrapped_editing.disabled = false;
    }
}

document.querySelectorAll(".toggle-chip").forEach((ele) =>
{
    ele.addEventListener("click", function ()
    {
        if (ele.dataset.value == "true")
        {
            ele.firstChild.remove();
            ele.dataset.value = "false";
        } else
        {
            check = document.createElement("span");
            check.className = "material-symbols-outlined";
            check.innerText = "check";
            ele.insertBefore(check, ele.firstChild);
            ele.dataset.value = "true";
        }
    });
});

window.addEventListener(
    "hashchange",
    () =>
    {
        collection_change();
    },
    false
);

// Select all input, select, and textarea elements
const elements = document.querySelectorAll("input, select, textarea");
elements.forEach((element) =>
{
    // Check if the element doesn't have a placeholder attribute
    if (!element.hasAttribute("placeholder"))
    {
        // Add an empty placeholder attribute
        element.setAttribute("placeholder", "");
    }
});

//list_area_search_filters.appendChild(search_area)
search_area.style.background = "var(---background)";
//document.querySelector(".filter-button").style.display = "none"

search_view_mode = true;
let display_area_edit_mode_borrower = false;
let display_area_edit_mode = false;
const all_buttons = document.getElementsByTagName("button");
for (const button of all_buttons)
{
    if (!button.classList.contains("segmented-button-button") &&
        !button.classList.contains("no-ripple")
    )
    {
        button.addEventListener("pointerdown", pointerdownbutton);
    }
}
add_book_to_borrow_dialog.addEventListener("cancel", (event) =>
{
    event.preventDefault();
    close_lend_book_dialog();
});

delete_borrower_forever_active = false;
iooi43iiore94 = null;
delete_borrower_forever.addEventListener("mousedown", function ()
{
    navigator.vibrate([
        5, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1,
    ]);
    iooi43iiore94 = setTimeout(() =>
    {
        navigator.vibrate([50]);
        delete_borrower_forever_text.innerText =
            "Release to DELETE PERMENANTLY";
        delete_borrower_forever_active = true;
    }, 2800);
    delete_borrower_forever.classList.add("ririirriire");
});

document.addEventListener("contextmenu", (event) =>
{
    event.preventDefault();
});

delete_borrower_forever.addEventListener("mouseup", function ()
{
    clearTimeout(iooi43iiore94);
    navigator.vibrate([0]);
    delete_borrower_forever.classList.remove("ririirriire");
    if (delete_borrower_forever_active)
    {
        delete_borrower(edit_button_borrower.dataset.currentid);
        change_display_area_mode("none", display_area_borrower);

        delete_borrower_forever.style.scale = 0;
        display_panel_edit_details_borrower
            .querySelectorAll("div")
            .forEach((egg) =>
            {
                egg.style.transition = "0.5s";
                egg.style.width = "0";
                egg.style.minWidth = "0";
                egg.style.opacity = "0";
            });
    }
});
delete_borrower_forever.addEventListener("mouseout", function ()
{
    clearTimeout(iooi43iiore94);
    delete_borrower_forever_text.innerText = "Delete Record";
    delete_borrower_forever.classList.remove("ririirriire");
});
nextid_borrower = "";
nextid_book = "";
generatedid_borrower = "Error";
generatedid_book = "Error";
var username = "";
var password = "";
document.getElementById("sign_in_dialog").addEventListener("close", (event) =>
{
    document.getElementById("email_input").value = "";
    document.getElementById("password_input").value = "";
    document.removeEventListener(
        "keydown",
        enter_key_pressed_in_sign_in_dialog
    );
});

function set_borrower_levels_lists()
{
    const groups_array = borrower_groups.split(", ");
    groups_array.forEach((group) =>
    {
        let optionelement = document.createElement("option");
        optionelement.value = group;
        optionelement.innerText = group;

        display_panel_borrower_group_editing.appendChild(optionelement);
    });
}





function collection_change()
{
    change_display_area_mode("none", display_area_borrower);
    change_display_area_mode("none", display_area);

    collection_select.value = "borrowers";
    current_page = "borrowers";

    let str = document.body.className;
    light_or_dark = "-" + str.substring(str.indexOf("-") + 1);

    container_book.style.display = "none";
    container_borrower.style.display = "none";

    container_borrower.style.display = "flex";
    color = USER_PREFS.borrowers_color;

    document.body.className = color + light_or_dark;
    list_selected_collection();
}

function list_selected_collection()
{
    switch (current_page)
    {
        case "books":
            list_books();
            break;
        case "borrowers":
            list_borrowers();
            break;
        case "transactions":
            //color = USER_PREFS.transactions_color;
            break;
        case "prints":
            list_prints();
    }
}

const book_state = {
    filters: [],
    add_filter: function (filter) { },
};


async function save_changes_handler_book(event)
{
    const isCreation = book_edit_button.dataset.currentid === "creation";
    const bookData = getBookData();

    try
    {
        if (isCreation)
        {
            await createBook(bookData);
        } else
        {
            await updateBook(bookData);
        }

        await updateUI(isCreation);
    } catch (error)
    {
        handleError(error);
    }
}

function getBookData()
{
    return {
        title: display_panel_book_title_editing.value,
        author: display_panel_book_author_editing.value,
        preview_url_override: display_panel_book_preview_url_override_editing.value,
        isbn: display_panel_book_isbn_editing.value,
        description: display_panel_book_description_editing.value,
        classification_label: display_panel_book_classification_label_editing.value,
        level: display_panel_book_level_editing.value,
        subject: display_panel_book_subject_editing.value,
        lost: display_panel_book_lost_editing.dataset.value,
        scrapped: display_panel_book_scrapped_editing.dataset.value,
        price: display_panel_book_price_editing.value,
    };
}

async function createBook(data)
{
    console.log("CREATING BOOK RECORD WITH DATA: ", data);
    data.book_id = generatedid_book;
    data.legacy_book_id = "DEPRECATED_";
    await withLoadingIndicator(() => pb.collection("books").create(data), "Creating Book");
}

async function updateBook(data)
{
    console.log("UPDATING BOOK RECORD WITH DATA: ", data);
    await withLoadingIndicator(() => pb.collection("books").update(book_edit_button.dataset.currentid, data), "Updating Record");
}

async function updateUI(isCreation)
{
    if (isCreation)
    {
        await withLoadingIndicator(() => book_display(book_edit_button.dataset.currentid, true), "Displaying Book");
        await withLoadingIndicator(list_books, "Listing Books");
        await withLoadingIndicator(() => clickHandler_create(true), "Resetting Form");
    } else
    {
        await withLoadingIndicator(() => listItems('books'), "Listing Books");
        await withLoadingIndicator(() => book_display(book_edit_button.dataset.currentid, true), "Displaying Book");
    }
    await change_display_area_mode("display", display_area);
}

function handleError(error)
{
    console.error(error.data);
    const issueString = Object.entries(error.data.data)
        .map(([key, value]) => `\n${key}: ${value.message}`)
        .join('');
    alert(`Error code: ${error.data.code}\nMessage: ${error.data.message}\n\nIssues:${issueString}`);
}

async function withLoadingIndicator(operation, loadingMessage)
{
    loading_modal.querySelector("button").style.display = 'none';
    error_display_dialog.style.display = "none";
    const loadingTimer = setTimeout(() => showLoadingModal(loadingMessage), 10);
    try
    {
        const result = await operation();  // Wait for the operation to complete
        if (!result)
        {
            showErrorInModal("ERROR: Failed to connect to PocketBase");
        }
        else
        {
            hideLoadingModal();
            connect_button_jrjjrj.classList.add("doneanddusted");
            connect_button_jrjjrj_text.innerText = "Connected";
        }
    } catch (error)
    {
        // If an error is thrown, show it in the modal
        showErrorInModal("An error occurred: " + error.message);
    } finally
    {
        clearTimeout(loadingTimer);
        frn4ijfi4434.style.display = "none";
        //hideLoadingModal();
    }
}

function unconnect()
{
    connect_button_jrjjrj.classList.remove("doneanddusted");
    connect_button_jrjjrj_text.innerText = "Connect";
}

function showLoadingModal(title)
{
    loading_modal.showModal();
    loading_modal.querySelector(".dialog-title").innerText = title;
    loading_modal.querySelector(".dialog-error").innerText = '';  // Clear any previous errors
    loading_modal.querySelector("button").style.display = 'none';
    frn4ijfi4434.style.display = "flex";
}

function hideLoadingModal()
{
    //loading_modal.querySelector(".dialog-title").innerText = '';
    loading_modal.close();
}

function showErrorInModal(errorMessage)
{
    // Display the error message in the modal
    error_display_dialog.innerText = errorMessage;
    error_display_dialog.style.display = "flex";
    loading_modal.querySelector("button").style.display = 'flex';  // Show the button if an error occurs
}






function borrower_close_unsaved_discard_click_handler()
{
    change_display_area_mode("display", display_area_borrower);
    close_unsaved_borrower.close();
    if (edit_button_borrower.dataset.currentid == "creation")
    {
        if (nextid_borrower == "")
        {
            change_display_area_mode("none", display_area_borrower);
            create_borrower_button.style.background = "";
        } else
        {
            borrower_display(nextid_borrower);
        }
    } else
    {
        if (nextid_borrower == "")
        {
            borrower_display(edit_button_borrower.dataset.currentid);
        } else
        {
            borrower_display(nextid_borrower);
        }
    }
}

function book_close_unsaved_discard_click_handler()
{
    book_display(nextid_book, true);
    close_unsaved.close();
}

async function save_changes_handler_borrower(event)
{
    if (display_area_edit_mode_borrower)
    {
        regex = /^[a-zA-Z ]+$/;
        if (!regex.test(display_panel_borrower_name_editing.value) ||
            !regex.test(display_panel_borrower_name_editing.value)
        )
        {
            alert("only letters allowed");
            return;
        }
        console.log("egg");
        if (edit_button_borrower.dataset.currentid == "creation")
        {
            const data = {
                borrower_id: generatedid_borrower,
                name: display_panel_borrower_name_editing.value,
                surname: display_panel_borrower_surname_editing.value,
                group: display_panel_borrower_group_editing.value,
            };
            console.log("CREATING BORROWER RECORD WITH DATA: ", data);
            console.log("ekekk", await pb.collection("borrowers").create(data));
        } else
        {
            const data = {
                name: display_panel_borrower_name_editing.value,
                surname: display_panel_borrower_surname_editing.value,
                group: display_panel_borrower_group_editing.value,
            };
            console.log("UPDATING BORROWER RECORD WITH DATA: ", data);
            await pb
                .collection("borrowers")
                .update(edit_button_borrower.dataset.currentid, data);
        }
        await list_borrowers();
        await borrower_display(edit_button_borrower.dataset.currentid, true);
        change_display_area_mode("display", display_area_borrower);
    } else
    {
        change_display_area_mode("edit", display_area_borrower);
    }
}

change_dark_light_theme();

function change_dark_light_theme()
{
    let new_string = document.body.className.replace("light", "dark");
    dark_mode_switcher_icon.innerHTML = "light_mode";
    ir040jr098.src = "3429jr9.svg";
    if (new_string == document.body.className)
    {
        new_string = document.body.className.replace("dark", "light");
        dark_mode_switcher_icon.innerHTML = "dark_mode";
        ir040jr098.src = "4598ggrtg.svg";
    }
    document.body.className = new_string;
}

function logo_easter_egg()
{
    logo_text.style.fontWeight = parseInt(logo_text.style.fontWeight) + 50;
    if (logo_text.style.fontWeight > 900)
    {
        logo_text.innerHTML = `Made by <a target="_blank" rel="external" href="https://permanentlink.github.io/#saslib">Joe Esposito</a>`;
    }
}

let mouseX, mouseY;
let startX, startY;
const drag_threshold = 0.01;
function pointerdownbutton(event)
{
    let currentTarget = event.currentTarget;
    mouseX = event.clientX;
    mouseY = event.clientY;
    setTimeout(() =>
    {
        event.currentTargetJoe = currentTarget;
        const deltaX = mouseX - event.clientX;
        const deltaY = mouseY - event.clientY;
        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) < drag_threshold)
        {
            createRipple(event);
        }
    }, 0);
}
function pointermovebutton(event)
{
    mouseX = event.changedTouches[0].clientX;
    mouseY = event.changedTouches[0].clientY;
    console.log('Pointer move at', mouseX, mouseY);
}
document.addEventListener("touchmove", pointermovebutton);



function createRipple(event)
{
    const button = event.currentTargetJoe;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    // Force a reflow before adding the animate class
    ripple.offsetWidth;

    ripple.classList.add('animate');

    // Remove the ripple element after the animation
    setTimeout(() =>
    {
        ripple.remove();
    }, 400); // Match this to your transition duration
}

function copy_isbn()
{
    copy_isbn_tooltip.innerHTML = `Copied!`;
    setInterval(function ()
    {
        copy_isbn_tooltip.innerHTML = `Copy`;
    }, 5000);
    var copyText = document.getElementById("display_panel_book_isbn").innerHTML;
    navigator.clipboard.writeText(copyText);
}

function copy_borrower_id_from_books()
{
    copy_borrower_book_tooltip.innerHTML = `Copied!`;
    setInterval(function ()
    {
        copy_borrower_book_tooltip.innerHTML = `Copy`;
    }, 5000);
    var copyText = document.getElementById(
        "id_to_be_copied_from_books"
    ).innerHTML;
    navigator.clipboard.writeText(copyText);
}

function open_account_dialog()
{
    account_dialog.showModal();
    account_dialog.addEventListener("click", (event) =>
    {
        let rect = event.target.getBoundingClientRect();
        if (
            rect.left > event.clientX ||
            rect.right < event.clientX ||
            rect.top > event.clientY ||
            rect.bottom < event.clientY
        )
        {
            account_dialog.close();
        }
    });
}

function segmented_button_thing(event, element = "")
{
    if (element != "")
    {
        ele = element;
    } else
    {
        ele = event.currentTarget;
    }

    if (
        ele.dataset.state === "true" &&
        ele.parentElement.dataset.onlyone != "true"
    )
    {
        ele.dataset.state = false;
        ele.style.backgroundColor = "transparent";
        ele.style.width = "9em";
        ele.parentElement.dataset.value = "none";
    } else
    {
        let false_element;
        let truth_element;
        for (const thingydongy of ele.parentElement.children)
        {
            thingydongy.dataset.state = false;
            thingydongy.style.backgroundColor = "transparent";
            thingydongy.style.width = "9em";
            if (thingydongy.dataset.value == "true")
            {
                truth_element = thingydongy;
            }
            if (thingydongy.dataset.value == "false")
            {
                false_element = thingydongy;
            }
        }

        ele.dataset.state = true;
        ele.style.backgroundColor =
            "color-mix(in hsl, var(---primary-container), #00000000 5%)";
        ele.style.width = "10em";

        if (
            truth_element.dataset.state == "true" &&
            false_element.dataset.state == "false"
        )
        {
            ele.parentElement.dataset.value = "false";
        }
        if (
            truth_element.dataset.state == "false" &&
            false_element.dataset.state == "true"
        )
        {
            ele.parentElement.dataset.value = "true";
        }
    }
}

function lend_book_button_click_handler(ev)
{
    lend_book_to_borrower(
        ev.currentTarget.dataset.currentid,
        edit_button_borrower.dataset.currentid
    );
    close_lend_book_dialog();
    display_panel_details.style.display = "none";
}

function book_enable_lend_view(enable)
{
    if (enable)
    {
        display_area_top_book_view.style.display = "none";
        display_area_top_lend_view.style.display = "flex";
        add_book_to_borrow_dialog_container.appendChild(container_book);
    } else
    {
        display_area_top_book_view.style.display = "flex";
        display_area_top_lend_view.style.display = "none";
        document.body.appendChild(container_book);
    }
}

function change_display_area_mode(mode, _display_area)
{
    // TEMPORARY
    let ele_type;
    if (_display_area === display_area)
    {
        ele_type = "book";
    }
    if (_display_area == display_area_borrower)
    {
        ele_type = "borrower";
    }

    function borrower_edit()
    {
        display_panel_edit_details_borrower.style.display = "block";

        display_panel_details_borrower.style.display = "none";
        edit_button_borrower_label.innerText = "Save";
        edit_button_borrower_label.style.color = "var(---background)";
        edit_button_borrower.style.backgroundColor = "var(---primary)";
        edit_button_borrower.style.border = "none";
        returntextjinfo4_borrower.innerText = "Cancel";
        returnbutton54985t8_borrower.onclick =
            borrower_open_discard_draft_modal;
        display_area_edit_mode_borrower = true;
        returnbutton54985t8_borrower.style.display = "flex";
        edit_button_borrower.style.display = "flex";
    }

    function borrower_display()
    {
        display_panel_edit_details_borrower.style.display = "none";
        display_panel_details_borrower.style.display = "block";
        edit_button_borrower_label.innerText = "Edit";
        edit_button_borrower_label.style.color = "";
        edit_button_borrower.style.backgroundColor = "";
        edit_button_borrower.style.border = "";
        returntextjinfo4_borrower.innerText = "Return";
        returnbutton54985t8_borrower.onclick = null;
        display_area_edit_mode_borrower = false;
        returnbutton54985t8_borrower.style.display = "flex";
        edit_button_borrower.style.display = "flex";
    }

    function borrower_none()
    {
        returnbutton54985t8_borrower.style.display = "none";
        edit_button_borrower.style.display = "none";
        display_panel_details_borrower.style.display = "none";
        display_panel_edit_details_borrower.style.display = "none";
        edit_button_borrower.dataset.currentid = "none";
        list_area_list_borrowers.querySelector(".list-item.selected")?.classList.remove("selected");
    }

    function book_none()
    {
        //_display_area.style.display = "none"
        //display_area_top_book_view.style.display = "none"
        //display_area_top_book_view_edit.style.display = "none"
        //display_panel_details.style.display = "none";
        //display_panel_edit_details.style.display = "none";
    }

    function book_display()
    {
        display_area_edit_mode = false;
        _display_area.querySelector(".display_panel_edit").style.display =
            "none";
        _display_area.querySelector(".display_panel_display").style.display =
            "block";

        //display_panel_edit_details.style.display = "none";
        //display_panel_details.style.display = "block";

        if (current_page == "books")
        {
            //display_area_top_book_view.style.display = "flex"
            //display_area_top_book_view_edit.style.display = "none"
            //display_area_edit_mode = false;
        }
    }

    function book_edit()
    {
        console.log(_display_area);
        _display_area.querySelector(".display_panel_edit").style.display =
            "block";
        _display_area.querySelector(".display_panel_display").style.display =
            "none";
        display_area_edit_mode = true;

    }


    if (ele_type == "book")
    {
        switch (mode)
        {
            case "display":
                book_display();
                break;
            case "edit":
                book_edit();
                break;
            case "creation":
                book_edit();
                break;
            case "none":
                book_none();
                break;
            default:
                break;
        }
    } else if ("borrower")
    {
        switch (mode)
        {
            case "display":
                borrower_display();
                break;
            case "edit":
                borrower_edit();
                break;
            case "creation":
                borrower_edit();
                break;
            case "none":
                borrower_none();
                break;
            default:
                break;
        }
    }
}

function book_open_discard_draft_modal()
{
    close_unsaved.showModal();
}

function borrower_open_discard_draft_modal()
{
    close_unsaved_borrower.showModal();
}

function create_random_string(length)
{
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++)
    {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
async function generate_unique_book_id()
{
    generated_id = "";
    for (let i = 0; i < 1000; i++)
    {
        try
        {
            generated_id = create_random_string(4);
            await pb
                .collection("books")
                .getFirstListItem(`book_id="${generated_id}"`);
            console.error(
                "trying to generate a book id again because of collisions"
            );
        } catch (err)
        {
            if (err.data.code == "404")
            {
                return generated_id;
            }
        }
    }
}

function search_sortby_ascending_book_change()
{
    if (search_sortby_ascending_book.dataset.ascending == "+")
    {
        search_sortby_ascending_book.dataset.ascending = "-";
        on4ir4r0943.style.rotate = "360deg";
        timeout_uofrrofi = setTimeout(function ()
        {
            on4ir4r0943.style.transitionDuration = "0s";
            on4ir4r0943.style.rotate = "0deg";
        }, 200);
    } else
    {
        try
        {
            clearTimeout(timeout_uofrrofi);
        } catch (error) { }
        search_sortby_ascending_book.dataset.ascending = "+";
        on4ir4r0943.style.transitionDuration = "0.2s";
        on4ir4r0943.style.rotate = "180deg";
    }
    list_books();
}
async function deprecate_book_id(id)
{
    console.log("decrapating: ", id);
    const rec = await pb.collection("books").getOne(id, {});
    await pb
        .collection("books")
        .update(id, { legacy_book_id: "DEPRECATED_" + rec.legacy_book_id });
    await list_books();
    await book_display(rec.id);
}


// Utility function to process input tokens for filtering
function processTokens(search, lazyFields, exactFields)
{
    return search.split(" ")
        .map(token => token.trim())
        .filter(token => token !== "")
        .map(cleanToken =>
        {
            const lazyConditions = lazyFields.map(field => `${field} ~ "%${cleanToken}%"`).join(" || ");
            const exactConditions = exactFields.map(field => `${field} = "${cleanToken}"`).join(" || ");
            return `(${lazyConditions}${exactConditions ? " || " + exactConditions : ""})`;
        })
        .join(" && ");
}


// Function to handle additional book-specific filters
function applyBookFilters(pbFilter)
{
    const filters = [];

    const lostValue = book_search_selector_lost_thing?.dataset.value || "none";
    const scrappedValue = book_search_selector_scrapped_thing?.dataset.value || "none";
    const levelValue = book_level_search_select?.value || "all";
    const subjectValue = subject_search_select_shadow?.value || "all";
    const idTypeValue = search_books_id_type_select?.dataset.value || "none";

    if (lostValue !== "none")
    {
        filters.push(`lost = ${lostValue}`);
    }

    if (scrappedValue !== "none")
    {
        filters.push(`scrapped = ${scrappedValue}`);
    }

    if (levelValue !== "all")
    {
        filters.push(`level = '${levelValue}'`);
    }

    if (subjectValue !== "all")
    {
        filters.push(`subject = '${subjectValue}'`);
    }

    if (idTypeValue !== "none")
    {
        filters.push(idTypeValue === "true"
            ? `legacy_book_id !~ 'DEPRECATED_'`
            : `legacy_book_id ~ 'DEPRECATED_'`);
    }

    return pbFilter + (pbFilter && filters.length ? " && " : "") + filters.join(" && ");
}

// Main function to get search options for either books or borrowers
function getSearchOptions(collection)
{
    let pbFilter = "";

    switch (collection)
    {
        case "books":
            const bookLazyFields = ["title", "isbn"];
            const bookExactFields = ["legacy_book_id", "book_id"];
            pbFilter = processTokens(search_filter_input.value, bookLazyFields, bookExactFields);
            pbFilter = applyBookFilters(pbFilter);
            var pbSort = "+email";//`${search_sortby_ascending_book.dataset.ascending}${j54f9954j.value}`;
            break;
        case "borrowers":
            const borrowerLazyFields = ["name", "surname", "group"];
            const borrowerExactFields = ["name", "surname", "group"];
            pbFilter = processTokens(search_filter_input_borrower.value, borrowerLazyFields, borrowerExactFields);
            var pbSort = "+email"; // Default sort for borrowers
            break;
    }

    return {
        sort: pbSort,
        filter: pbFilter,
        page: page_number_changer_books.dataset.pagenumber || 1,
        amount: 10000000,
        collection: collection
    };
}



async function listItems(itemType)
{
    try
    {
        const pageNumberChanger = document.getElementById(`page_number_changer_${itemType}`);
        document.body.appendChild(pageNumberChanger);

        const searchOptions = getSearchOptions(itemType);
        const queryResponse = await fetchItems(searchOptions);

        if (itemType == 'books')
        {
            loaded_book_records = queryResponse.items;
            renderItemList(itemType, loaded_book_records);
        }
        else if (itemType == 'borrowers')
        {
            loaded_borrower_records = queryResponse.items;
            renderItemList(itemType, loaded_borrower_records);
        }



        updatePagination(queryResponse, pageNumberChanger);
    } catch (error)
    {
        console.error(`Error in list${itemType.charAt(0).toUpperCase() + itemType.slice(1)}:`, error);
        // Handle error (e.g., show error message to user)
    }
}

async function fetchItems(searchOptions)
{
    return await pb.collection(searchOptions.collection).getList(
        searchOptions.page,
        searchOptions.amount,
        {
            sort: searchOptions.sort,
            filter: searchOptions.filter,
        }
    );
}

function renderItemList(itemType, items)
{
    const listAreaList = document.getElementById(`list_area_list_${itemType}`);
    listAreaList.innerHTML = '';

    appendCreateButton(itemType, listAreaList);

    items.forEach(item =>
    {
        if (itemType === 'borrowers' && item.id === 'deletedborrower') return;
        appendListItem(itemType, item, listAreaList);
    });
}










function create_signature()
{
    document.startViewTransition();
    signature_dialog.showModal();
}

async function upload_signature(group)
{
    const email = signature_email_input.value + "@sanandrea.edu.mt";

    // Get the original canvas and its context
    const originalCanvas = canvas;
    const originalContext = originalCanvas.getContext('2d');

    // // Calculate the desired dimensions as half of the original size
    // const desiredWidth = originalCanvas.width / 5;
    // const desiredHeight = originalCanvas.height / 5;

    // // Create a new canvas for the scaled-down image
    // const scaledCanvas = document.createElement('canvas');
    // const scaledContext = scaledCanvas.getContext('2d');

    // // Set the new canvas dimensions to half of the original dimensions
    // scaledCanvas.width = desiredWidth;
    // scaledCanvas.height = desiredHeight;

    // // Draw the original canvas image onto the smaller canvas, scaling it down by half
    // scaledContext.drawImage(originalCanvas, 0, 0, desiredWidth, desiredHeight);

    // Convert the scaled-down canvas drawing to a Blob (image file)
    const signatureBlob = await new Promise((resolve) =>
    {
        originalCanvas.toBlob(resolve, 'image/png');
    });

    // Prepare the form data to include the image and the email/group data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("group", group);
    formData.append("signature", signatureBlob, 'signature.png');  // Attach the signature file

    // Submit the form data to PocketBase
    await pb.collection('borrowers').create(formData);
}



function next_slide(num)
{
    if (num == 3)
    {
        agree_button.style.transition = "1.2s cubic-bezier(0.33, 0.01, 0, 1)";
        agree_button.style.padding = "15em";
        upload_signature("Agree");
        setTimeout(() =>
        {
            agree_button.innerText = "Thank you for signing the petition";
            setTimeout(() =>
            {
                window.location.reload();
            }, 2000);
        }, 1000);
        return;
    }
    if (num == 4)
    {
        disagree_button.style.transition = "1.2s cubic-bezier(0.33, 0.01, 0, 1)";
        disagree_button.style.padding = "60em";
        upload_signature("Disagree");

        setTimeout(() =>
        {
            disagree_button.innerText = "Thank you for signing the petition";
            setTimeout(() =>
            {
                window.location.reload();
            }, 2000);
        }, 1000);
        return;
    }

    document.getElementById("slide_" + num).style.translate = "-200% 0%";
    document.getElementById("slide_" + (num + 1)).style.translate = "0% 0%";
}

function first_slide()
{
    document.getElementById("slide_1").style.translate = "0% 0%";
    document.getElementById("slide_2").style.translate = "500% 0%";
    document.getElementById("slide_3").style.translate = "1500% 0%";
}


















const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Canvas setup - only prevent default actions on the canvas itself
canvas.style.touchAction = 'none';
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'black';

const line_width = 8;

function getCoordinates(e)
{
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
        x: Math.min(Math.max(0, clientX - rect.left), canvas.width),
        y: Math.min(Math.max(0, clientY - rect.top), canvas.height)
    };
}

function draw(e)
{
    // Only prevent default if the event is on the canvas
    if (e.target === canvas)
    {
        e.preventDefault();
    }
    if (!isDrawing) return;

    const { x, y } = getCoordinates(e);

    // Draw a circle at each point
    ctx.beginPath();
    ctx.arc(x, y, line_width / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw a rectangle between points to connect them
    const angle = Math.atan2(y - lastY, x - lastX);
    const width = line_width;

    ctx.save();
    ctx.translate(lastX, lastY);
    ctx.rotate(angle);
    ctx.fillRect(0, -width / 2, Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2), width);
    ctx.restore();

    [lastX, lastY] = [x, y];
}

function startDrawing(e)
{
    if (e.target === canvas)
    {
        e.preventDefault();
        isDrawing = true;
        const { x, y } = getCoordinates(e);
        [lastX, lastY] = [x, y];

        // Draw initial circle
        ctx.beginPath();
        ctx.arc(lastX, lastY, line_width / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function stopDrawing()
{
    isDrawing = false;
}

// Mouse events - only attach to canvas
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Touch events - only attach to canvas
canvas.addEventListener('touchstart', startDrawing, { passive: false });
canvas.addEventListener('touchmove', draw, { passive: false });
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// Clear button
document.getElementById('clear').addEventListener('click', () =>
{
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
});
document.getElementById('clear2').addEventListener('click', () =>
{
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    signature_email_input.value = "";
});

async function delete_current_signature()
{
    await pb.collection('borrowers').delete(dpdb_id.innerText.split(": ")[1]);
    change_display_area_mode("none", display_area_borrower);
    list_selected_collection();
}



































signatureCanvas.width = signatureCanvas.getBoundingClientRect().width;
signatureCanvas.height = signatureCanvas.getBoundingClientRect().height;

addEventListener("resize", (event) =>
{
    signatureCanvas.width = signatureCanvas.getBoundingClientRect().width;
    signatureCanvas.height = signatureCanvas.getBoundingClientRect().height;
});










function appendCreateButton(itemType, container)
{
    const button = document.createElement('button');
    button.id = `create_${itemType.slice(0, -1)}_button`;
    button.className = 'list-button list-item create-button';
    button.textContent = `+ Add`;
    button.addEventListener('click', create_signature);
    button.addEventListener('pointerdown', pointerdownbutton);
    if (itemType === 'borrowers')
    {
        button.dataset.id = 'creation';
        button.style.borderBottom = '2px dashed var(---neutral-variant60)';
    }
    container.appendChild(button);
}

function appendListItem(itemType, item, container)
{
    const listItem = createListItem(itemType, item);
    container.appendChild(listItem);
}

function createListItem(itemType, item)
{
    const listItem = document.createElement('button');
    listItem.className = 'list-button list-item';
    listItem.dataset.id = item.id;
    listItem.addEventListener('click', itemType === 'books' ? book_click_handler : () => borrower_display(item.id));
    listItem.addEventListener('pointerdown', pointerdownbutton);

    const previewImage = createPreviewImage(itemType, item);
    const infoDiv = createInfoDiv(itemType, item);

    listItem.appendChild(previewImage);
    listItem.appendChild(infoDiv);

    return listItem;
}

function createPreviewImage(itemType, item)
{
    const previewImage = document.createElement('img');
    previewImage.className = 'preview-image';
    if (itemType === 'books')
    {
        previewImage.src = item.preview_url_override || `https://covers.openlibrary.org/b/isbn/${item.isbn}-S.jpg`;
    } else
    {
        previewImage.src = getBorrowerImageGroup(item.group);
        previewImage.style.background = 'transparent';
        previewImage.style.border = 'transparent';
        previewImage.style.marginRight = '0.5em';
    }
    return previewImage;
}

function createInfoDiv(itemType, item)
{
    const infoDiv = document.createElement('div');
    infoDiv.className = 'list-item-info-text';

    if (itemType === 'books')
    {
        infoDiv.innerHTML = `
            ${item.title}
            <label class="book-id">
                ${item.legacy_book_id.match("DEPRECATED_") ? item.book_id : `${item.legacy_book_id} ${item.book_id}`}
            </label>
        `;
    } else
    {
        infoDiv.innerHTML = `
            ${item.email.split('@')[0]} 
            <label style="font-family: var(--the-font); display: flex; width: 100%; justify-content: space-between;">
                ${item.group}
                <div style="display:none;" class="id-div">
                    ${item.group}
                </div>
            </label>
        `;
    }
    return infoDiv;
}

function updatePagination(queryResponse, pageNumberChanger)
{
    const pageInfoElement = document.getElementById('page-info');
    if (queryResponse.totalPages > 1)
    {
        pageInfoElement.textContent = `Page ${pageNumberChanger.dataset.pagenumber} of ${queryResponse.totalPages}`;
        pageNumberChanger.dataset.maxpages = queryResponse.totalPages;
        pageNumberChanger.dataset.pagenumber = Math.min(pageNumberChanger.dataset.pagenumber, queryResponse.totalPages);
        pageNumberChanger.style.display = 'flex';
    } else
    {
        pageNumberChanger.style.display = 'none';
    }
}

function getBorrowerImageGroup(group)
{
    const imageGroups = {
        'Agree': 'figure_one_green.png',
        'Disagree': 'figure_one_red.png',
    };
    return imageGroups[group] || 'figure_one_blue.png';
}

async function list_books()
{
    return;
    await listItems('books');
}
function list_borrowers()
{
    listItems('borrowers');
}

function playOpenSound()
{
    let randomInteger = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    let audio = new Audio("sfx/" + randomInteger + ".mp3");
    audio.volume = 0.3;
    audio.play();
}

function book_click_handler(e)
{
    playOpenSound();
    if (book_edit_button.dataset.currentid == e.currentTarget.dataset.id)
    {
        return;
    }
    e.currentTarget.style.viewTransitionName = "book-cover";
    book_display(e.currentTarget.dataset.id, false);
}

async function book_display(ARGUMENT_ID, excused_from_dialog = false, start_in_edit_mode = false)
{
    if (ARGUMENT_ID == "creation")
    {
        clickHandler_create(excused_from_dialog);
        return;
    }

    let useid = ARGUMENT_ID; //ev.srcElement.dataset.id;
    let book = loaded_book_records.find((s) =>
    {
        return s.id == useid;
    });

    if (display_area_edit_mode && !excused_from_dialog)
    {
        nextid_book = ARGUMENT_ID;
        book_open_discard_draft_modal();
        return;
    }
    nextid_book = "";

    if (ARGUMENT_ID == "")
    {
        book_edit_button.dataset.currentid = "";
        change_display_area_mode("none", display_area);
        return;
    }

    if (start_in_edit_mode)
    {
        change_display_area_mode("edit", display_area);
    }
    else
    {
        change_display_area_mode("display", display_area);
    }


    highlight_selected_item(useid, list_area_list_books);

    display_panel_book_cover.src = "";

    book_edit_button.dataset.currentid = ARGUMENT_ID;



    /////////DISPLAY PANEL NONSENCE/////////////////////////////////////
    display_panel_book_system_id.innerHTML = "SYS_ID: " + book.id;
    display_panel_book_book_id.innerHTML = "ID: " + book.book_id;
    if (book.legacy_book_id.match("DEPRECATED_"))
    {
        display_panel_book_legacy_book_id.innerHTML = "";
    } else
    {
        display_panel_book_legacy_book_id.innerHTML =
            "IDL: " + book.legacy_book_id;
    }
    display_panel_book_title.innerHTML = book.title;
    display_panel_book_author.innerHTML = "by " + book.author;
    display_panel_book_isbn.innerHTML = "ISBN: " + book.isbn;

    if (book.preview_url_override == "")
    {
        display_panel_book_cover.src = `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;
    } else
    {
        display_panel_book_cover.src = book.preview_url_override;
    }

    display_panel_book_description.innerHTML = book.description;
    display_panel_book_classification_label.innerHTML =
        "CLL: " + book.classification_label;

    if (book.subject != "")
    {
        const book_subject_jr8r04 = await pb
            .collection("books_subjects")
            .getOne(book.subject, {});
        display_panel_book_subject.innerHTML = "Subject: " + book_subject_jr8r04.subject;
    }
    else
    {
        display_panel_book_subject.style.display = "none";
    }

    if (book.level != "")
    {
        display_panel_book_level.innerHTML = "Level: " + book.level;
    }
    else
    {
        display_panel_book_level.style.display = "none";
    }



    display_panel_book_lost.style.display = book.lost ? "block" : "none";
    display_panel_book_scrapped.style.display = book.scrapped ?
        "block" :
        "none";
    if (book.price > 0)
    {
        display_panel_book_price.style.display = "block";
        display_panel_book_price.innerHTML = "Price: " + book.price + " EUR";
    }
    else
    {
        display_panel_book_price.style.display = "none";
    }

    if (book.legacy_date_entered == "")
    {
        display_panel_book_created.innerHTML = "Created: " + book.created;
    } else
    {
        display_panel_book_created.innerHTML = "Legacy Created: " + book.legacy_date_entered;
    }

    display_panel_book_system_created.innerHTML = "SYS_CREATED: " + book.created;
    display_panel_book_updated.innerHTML = "Updated: " + book.updated;

    ///////////////////////////////////////////////////////////
    display_panel_book_title_editing.value = book.title;
    display_panel_book_author_editing.value = book.author;

    if (book.preview_url_override === "")
    {
        display_panel_book_preview_url_override_editing.placeholder =
            "Automatic";
    }
    display_panel_book_preview_url_override_editing.value =
        book.preview_url_override;

    display_panel_book_book_id_editing.innerText = "ID: " + book.book_id;

    if (book.legacy_book_id.match("DEPRECATED_"))
    {
        display_panel_book_legacy_book_id_editing.innerText = "";
        j5498.style.display = "none";
    } else
    {
        display_panel_book_legacy_book_id_editing.innerText =
            "IDL: " + book.legacy_book_id;
        j5498.style.display = "flex";
    }

    display_panel_book_isbn_editing.value = book.isbn;
    display_panel_book_description_editing.value = book.description;
    display_panel_book_classification_label_editing.value =
        book.classification_label;
    display_panel_book_level_editing.value = book.level;
    display_panel_book_subject_editing.value = book.subject;

    if (!book.lost)
    {
        display_panel_book_lost_editing
            .querySelectorAll("button[data-value=true]")
            .forEach((element) =>
            {
                element.dataset.state = "true";
                segmented_button_thing("", element);
            });
    } else
    {
        display_panel_book_lost_editing
            .querySelectorAll("button[data-value=false]")
            .forEach((element) =>
            {
                element.dataset.state = "false";
                segmented_button_thing("", element);
            });
    }

    if (!book.scrapped)
    {
        display_panel_book_scrapped_editing
            .querySelectorAll("button[data-value=true]")
            .forEach((element) =>
            {
                element.dataset.state = "true";
                segmented_button_thing("", element);
            });
    } else
    {
        display_panel_book_scrapped_editing
            .querySelectorAll("button[data-value=false]")
            .forEach((element) =>
            {
                element.dataset.state = "false";
                segmented_button_thing("", element);
            });
    }

    //display_panel_book_lost_editing.dataset.value = book.lost
    //display_panel_book_scrapped_editing.dataset.value = book.scrapped
    display_panel_book_price_editing.value = book.price;
}
async function clickHandler_create(excused_from_dialog = false)
{
    playOpenSound();

    if (display_area_edit_mode && !excused_from_dialog)
    {
        nextid_book = "creation";
        book_open_discard_draft_modal();
        return;
    }

    //delete_borrower_forever.style.display = "none"
    book_edit_button.dataset.currentid = "creation";

    await generate_unique_book_id().then((generated_id_response) =>
    {
        generatedid_book = generated_id_response;
    });

    display_panel_book_title_editing.value = "";
    display_panel_book_author_editing.value = "";
    display_panel_book_preview_url_override_editing.value = "";
    display_panel_book_book_id_editing.innerText = "ID: " + generatedid_book;

    display_panel_book_legacy_book_id_editing.innerText = "";
    j5498.style.display = "none";

    display_panel_book_isbn_editing.value = "";
    display_panel_book_description_editing.value = "";
    display_panel_book_classification_label_editing.value = "";
    display_panel_book_level_editing.value = "";
    display_panel_book_subject_editing.value = "";
    //display_panel_book_lost_editing.value = ""
    //display_panel_book_scrapped_editing.value = ""
    display_panel_book_price_editing.value = "";

    let clickedOne = create_book_button;
    list_area_list_books.querySelectorAll(".list-item").forEach(function (i)
    {
        i.style.background = "";
        //i.style.borderRadius = "";
        //i.style.margin = "";
        //i.style.padding = "";
    });
    //clickedOne.style.cssText = "border-radius: 1.5em !important; background: var(---secondary-container); margin: 0.2em !important; padding: 0.8em !important";
    clickedOne.style.background = "var(---on-surface-2)";

    change_display_area_mode("edit", display_area);
}

function close_lend_book_dialog()
{
    dpdb_add_button_FAKE.style = null;
    iirirri9i49.style.transform = "scaleX(1) scaleY(1)";
    iirirri9i49.style.opacity = "1";
    add_book_to_borrow_dialog.style.transitionDuration = "0.4s";
    add_book_to_borrow_dialog.style.opacity = "0";
    add_book_to_borrow_dialog.style.width = "0";
    add_book_to_borrow_dialog.style.height = "0";
    eggririir = 1;
    eer4r4 = setInterval(() =>
    {
        document.body.style.setProperty("--j95r4ji5r-opacity", eggririir);
        eggririir -= 0.05;
    }, 10);
    add_book_to_borrow_dialog.style.transformOrigin = "center";
    setTimeout(() =>
    {
        add_book_to_borrow_dialog.close();
        add_book_to_borrow_dialog.style.display = "none";
        clearInterval(eer4r4);
    }, 500);
}

function add_borrower_book_button_handler(event)
{
    document.body.style.setProperty("--j95r4ji5r-opacity", "1");
    iirirri9i49.style.opacity = "1";
    iirirri9i49.style.transform = "scaleX(1) scaleY(1)";
    add_book_to_borrow_dialog.style = null;
    add_book_to_borrow_dialog.style.display = "flex";
    add_book_to_borrow_dialog.showModal();
    container_book.style.display = "flex";
    list_books();

    var zeBOX = dpdb_add_button.getBoundingClientRect();

    book_enable_lend_view(true);



    finaltargetWidth = add_book_to_borrow_dialog.getBoundingClientRect().width;
    finaltargetHeight =
        add_book_to_borrow_dialog.getBoundingClientRect().height;

    dpdb_add_button_FAKE.style.display = "flex";
    iirirri9i49.style.transform = `scaleX(1) scaleY(1)`;
    dpdb_add_button_FAKE.style.width = zeBOX.width + "px";
    dpdb_add_button_FAKE.style.height = zeBOX.height + "px";
    dpdb_add_button_FAKE.style.left = zeBOX.left + "px";
    dpdb_add_button_FAKE.style.top = zeBOX.top + "px";

    add_book_to_borrow_dialog.style.transition = "0s";
    add_book_to_borrow_dialog.style.display = "flex";
    //add_book_to_borrow_dialog.style.transform = `scaleX(0.1) scaleY(0.1)`;
    //add_book_to_borrow_dialog.style.transform = `scaleX(${zeBOX.width / finaltargetWidth}) scaleY(${zeBOX.height / finaltargetHeight})`;
    add_book_to_borrow_dialog.style.width = zeBOX.width + "px";
    add_book_to_borrow_dialog.style.height = zeBOX.height + "px";
    add_book_to_borrow_dialog.style.left = zeBOX.left + "px";
    add_book_to_borrow_dialog.style.top = zeBOX.top + "px";
    add_book_to_borrow_dialog.style.opacity = "0";
    iirirri9i49.style.transform = "scaleX(1) scaleY(1)";

    setTimeout(() =>
    {
        iirirri9i49.style.transform = "scaleX(1) scaleY(1)";
        add_book_to_borrow_dialog.style.transition =
            "0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97)";
        iirirri9i49.style.transition =
            "0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97)";
        dpdb_add_button_FAKE.style.display = "flex";
        iirirri9i49.style.transform = `scaleX(${finaltargetWidth / zeBOX.width
            }) scaleY(${finaltargetHeight / zeBOX.height})`;
        dpdb_add_button_FAKE.style.width = finaltargetWidth + "px";
        dpdb_add_button_FAKE.style.height = finaltargetHeight + "px";
        dpdb_add_button_FAKE.style.left = "50%";
        dpdb_add_button_FAKE.style.top = "50%";
        dpdb_add_button_FAKE.style.translate = "-50% -50%";

        //add_book_to_borrow_dialog.style.transform = `scaleX(1) scaleY(1)`;
        add_book_to_borrow_dialog.style.width = finaltargetWidth + "px";
        add_book_to_borrow_dialog.style.height = finaltargetHeight + "px";
        add_book_to_borrow_dialog.style.left = "50%";
        add_book_to_borrow_dialog.style.top = "50%";
        add_book_to_borrow_dialog.style.translate = "-50% -50%";
    }, 1);

    setTimeout(() =>
    {
        iirirri9i49.style.transition = "0.1s";
        iirirri9i49.style.opacity = "0";
        add_book_to_borrow_dialog.style.opacity = "1";
    }, 150);

    setTimeout(() =>
    {
        dpdb_add_button_FAKE.style = null;
        //iirirri9i49.style.transform = "scaleX(1) scaleY(1)"
        iirirri9i49.style.opacity = "1";
    }, 1000);
}
async function lend_book_to_borrower(bookid, borrowerid)
{
    const data = {
        person: borrowerid,
        book: bookid,
        returned: false,
    };
    console.log("TRANSACTION CREATION: ", data);
    await pb.collection("transactions").create(data);
    borrower_display(borrowerid);
}
async function delete_borrower(id)
{
    const records = await pb.collection("transactions").getFullList({
        filter: `person = '${id}'`,
    });
    records.forEach((rec) =>
    {
        const data = {
            person: "deletedborrower",
        };
        const record = pb.collection("transactions").update(rec.id, data);
    });
    await pb.collection("borrowers").delete(id);
    list_borrowers();
}

async function borrower_display(borrowerId, excused_from_dialog = false)
{
    playOpenSound();

    const isCreation = borrowerId === "creation";


    if (display_area_edit_mode_borrower && !excused_from_dialog)
    {
        const hasUnsavedChanges = [
            display_panel_borrower_name_editing.value,
            display_panel_borrower_surname_editing.value,
            display_panel_borrower_group_editing.value,
        ].some((value) => value !== "");

        if (hasUnsavedChanges)
        {
            nextid_borrower = borrowerId;
            borrower_open_discard_draft_modal();
            return;
        }
    }

    nextid_borrower = "";
    let borrower = {};

    if (isCreation)
    {
        delete_borrower_forever.style.display = "none";
        change_display_area_mode("edit", display_area_borrower);
        borrower = await borrower_create_blank();
    } else
    {
        borrower = await handleBorrowerDisplay(borrowerId);
    }

    updateBorrowerEditingPanel(borrower);
    if (!isCreation)
    {
        updateBorrowerDisplayPanel(borrower);
        await updateBorrowerBooks(borrower.id);
    }

    highlight_selected_item(borrowerId, list_area_list_borrowers);
}

async function borrower_create_blank()
{
    try
    {
        const response = await fetch("borrowers_id_list_length_3.txt");
        const text = await response.text();
        generatedid_borrower = generate_unique_borrower_id(text);
    } catch (e)
    {
        console.error(e);
    }
    return (borrower = {
        name: "",
        surname: "",
        borrower_id: generatedid_borrower,
        group: "",
    });
}

async function handleBorrowerDisplay(borrowerId)
{
    delete_borrower_forever.style.display = "flex";
    change_display_area_mode("display", display_area_borrower);
    return loaded_borrower_records.find((borrower) => borrower.id === borrowerId);
}

function updateBorrowerEditingPanel(borrower)
{
    display_panel_borrower_name_editing.value = borrower.email;
    display_panel_borrower_surname_editing.value = borrower.surname;
    display_panel_borrower_borrower_id_editing.innerText = `ID: ${""}`;
    display_panel_borrower_group_editing.value = borrower.group;

    edit_button_borrower.dataset.currentid = borrower.id;
}

function updateBorrowerDisplayPanel(borrower)
{
    let username;
    let domain;
    username = borrower.email.split('@')[0];
    domain = "@" + borrower.email.split('@')[1];
    dpdb_name.innerText = username;
    dpdb_surname.innerHTML = domain;
    dpdb_borrower_id.innerText = `ID: ${borrower.borrower_id}`;
    dpdb_group.innerText = `Group: ${borrower.group}`;
    dpdb_created.innerText = `Created: ${borrower.created}`;
    dpdb_updated.innerText = `Updated: ${borrower.updated}`;
    dpdb_id.innerText = `SYS_ID: ${borrower.id}`;
    dpdb_add_button.dataset.borrowerid = borrower.id;
    signature_image.src = pb.files.getUrl(borrower, borrower.signature);
}

async function updateBorrowerBooks(borrowerId)
{
    return;
}

async function display_in_isolation(id)
{
    let searchBar = list_area.querySelector(".main-search-bar");
    searchBar.value = id;
    collection_change();

    //book_display(list_area.querySelector(".list-item:not(.create-button)").dataset.id);
}


function createBookView(transaction)
{
    const book = transaction.expand.book;
    const previewImageUrl =
        book.preview_url_override ||
        `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;

    const bookView = document.createElement("div");
    bookView.classList.add("book_view");
    bookView.innerHTML = `
        <div style="display: flex; border-top: solid var(---surface-5) 2px;">
            <div style="margin-top: 0.5em;">
                <img style="object-fit: cover; padding: 0.2em; width: 6em; height: calc(100% - 1em); background-color: var(---inverse-surface); border-radius: 0.6em;" src="${previewImageUrl}">
            </div>
            <div style="margin-bottom: 0.5em; margin-top: 0.5em; display: flex; align-items: center; width: 100%; justify-content: left; margin-left: 1em;">
                <div style="width: 100%">
                    <div style="font-weight: bold; font-size: xx-large; text-wrap: wrap;">
                        ${book.title}
                    </div>
                    <div style="margin-bottom: 0.3em; padding: 0.3em; border-radius: 0.3em; font-size: 1.1em; background-color: var(---surface-3);">
                        <label style="font-family:var(--the-robo-font)">ID: ${book.book_id}</label><br>
                        <label style="font-family:var(--the-robo-font)">ISBN: ${book.isbn}</label>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: end;">
                        <button onclick="return_book('${transaction.id}','${transaction.person}');" class="button-circle">
                            <span style="user-select: none; font-size: 1.5em; margin: 0.2em;" class="material-symbols-outlined">tab_close</span>
                        </button>
                        <button onclick="display_in_isolation('${book.book_id}')" style="margin-left: 0.3em;" class="button-circle">
                            <span class="material-symbols-outlined">open_in_new</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    return bookView;
}

function highlight_selected_item(id, list_element)
{
    // Catching error just in case
    if (list_element == null)
    {
        console.error("The list element is null");
        return;
    }

    list_element.querySelector(".list-item.selected")?.classList.remove("selected");

    // If the id is blank then dont highlight a new one
    if (id != "")
    {
        const clickedOne = list_element.querySelector(
            `button[data-id="${id}"]`
        );
        if (clickedOne != null)
        {
            clickedOne.classList.add("selected");
        }
    }
}

async function return_book(id, person)
{
    await pb.collection("transactions").update(id, { returned: true });
    borrower_display(person);
}

function generate_unique_borrower_id(text)
{
    try
    {
        let randInt = Math.floor(Math.random() * 46655) * 3;
        return (generated_id = text.substring(randInt, randInt + 3));
        //const data_new = { "borrower_id": generated_id };
        //pb.collection('borrowers').update(record_id, data_new);
    } catch (err)
    {
        if (err.data.data.borrower_id.code == "validation_not_unique")
        {
            generate_unique_borrower_id(text);
        }
    }
}

function open_signin_modal(event)
{
    if (pb.authStore.isValid)
    {
        pb.authStore.clear();
        document.getElementById("sign_in_button").innerHTML =
            "<span style='padding-right: 0.2em; scale:0.8; translate: -1px 0px;' class='material-symbols-outlined'>logout</span>Sign In";
        return;
    }
    document.getElementById("sign_in_dialog").showModal();
    document.addEventListener("keydown", enter_key_pressed_in_sign_in_dialog);
}

function close_sign_in_modal(event)
{
    document.getElementById("sign_in_dialog").close();
}

function enter_key_pressed_in_sign_in_dialog(event)
{
    if (event.code === "Enter")
    {
        acceptSigninModal(event);
    }
}
async function acceptSigninModal(event)
{
    email = document.getElementById("email_input").value + "@sanandrea.edu.mt";
    password = document.getElementById("password_input").value;

    if (password != "" && email != "@sanandrea.edu.mt" && email != "")
    {
        try
        {
            const auth_data = await pb
                .collection("users")
                .authWithPassword(email, password);
            document.getElementById("sign_in_button").innerHTML =
                "<span style='padding-right: 0.2em; scale:0.8; translate: -1px 0px;' class='material-symbols-outlined'>logout</span>Sign Out";
        } catch (error)
        {
            window.alert("Wrong username/password" + "\n\n" + error);
            return;
        }
    } else
    {
        window.alert("U can't leave the email/pass blank ):<");
        return;
    }
    close_sign_in_modal();
}
function previous_page(event)
{
    page_number_changer = event.srcElement.closest(".page-number-changer");
    if (page_number_changer.dataset.pagenumber - 1 >= 1)
    {
        page_number_changer.dataset.pagenumber -= 1;
        list_books();
    }
}
function next_page(event)
{
    page_number_changer = event.srcElement.closest(".page-number-changer");
    if (page_number_changer.dataset.maxpages >= parseInt(page_number_changer.dataset.pagenumber) + 1)
    {
        page_number_changer.dataset.pagenumber = parseInt(page_number_changer.dataset.pagenumber) + 1;
        list_books();
    }
}