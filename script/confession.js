const postData = []

window.onload = async function () {
    await generatePost()
    console.log(postData)
}

function fetchData() {
    return fetch('https://yatoconfessionapi77.netlify.app/.netlify/functions/api/post/all').then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })
}

function generatePost() {
    fetchData().then(function (result) {
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
    // console.log(impId)
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

function postAPI() {
    try {
        fetch('https://yatoconfessionapi77.netlify.app/.netlify/functions/api/post', {
            method: 'POST',
            body: JSON.stringify({
                text: "First post test",
                image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.tenor.com%2FkHcmsxlKHEAAAAAM%2Frock-one-eyebrow-raised-rock-staring.gif&imgrefurl=https%3A%2F%2Ftenor.com%2Fsearch%2Fthe-rock-gifs&tbnid=dcYgtmgVwwT_YM&vet=12ahUKEwiUh_SSzeL6AhUGEJQKHUhUB2MQMygAegUIARCOAg..i&docid=pq9JZXebrkI3EM&w=220&h=220&q=the%20rock%20gif&ved=2ahUKEwiUh_SSzeL6AhUGEJQKHUhUB2MQMygAegUIARCOAg",
                comment: "cool brobb",
                pin: "0000",
                impostorId: "11"
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(function (res) {
            // console.log(res)
            return res.json()
        }).then(() => {
            console.log("API has been posted")
        })
    } catch(err) {
        console.log(err)
    }
}