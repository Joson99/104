function login() {

  var userAppConfig = {
   apiKey: "AIzaSyBms41VX6EdUCp6SXGe2o3oNgfojdL_Jag",
   authDomain: "signup-7dde1.firebaseapp.com",
   databaseURL: "https://signup-7dde1-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "signup-7dde1",
   storageBucket: "signup-7dde1.appspot.com",
   messagingSenderId: "1071851935558",
   appId: "1:1071851935558:web:f13cea70a628187a07f747"
  };
  
    // Initialize Firebase with Firebase project's config
    var userApp = firebase.initializeApp(userAppConfig, "userApp");
    var username = document.getElementById("client-username").value;
    var password = document.getElementById("client-password").value;
  
    console.log("Trying to log in with username:", username, "and password:", password);
  
    // Show loading spinner
    showLoading();

    // Query the Firebase database for the given username and password
    var userRef = userApp.database().ref("user");
    userRef.child(username)
      .once("value", function(snapshot) {
        // Hide loading spinner
        hideLoading();

        var userData = snapshot.val();
  
        if (userData && userData.Password === password) {

            document.getElementById('client-username').value = '';
            document.getElementById('client-password').value = '';

            // Save username and password in sessionStorage
            var getUser = username;
            sessionStorage.setItem('username', getUser);
            var getPass = password;
            sessionStorage.setItem('password', getPass);

            hideLoading()
            alert("Login successful!");

            // Redirect to clientafterlog.html
            window.location.href = 'clientafterlog.html';

        } else {
          // Login failed, show an error message.
          var errorMessageElement = document.getElementById("error-message");
          alert("Invalid Username Or Password ! ");
          document.getElementById('client-username').value = '';
          document.getElementById('client-password').value = '';
        }
      })
      .catch(function(error) {
        console.log("Error retrieving data:", error);
      });
}



function confirmLogout() {
  // Ask the user for confirmation
  var logoutConfirmed = confirm("Do you really want to log out?");

  // If the user confirms, proceed with logout
  if (logoutConfirmed) {
    clientLogout();
  }
}

function clientLogout() {
  // Clear the session storage
  sessionStorage.clear();

  // Redirect the user to index.html
  window.location.replace("index.html");
}

function showLoading() {
  document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loading-spinner').classList.add('hidden');
}

