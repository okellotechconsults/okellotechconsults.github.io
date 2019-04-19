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
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log("u are signed in");
        $("#dashboard").show();
        $("#uMail").text(email);
        $("#uName").text(displayName)
        var db = firebase.database().ref().child("uploads/posts");
        var fileUploader = document.getElementById("fileButton");
        $("#submit").click(function () {
            var siteUrl = $("#siteUrl").val();
            var db = firebase.database().ref().child("uploads/posts");
            var category = $("#pri-cats").val();
            var title = $("#title").val();
            var author = displayName;
            var description = $("#description").val();
            var data = {
                title: title,
                author: author,
                url: "",
                siteUrl: siteUrl,
                category: category,
                description: description,
                userId: uid
            }
            db.push().set(data).then(function () {
                $("#siteUrl").val("");
                $("#title").val("");
                $("#description").val("");
                alert("URL Successfully uploaded");
            });

        });
        fileUploader.addEventListener('change', function (e) {
            $("#submit").hide();
            $("#submitFile").show();
            $("#submitFile").click(function () {
                console.log("clicked submit")
                //GET ELEMENTS
                var uploader = $("#uploader");
                console.log("file has been captured")
                //GET FILE
                var file = e.target.files[0];
                console.log("file captured");
                fileName = file.name;
                console.log("new file name is ", fileName);
                //CREATE A STORAGE REFERENCE
                var storageRef = firebase.storage().ref('uploads/' + fileName);
                //UPLOAD FILE
                var task = storageRef.put(file);
                //UPDATE THE PROGRESS BAR
                task.on('state_changed',
                    function progress(snapshot) {
                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        uploader.css("width", percentage + "%");
                    },
                    function error(err) {

                    },
                    function complete() {
                        task.snapshot.ref.getDownloadURL().then(function (url) {
                            console.log(url);
                            //initialising the database
                            var siteUrl = $("#siteUrl").val();
                            var db = firebase.database().ref().child("uploads/posts");
                            var category = $("#pri-cats").val();
                            var title = $("#title").val();
                            var author = displayName;
                            var description = $("#description").val();
                            var data = {
                                title: title,
                                author: author,
                                url: url,
                                siteUrl: siteUrl,
                                category: category,
                                description: description,
                                userId: uid
                            }
                            db.push().set(data);
                            $("#siteUrlDiv").append(`
                            <p>you uploaded to ${url}</p>
                            `)
                            $("#siteUrl").val("");
                            $("#title").val("");
                            $("#description").val("");
                            alert("File Successfully uploaded");
                        })
                    }
                )
            });

        }
        );
        $("#sidebarAuth").click(function () {
            console.log("attempt to sign out");
            firebase.auth().signOut().then(function () {
                // Sign-out successful.
                console, log("you have successfully signed out");
            }).catch(function (error) {
                // An error happened.
            });
        }
        );
        $("#sidebarAuth").text("Sign Out");
        $("#authOff").hide();

        // ...
    } else {
        // User is signed out.
        console.log("signed out");
        $("#sidebarAuth").text("Sign In");
        $("#sidebarAuth").attr("href", "auth.html");
        $("#dashboard").hide();
        $("#wrapper").append(`
        <div id="authOff" style="margin-top: 3%;" class="page-content-wrapper container">
            <div class="alert alert-warning">u need to <a target="_blank" href="auth.html">sign in</a></div>
        </div>    
        `)

        // ...
    }
});


//VALIDATION
setInterval(function () {
    var siteUrl = $("#siteUrl").val();
    var http = siteUrl.indexOf("http");
    var file = $("#fileButton").val();
    var title = $("#title").val();
    var description = $("#description").val();
    if (title.length < 5 || description.length < 15 || (file == "" && siteUrl == "")) {
        // console.log("title is null");
        $("#submit").attr("disabled", "");
        $("#submitFile").attr("disabled", "");
        $("#valid").fadeIn();
        $("#valid").text("Title has to be at least 5 characters, Description at least 15 and a file or website address has to be chosen");
    } else if (siteUrl != "" && http === -1) {
        $("#valid").fadeIn();
        $("#valid").text("invalid url");
    } else {
        // $("#valid").fadeOut();
        // $("#submit").removeAttr("disabled");
        $("#valid").fadeOut();
        $("#submit").removeAttr("disabled");
        $("#submitFile").removeAttr("disabled");
        // console.log("title is true");
    }
}, 200)

var fileUploader = document.getElementById("fileButton");
fileUploader.addEventListener('change', function (e) {
    var file = e.target.files[0];
    console.log("file captured");
    fileName = file.name;
    // console.log(file)
    console.log("new file name is ", fileName);
    $(".custom-file-label").text(fileName);
});

// setInterval(function(){
//     var file = $("#fileButton").val();
//     console.log(file.name)
// }, 2000)