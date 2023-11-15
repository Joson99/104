/* ------ Update the username indicator based on the currently logged in user ------ */

function updateUsernameIndicator() {
    var usernameSpan = document.getElementById("username-span");
    var loggedInUsername = sessionStorage.getItem('username');
  
    if (loggedInUsername) {
        // Update the content of the span element
        if (loggedInUsername.length > 15) {
            // Display only the first 15 characters followed by "..."
            usernameSpan.textContent = loggedInUsername.substring(0, 15) + "...";
        } else {
            usernameSpan.textContent = loggedInUsername;
        }

        // Make the username indicator visible (if it's hidden)
        document.getElementById("username-indicator").style.display = "block";
    } else {
        // No user is logged in, hide the username indicator
        document.getElementById("username-indicator").style.display = "none";
    }
}

// Call this function to update the username indicator whenever needed
updateUsernameIndicator();

/* --------------------------------------------------------------------------------- */





/* ------ Enabled edit fields after clicking the edit button ------ */

function enableFields() {
    // Get all elements with the 'disabled' attribute within the form
    var disabledElements = document.querySelectorAll('.profile-form [disabled]');
    
    // Loop through the disabled elements and enable them
    disabledElements.forEach(function (element) {
        element.removeAttribute('disabled');
    });

    // Disable the "Edit" button
    var editButton = document.getElementById('editProfileButton');
    editButton.setAttribute('disabled', 'true');
}

/* ---------------------------------------------------------------- */





/* ------ My Profile Toggle (Account, Personal, Contact, and Address Information Navigation) ------ */

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.profile-nav-item');
    const formRows = document.querySelectorAll('.form-row');

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');

            formRows.forEach(formRow => formRow.style.display = 'none');
            formRows[index].style.display = 'flex';
        });
    });
});

/* ------------------------------------------------------------------------------------------------ */