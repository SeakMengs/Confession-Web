const postData = []

window.onload = async function() {
    await generatePost()
    console.log(postData)
}

function fetchData() {
    return fetch('https://yatoconfessionapi77.netlify.app/.netlify/functions/api/all').then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })
}

function generatePost() {
    fetchData().then(function(result) {
        for (let i = 0; i < result.length; i++) {
            postData.push(result[i]);
        }
    })
}

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
    document.getElementById(`content#${impId}`).style.height = '20px'
}