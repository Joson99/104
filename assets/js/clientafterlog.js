function showMyAppointment() {
    // wala pa
}

function showMyHistory() {
    window.location.href = 'myhistory.html';
}

function showProfileSection() {
    window.location.href = 'viewprofile.html';
}

function showAnnouncement() {
    // wala pa
}




























// Update the username indicator based on the currently logged in user
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

  












// Scroll to the top of the page when the website is refreshed
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});
