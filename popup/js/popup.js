//INSERT EXTERNAL CONTENT INTO THE TEST DIV




//FIREBASE
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

  
  $("#submit").click(function(){
      var url = document.getElementById("currentUrl").innerHTML;
      var category = $("#pri-cats").val();
      var title = $("#title").val();
      var author = "some author";
      var data = {
          title: title,
          author: author,
          url: url,
          category: category
      }
      db.push().set(data);
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
      // ...
    } else {
      // User is signed out.
      console.log("signed out");
      // ...
    }
  });
  
  //picking the url from current window
  let params = {
      active: true,
      currentWindow: true,
      muted: false
}
chrome.tabs.query(params, gotTabs);


function gotTabs(tabs){
    $("#currentUrl").text(tabs[0].url);
    console.log(tabs[0].url);
    let msg = {
        txt: "hello"
    }
    chrome.tabs.sendMessage(tabs[0].id, msg)
}


$("button").click(setup);
function setup(tabs){
    console.log("button clicked");
};