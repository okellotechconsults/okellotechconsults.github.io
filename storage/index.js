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

// // Get a reference to the storage service, which is used to create references in your storage bucket
// var storage = firebase.storage();

// // Create a storage reference from our storage service
// var storageRef = storage.ref();

//GET ELEMENTS
var uploader = document.getElementById("uploader");
var fileUploader = document.getElementById("fileButton");

//LISTEN FOR FILE SELECTION
fileUploader.addEventListener('change', function (e) {
    console.log("file has been captured")
    //GET FILE
    var file = e.target.files[0];

    //CREATE A STORAGE REFERENCE
    var storageRef = firebase.storage().ref('pics/' + file.name);

    //UPLOAD FILE
    var task = storageRef.put(file);

    //UPDATE THE PROGRESS BAR
    task.on('state_changed',

        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.style.width = percentage + "%";
        },

        function error(err) {

        },

        function complete() {
            var url = task.snapshot.downloadURL;
            console.log(url);

            // $("body").append(`
            //     <p>you uploaded to ${url}</p>
            // `)

        }

    );

});
