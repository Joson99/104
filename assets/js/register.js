var firstDb;

function testing(){
    recorddb.ref('record/' + dagdag).set({
    AUTOID:dagdag,
    Date:".",
});
 
}


var RecorduserConfig = {
  apiKey: "AIzaSyAkXWSqu83NIyy6r0qvRrGgKXDQ52butnw",
  authDomain: "records-ff721.firebaseapp.com",
  databaseURL: "https://records-ff721-default-rtdb.firebaseio.com",
  projectId: "records-ff721",
  storageBucket: "records-ff721.appspot.com",
  messagingSenderId: "171620874174",
  appId: "1:171620874174:web:4a29998768af484e9dabef"
};
 // Initialize Firebase
 var recorddb = firebase.initializeApp(RecorduserConfig, "RecordUserDatabase").database();



// Initialize Firebase for user registration
var signupConfig = {
  apiKey: "AIzaSyBms41VX6EdUCp6SXGe2o3oNgfojdL_Jag",
  authDomain: "signup-7dde1.firebaseapp.com",
  databaseURL: "https://signup-7dde1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "signup-7dde1",
  storageBucket: "signup-7dde1.appspot.com",
  messagingSenderId: "1071851935558",
  appId: "1:1071851935558:web:f13cea70a628187a07f747"
};

// Initialize Firebase for user registration
firebase.initializeApp(signupConfig);
var db = firebase.database();


let dagdag = 0;

// Function to get the last generated ID
function getLastGeneratedId() {
  return recorddb.ref("lastGeneratedId").once("value");
}



// Function to set the last generated ID
function setLastGeneratedId(id) {
  recorddb.ref("lastGeneratedId").set(id);
}

// Function to check if a username exists
// para sa user
function checkUsernameExists(username) {
  return db.ref("user").orderByChild("Username").equalTo(username).once("value");
}

function registerUser() {
    showLoading();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm_password').value;
    var lastName = document.getElementById('last-name').value;
    var firstName = document.getElementById('first-name').value;
    var middleName = document.getElementById('middle-name').value;
    var birth = document.getElementById('datepicker').value;
    var gender = document.getElementById('select-sex').value;
    var civilStatus = document.getElementById('select-civil-status').value;
    var email = document.getElementById('email').value;
    var phoneNum = document.getElementById('phone_number').value;
    var province = document.getElementById('province').value;
    var CM = document.getElementById('city').value;
    var barangay = document.getElementById('barangay').value;
  
    if (province !== 'Cavite') {
      // Set City/Municipality and Barangay to "N/A"
      CM = 'N/A';
      barangay = 'N/A';
    }
  
    if (
      username != '' &&
      password != '' &&
      confirmPassword != '' &&
      lastName != '' &&
      firstName != '' &&
      middleName != '' &&
      birth != '' &&
      gender != '' &&
      civilStatus != '' &&
      email != '' &&
      phoneNum != '' &&
      province != '' &&
      CM != '' &&
      barangay != ''
    ) {
      if (password === confirmPassword) {
        checkUsernameExists(username)
          .then(snapshot => {
            if (!snapshot.exists()) {
              getLastGeneratedId().then(lastIdSnapshot => {
                // Get the last generated ID
                const lastGeneratedId = lastIdSnapshot.val() || 0;
                // Increment the ID
                dagdag = lastGeneratedId + 1;
                // Set the last generated ID in the database
                setLastGeneratedId(dagdag);
                // Set user data
                db.ref('user/' + username).set({
                  Username: username,
                  Password: password,
                  LastName: lastName,
                  FirstName: firstName,
                  MiddleName: middleName,
                  BirthDate: birth,
                  Gender: gender,
                  CivilStatus: civilStatus,
                  Email: email,
                  PhoneNum: phoneNum,
                  Province: province,
                  CityMunicipality: CM,
                  Barangay: barangay,
                  AUTOID: dagdag,
                });
                testing();
                alert('Sign Up Successful!');
                location.reload();
                hideLoading();
              });
            } else {
                hideLoading();
                document.getElementById('username').value = '';
                alert('Username already exists. Please choose a different username.');
            }
          })
          .catch(error => {
            hideLoading();
            console.error('Error checking username:', error);
          });
      } else {
        hideLoading();
        alert('Passwords do not match. Please try again.');
        document.getElementById('password').value = '';
        document.getElementById('confirm_password').value = '';
      }
    } else {
        hideLoading();
        alert('Please fill all the text fields!');
    }
  }
  


document.getElementById('register-button').addEventListener('click', function(e) {
  e.preventDefault();
  registerUser();
});
