//toggle menu
$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
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

//initialising the database
var db = firebase.database().ref().child("uploads/posts");

db.on("child_added", snap => {
  console.log("added");
  var title = snap.child("title").val();
  var author = snap.child("author").val();
  var url = snap.child("url").val();
  var siteUrl = snap.child("siteUrl").val();
  var description = snap.child("description").val();
  var category = snap.child("category").val();
  
  if(siteUrl == ""){
    console.log("the fileurl is ",url, "the site url is", siteUrl)
    $("#searchResults").append(`
    <div class="list-group">
    <a target="_blank" href="${url}" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1 name">${title}</h5>
    <small>${category}</small>
    </div>
    <p class="mb-1">${description}</p>
    <small class="author">${author}</small>
    </a>
    <div>
    `)
  } else if(siteUrl != "") {
    console.log("the file url is ",url, "the site url is", siteUrl)
    $("#searchResults").append(`
    <div class="list-group">
    <a target="_blank" href="${siteUrl}" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1 name">${title}</h5>
    <small>${category}</small>
    </div>
    <p class="mb-1">${description}</p>
    <small class="author">${author}</small>
    </a>
    <div>
    `)
  }


  //list.js functions
  var options = {
   valueNames: ['name', 'author']
  };
  var userList = new List('users', options)
});

//AUTHENTICATION
//check authentication status
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
    console.log("signed in");

    $("#authStatus").html("Hello " + displayName + " welcome");
    $("#signIn").hide();
    $("#sidebarAuth").click(function signOut(){
      console.log("attempt to sign out");
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console,log("you have successfully signed out");
      }).catch(function(error) {
        // An error happened.
      });
    }
    );
    $("#sidebarAuth").text("Sign Out");

    // ...
  } else {
    // User is signed out.
    console.log("signed out");
    $("#sidebarAuth").text("Sign In");
    $("#sidebarAuth").attr("href", "auth.html");
    // ...
  }
});

 //google sign in on click

 var provider = new firebase.auth.GoogleAuthProvider();

 $("#signIn").click(function(){
   //firebase signing in with google
       firebase.auth().signInWithPopup(provider).then(result => {
           const user = result.user;
           console.log(user);
   })

});




