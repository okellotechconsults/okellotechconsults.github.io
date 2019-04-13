console.log("lindex 2 is working");
var selectedFile;
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
// var db = firebase.database().ref().child("uploads/posts");

$("#fileButton").on("change", function (event) {
    console.log("file has been captured")
    $("#uploadButton").show();
    selectedFile = event.target.files[0];
});

function uploadFile() {
    //create root reference
    var fileName = selectedFile.name;
    var storageRef = firebase.storage().ref('/pics' + fileName);
    var uploadTask = storageRef.put(selectedFile);

    uploadTask.on('state_changed',
        function (snapshot) {

        },
        function (error) {

        },
        function () {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                console.log('File available at', url);
            });
        });
};