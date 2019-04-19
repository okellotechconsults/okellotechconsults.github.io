console.log("working index.js")
// var blob = null;
// var xhr = new XMLHttpRequest(); 
// xhr.open("GET", "https://firebasestorage.googleapis.com/v0/b/project-f7a5d.appspot.com/o/pics%2FSample%20report.docx.sp?alt=media&token=2fcfcedf-6439-4f72-8b65-82f62338ee06"); 
// xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
// xhr.onload = function() 
// {
//     blob = xhr.response;//xhr.response is now a blob object
//     console.log(blob);
// }
// xhr.send();

function getFilename(url){
  // returns an object with {filename, ext} from url (from: https://coursesweb.net/ )

  // get the part after last /, then replace any query and hash part
  url = url.split('/').pop().replace(/\#(.*?)$/, '').replace(/\?(.*?)$/, '');
  url = url.split('.');  // separates filename and extension
  return {filename: (url[0] || ''), ext: (url[1] || '')}
}

// EXTRACT FILE NAME AND DETAILS FROM A LINK
var url = 'https://firebasestorage.googleapis.com/v0/b/project-f7a5d.appspot.com/o/pics%2FSample%20report.docx.sp?alt=media&token=2fcfcedf-6439-4f72-8b65-82f62338ee06';
var ob_fm = getFilename(url);  // object with:  ob_fm.filename and ob_fm.ext
console.log(ob_fm.ext)
console.log(ob_fm.filename)
var fName = ob_fm.filename;
var fExt = ob_fm.ext;

// // DOWNLOAD WITH SPECIFIC NAMES requires the filesaver.min.js
fetch(url)
  .then(function(res) {
    return res.blob()
  })
  .then(function(blob) {
    saveAs(blob, fName + "." + fExt)
  })
