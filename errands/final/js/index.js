$("#order").click(function(){
        $("#order").addClass("active");
        $("#find").removeClass("active");
        $("#contact").removeClass("active");

        $("#order-ui").show();
        $("#find-ui").hide();
        $("#contact-ui").hide();
    });


    $("#find").click(function(){
            $("#order").removeClass("active");
            $("#find").addClass("active");
            $("#contact").removeClass("active");

            $("#order-ui").hide();
            $("#find-ui").show();
            $("#contact-ui").hide();
        });


        $("#contact").click(function(){
                $("#order").removeClass("active");
                $("#find").removeClass("active");
                $("#contact").addClass("active");


                $("#order-ui").hide();
                $("#find-ui").hide();
                $("#contact-ui").show();
            });
$("#sign-up-link").click(function(){
  $("#sign-up").fadeIn(1000);
  $("#sign-in").hide();
});
$("#sign-in-link").click(function(){
  $("#sign-up").hide();
  $("#sign-in").fadeIn(1000);
});

$("#menu-btn, #reference").click(function(){
  $(".dropdown-menu").toggle();
});

//FIREBASE BACK END
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
//AUTHENTICATION

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
 $("#signed-in").css("display", "block");
 $("#auth").css("display", "none");



} else {
 // User is signed out.
 // ...
 $("#auth").css("display", "block");
 $("#signed-in").css("display", "none");
 console.log("U are not signed in");

}
});


//SIGNING UP

$("#sign-up-btn").click(function(){
  console.log("u have clicked sign up")
    var email = $("#sign-up-email").val();
    var password = $("#sign-up-password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  });

//SIGNING IN
$("#sign-in-btn").click(function(){
 var email = $("#sign-in-email").val();
 var password = $("#sign-in-password").val();


 firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
// Handle Errors here.
 var errorCode = error.code;
 var errorMessage = error.message;
 console.log("error code: " + errorCode + " " + "error message: " + errorMessage)
// ...
});
 });

 //SIGNING IN WITH GOOGLE
 var gprovider = new firebase.auth.GoogleAuthProvider();
 $("#sign-in-with-google-btn").click(function(){
   firebase.auth().signInWithRedirect(gprovider);
 });
//SIGNING IN WITH facebook

var fbprovider = new firebase.auth.FacebookAuthProvider()
$("#sign-in-with-facebook-btn").click(function(){
  firebase.auth().signInWithRedirect(fbprovider);
});


 //SIGNING OUT
 $("#sign-out-btn").click(function(){
    console.log("u have clicked sign out");
      firebase.auth().signOut().then(function() {
// Sign-out successful.
    $("#signed-in").css("display", "none");
    $("#auth").css("display", "block");
      }).catch(function(error) {
// An error happened.
    });
  });
