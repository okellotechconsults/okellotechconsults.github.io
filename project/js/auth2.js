//importing head and footer
$('#head').load("./head.html");
$("#goToSignUp").click(function(){
    $("#signInPage").hide();
    $("#signUpPage").show();
});

$("#goToSignIn").click(function(){
    $("#signUpPage").hide();
    $("#signInPage").show();
});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAvXeHz88xqwaFA8kB9PCK_A6aUDE14kOo",
    authDomain: "project-f7a5d.firebaseapp.com",
    databaseURL: "https://project-f7a5d.firebaseio.com",
    projectId: "project-f7a5d",
    storageBucket: "project-f7a5d.appspot.com",
    messagingSenderId: "79860480110"
};
firebase.initializeApp(config);
//AUTHENTICATION
//check authentication status
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log("u are signed in");
        window.close();
        // ...
    } else {
        // User is signed out.
        console.log("signed out");
        // ...
    }
});

//google sign in on click


$(".googleAuth").click(function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    //firebase signing in with google
    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
    })

});

// sign up and in with Email and password

//signup
$("#signUp").click(function(){
    console.log("sign up button clicked");
    var email = $("#signUpEmail").val();
    var password = $("#signUpPassword").val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
});

//signin
$("#signIn").click(function(){
    console.log("sign in button clicked");
    var email = $("#signInEmail").val();
    var password = $("#signInPassword").val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
});