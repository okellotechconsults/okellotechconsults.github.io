// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBCfH42XgDS34SEE4qRYBk5b9UEQu1Ch94",
    authDomain: "errands-ac03b.firebaseapp.com",
    databaseURL: "https://errands-ac03b.firebaseio.com",
    projectId: "errands-ac03b",
    storageBucket: "errands-ac03b.appspot.com",
    messagingSenderId: "801309858907"
  };
  firebase.initializeApp(config);

  console.log("working");
  $("#signUp").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  // ...
    });

  });


   $("#signIn").click(function(){
    var email = $("#signInEmail").val();
    var password = $("#signInPassword").val();
    $("#signInEmail").val() = "";
    $("#signInPassword").val() = ""; 
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  // ...

    });
    

  });

   firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
    console.log("U have successfully signed in");
    alert("u are signed in");
    $("#signedIn").css("display", "block");
    $("#auth").css("display", "none");
    
  } else {
    // User is signed out.
    // ...
    console.log("U are not signed in");
  }
});


   $("#signOut").click(function(){
      alert("are u sure u want to sign out");
        firebase.auth().signOut().then(function() {
  // Sign-out successful.
      $("#signedIn").css("display", "none");
      $("#auth").css("display", "block");
        }).catch(function(error) {
  // An error happened.
      });
    });

