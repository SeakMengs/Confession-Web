//* source https://codepen.io/team/Cloudinary/pen/QgpyOK

const cloudName = 'yato-confession';
const unsignedUploadPreset = 'Yato-Confession';

var fileSelect = document.getElementById("fileSelect")
var fileElem = document.getElementById("fileElem")

fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
}, false);

// ************************ Drag and drop ***************** //
function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

dropbox = document.getElementById("post-write");
dropbox.addEventListener("dragenter", dragenter, true);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    handleFiles(files);
}

// *********** Upload file to Cloudinary ******************** //
function uploadFile(file) {
    var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // File uploaded successfully
            var response = JSON.parse(xhr.responseText);
            // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
            var url = response.secure_url;
            console.log(url)

            document.getElementById('img-content').src = url
            document.getElementById('img-content').style.display = "block"

            //* Implement another technique----------------------------------------------------------------------------------------------------------------------
            // var img = new Image(); // HTML5 Constructor
            // img.src = url;
            // img.alt = response.public_id;
            // img.className = "img-content";
            // img.id = "img-content"
            // checkImg = document.getElementById("post-img").classList.contains("img-content")
            // //   console.log(checkImg)
            // //* check if image has already uploaded? if already uploaded we will remove old image and preview the new upload image
            // if (checkImg == false) {
            //     document.getElementById('post-img').appendChild(img)
            // } else if (checkImg == true) {
            //     //* remove old image and add a new one
            //     document.querySelector('post-img').innerHTML = ''
            //     document.getElementById('post-img').appendChild(img)
            // }
            //*-------------------------------------------------------------------------------------------------------------------------------------------------------
        }
    };

    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    xhr.send(fd);
}

// *********** Handle selected files ******************** //
var handleFiles = function (files) {
    for (var i = 0; i < files.length; i++) {
        uploadFile(files[i]); // call the function to upload the file
    }
};