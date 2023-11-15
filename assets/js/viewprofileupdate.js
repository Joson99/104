var userAppConfig = {
    apiKey: "AIzaSyBms41VX6EdUCp6SXGe2o3oNgfojdL_Jag",
    authDomain: "signup-7dde1.firebaseapp.com",
    databaseURL: "https://signup-7dde1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "signup-7dde1",
    storageBucket: "signup-7dde1.appspot.com",
    messagingSenderId: "1071851935558",
    appId: "1:1071851935558:web:f13cea70a628187a07f747"
  };
  
  
    // Initialize Firebase
    var user = firebase.initializeApp(userAppConfig,"userdb");
    var userdb = user.database();
    
  
  
    //firebase para sa records
  
    var RecordsfirebaseConfig = {
      apiKey: "AIzaSyAkXWSqu83NIyy6r0qvRrGgKXDQ52butnw",
      authDomain: "records-ff721.firebaseapp.com",
      databaseURL: "https://records-ff721-default-rtdb.firebaseio.com",
      projectId: "records-ff721",
      storageBucket: "records-ff721.appspot.com",
      messagingSenderId: "171620874174",
      appId: "1:171620874174:web:4a29998768af484e9dabef"
    };
  
    // Initialize Firebase
    var records = firebase.initializeApp(RecordsfirebaseConfig,"recorddb");
    var recorddb = records.database();
  
  
  
  
  
  
  
  
  
  
  
  /////////////////////////////// FIREBASE CONNECTION ////////////////////////////////////
  
  
  
  
  
  /////////////// pang store lang ng data para malipat sa kabilang form//////////////////
  
  var  GetUsername = sessionStorage.getItem("username");
  var Getpass = sessionStorage.getItem("password");
  
  /////////////// pang store lang ng data para malipat sa kabilang form//////////////////
  
  
  
  var userRef = user.database().ref("user");
  var username = GetUsername; 
  var getid;
  userRef.child(username).once("value")
    .then(function(snapshot) {
        var userData = snapshot.val();
        for (let i in userData) {
  
         dump();
            document.getElementById('username').value = snapshot.val().Username;
            document.getElementById('password').value = snapshot.val().Password;
            document.getElementById('confirm-password').value = snapshot.val().Password;
            document.getElementById('last-name').value = snapshot.val().LastName;
            document.getElementById('first-name').value = snapshot.val().FirstName;
            document.getElementById('middle-name').value = snapshot.val().MiddleName;
            document.getElementById('date-of-birth').value = snapshot.val().BirthDate;
            document.getElementById('gender').value = snapshot.val().Gender;
            document.getElementById('civil-status').value=snapshot.val().CivilStatus;
            document.getElementById('email').value = snapshot.val().Email;
            document.getElementById('phone-number').value=snapshot.val().PhoneNum;
            document.getElementById('province').value =snapshot.val().Province;
            document.getElementById('city-municipality').value = snapshot.val().CityMunicipality;      
            document.getElementById('barangay').value = snapshot.val().Barangay;
            getid = snapshot.val().AUTOID;
            console.log("laman ko " + previousDatausername);
        }
    })
    .catch(function(error) {
        console.log("Error retrieving data:", error);
    });
  
  
  
  
  
    function dump() {
       previousDatausername = GetUsername;
       previousDatapassword = Getpass;
      // Store other fields' previous values here as needed
    }
    
  
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function checkUsernameExists(username) {
    return userdb.ref("user").orderByChild("Username").equalTo(username).once("value");
    }
  
  
    var currentUsername = GetUsername; // Replace with the current username
  
   function UpdateDetails (){
    
    var editButton = document.getElementById('editProfileButton');
    var saveButton = document.getElementById('saveProfileButton');
    editButton.removeAttribute('disabled');
    saveButton.setAttribute('disabled', 'true');

    var enabledElements = document.querySelectorAll('.profile-form [required]');
    
    enabledElements.forEach(function (element) {
        element.setAttribute('disabled', 'true');
    });


     dump();
     
     var username = document.getElementById('username').value;
     var password = document.getElementById('password').value;
     var confirmPassword = document.getElementById('confirm-password').value;
     var lastName = document.getElementById('last-name').value;
     var firstName = document.getElementById('first-name').value;
     var middleName = document.getElementById('middle-name').value;
     var birth = document.getElementById('date-of-birth').value;
     var gender = document.getElementById('gender').value;
     var civilStatus = document.getElementById('civil-status').value;
     var email = document.getElementById('email').value;
     var phoneNum = document.getElementById('phone-number').value;
     var province = document.getElementById('province').value;
     var CM = document.getElementById('city-municipality').value;
     var barangay = document.getElementById('barangay').value;
  
    console.log(" ito yung dating laman ng login user at user " + previousDatausername +"  "+ currentUsername);
    console.log("laman ng current username " + username);
  
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

      ){
        
  
        if(previousDatausername === username){
          if (password == confirmPassword) {
            userdb.ref('user/' + currentUsername).remove();
            userdb.ref('user/' + username).set({
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
              CityMunicipality:CM,
              Barangay:barangay,
              AUTOID:getid,
              
            })
            .then(()=>{
              if(previousDatausername !== username || previousDatapassword !== password)
              {
                alert("Details Updated Successfully!");
                alert("you need to sign in again, because you change your username or password ");
                clientLogout();
              }else{
                alert("Details Updated Successfully!");
              }
            })
            .catch((error)=>{
              alert("unsuccessful, error "+error);
            });
           
          } else {
          alert("Password and Confirm Password does not match !");
         }
         
        }else {
  
          checkUsernameExists(username)
          .then(snapshot => {
            if (!snapshot.exists()) {
              // Username doesn't exist, proceed with registration
              userdb.ref('user/'+currentUsername).remove();
              userdb.ref('user/' + username).set({
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
                CityMunicipality:CM,
                Barangay:barangay,

              });
  
              alert("Details Updated Successfully!");
            } else {
              document.getElementById('username').value = previousDatausername;
              alert("Username already exists. Please choose a different username.");
            }
          })
  
  
        }
        
  
   
  
  
  
    
  
  } else {
  alert("Please fill all textbox");
  }
  
  }// end ng function   







