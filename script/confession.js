

var postData = []
const profile = [
    "./asset/profile-black.png",
    "./asset/profile-white.png",
    "./asset/profile-orange.png",
    "./asset/profile-pink.png",
    "./asset/profile-red.png",
    "./asset/profile-green.png"
]

window.onload = async function () {
    generateProfile()
    await generateData()
}

function fetchData() {
    return fetch('https://yatoconfessionapi77.netlify.app/.netlify/functions/api/post/all').then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })
}

function generateData() {
    postData = []
    fetchData().then(function (result) {
        for (let i = result.length - 1; i >= 0; i--) {
            postData.push(result[i]);
        }
    }).then(() => {
        // ? after pushing data to our array we start generate the post
        console.log(postData)
        // generateProfile()
        genertatePost()
    })
}

function genertatePost() {
    for (var i = 0; i < postData.length; i++) {
        let randomNumber = randomNum(0, 5)
        if (postData[i].image == "") {
            document.querySelector('.post-container').innerHTML += `
            <div class="post-box">
                <div class="profile">
                    <img src="${profile[randomNumber]}" alt="profile">
                    <span class="imposter">Impostor</span>
                    <span class="imposter profile-id">#${postData[i].impostorId}</span>
                    <span class="imposter dot">•</span>
                    <span class="imposter post-time">${postData[i].date}</span>
                </div>
                <div class="post-content" id="imp#${postData[i].impostorId}">
                    <div class="div-post-text">
                        <span class="post-text">${postData[i].text}</span>
                    </div>
                    <div class="reaction">
                        <div class="sus reaction-align">
                            <img src="./asset/sus.png" alt="reaction">
                            <span class="sus-reaction">${postData[i].upvote}</span>
                        </div>
                        <div class="downvote reaction-align">
                            <img src="./asset/voted.png" alt="reaction">
                            <span class="vote-reaction">${postData[i].downvote}</span>
                        </div>
                        <div class="comment reaction-align">
                            <span class="comment-btn">Comment</span>
                        </div>
                        <div class="report reaction-align">
                            <img src="./asset/report.png" alt="reaction">
                            <span class="report-reaction">${postData[i].share}</span>
                        </div>
                    </div>
                    <div class="comment-area">
                        <form class="comment-form">
                            <textarea oninput=auto_grow(this) class="comment-text"
                                placeholder="Write a public comment..." id="content#${postData[i].impostorId}"></textarea>
                        </form>
                        <img onclick=sendCmt(id) id="send#${postData[i].impostorId}" class="send" src="./asset/send.png" alt="send">
                    </div>
                    <div class="commented" id="cmt#${postData[i].impostorId}">
                    </div>
                </div>
            </div>
        `
        } else if (postData[i].image != "") {
            document.querySelector('.post-container').innerHTML += `
            <div class="post-box">
                <div class="profile">
                    <img src="${profile[randomNumber]}" alt="profile">
                    <span class="imposter">Impostor</span>
                    <span class="imposter profile-id">#${postData[i].impostorId}</span>
                    <span class="imposter dot">•</span>
                    <span class="imposter post-time">${postData[i].date}</span>
                </div>
                <div class="post-content" id="imp#${postData[i].impostorId}">
                    <div class="div-post-text">
                        <span class="post-text">${postData[i].text}</span>
                    </div>
                    <img class="post-image" src="${postData[i].image}" alt="image">
                    <div class="reaction">
                        <div class="sus reaction-align">
                            <img src="./asset/sus.png" alt="reaction">
                            <span class="sus-reaction">${postData[i].upvote}</span>
                        </div>
                        <div class="downvote reaction-align">
                            <img src="./asset/voted.png" alt="reaction">
                            <span class="vote-reaction">${postData[i].downvote}</span>
                        </div>
                        <div class="comment reaction-align">
                            <span class="comment-btn">Comment</span>
                        </div>
                        <div class="report reaction-align">
                            <img src="./asset/report.png" alt="reaction">
                            <span class="report-reaction">${postData[i].share}</span>
                        </div>
                    </div>
                    <div class="comment-area">
                        <form class="comment-form">
                            <textarea oninput=auto_grow(this) class="comment-text"
                                placeholder="Write a public comment..." id="content#${postData[i].impostorId}"></textarea>
                        </form>
                        <img onclick=sendCmt(id) id="send#${postData[i].impostorId}" class="send" src="./asset/send.png" alt="send">
                    </div>
                    <div class="commented" id="cmt#${postData[i].impostorId}">
                    </div>
                </div>
            </div>
        `
        }
    }
}

function generateProfile() {
    document.querySelector('.hub-logo').src = profile[randomNum(0, 5)]
    document.querySelector('.prof-logo').src = profile[randomNum(0, 5)]
}

//*Credit https://stackoverflow.com/questions/17772260/textarea-auto-height
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}


function sendCmt(event) {
    var ranNum = randomNum(0, 5)
    var impId = event.replace('send#', '');
    // console.log(impId)
    var cmtText = document.getElementById(`content#${impId}`).value
    if (cmtText != "") {
        document.getElementById(`cmt#${impId}`).innerHTML += `
        <div class="cmt-text" id="cmted#3">
        <img src="${profile[ranNum]}" alt="profile">
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

async function postContent(data) {
    // try {
    //     fetch('https://yatoconfessionapi77.netlify.app/.netlify/functions/api/post', {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         }
    //     }).then(function (res) {
    //         // console.log(res)
    //         return res.json()
    //     }).then(() => {
    //         console.log("API has been posted")
    //     })
    // } catch (err) {
    //     console.log(err)
    // }
    try {
        await axios.post('https://yatoconfessionapi77.netlify.app/.netlify/functions/api/post', data).then((res) => {
            console.log("API has been posted")
            return res
        })
    } catch(err) {
        console.log(err)
    }
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function confess() {
    var currentPostID
    var contentData = []
    var confessionContent = document.getElementById('confess-box').value
    var imgLink = ''
    var upvotes = '0'
    var downvotes = '0'
    var shares = '0'
    var pins = '0000'
    if (confessionContent != "") {
        await fetchData().then(function (allData) {
            currentPostID = parseInt(allData.length + 1)
            contentData = {
                text: confessionContent,
                image: '',
                upvote: upvotes,
                downvote: downvotes,
                share: shares,
                pin: pins,
                impostorId: currentPostID
            }
        })
        // ? wait for content to store in database before render to the client postContent(contentData)
        //* https://laracasts.com/discuss/channels/javascript/how-to-properly-use-async-await-with-axios-post-request
        const apiPost = await postContent(contentData)
            document.getElementById('confess-box').value = ''
            document.querySelector('.post-container').innerHTML = ''
            generateData()
    }
}