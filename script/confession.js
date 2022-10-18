//*Credit https://stackoverflow.com/questions/17772260/textarea-auto-height
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

function sendCmt(event) {
    var impId = event.replace('send#', '');
    console.log(impId)
    var cmtText = document.getElementById(`content#${impId}`).value
    if (cmtText != "") {
        document.getElementById(`cmt#${impId}`).innerHTML += `
        <div class="cmt-text" id="cmted#3">
        <img src="./asset/profile-pink.png" alt="profile">
        <span> ${cmtText}
        </span>
        </div>
        `
    } else {
        console.log('Comment has no content! Send denied')
    }
    document.getElementById(`content#${impId}`).value = ''
}