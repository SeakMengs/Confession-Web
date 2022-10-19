var postData = []
const profile = [
    "./asset/profile-black.png",
    "./asset/profile-white.png",
    "./asset/profile-orange.png",
    "./asset/profile-pink.png",
    "./asset/profile-red.png",
    "./asset/profile-green.png"
]

var formatter = Intl.NumberFormat('en', { notation: 'compact'})

// ? when window on load we generate posts and comments
window.onload = async function () {
    generateProfile()
    await generateData()
    generateComment()
}

function fetchData() {
    return fetch('https://yatoconfessionapi77.netlify.app/.netlify/functions/api/post/all').then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })
}

async function generateData() {
    postData = []
    await fetchData().then(function (result) {
        for (let i = result.length - 1; i >= 0; i--) {
            postData.push(result[i]);
        }
    }).then(() => {
        // ? after pushing data to our array we start generate the post
        console.log(postData)
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
                            <img onclick=upvote(id) id="up#${postData[i].impostorId}" src="./asset/sus.png" alt="reaction">
                            <span class="sus-reaction" id="upvote#${postData[i].impostorId}">${formatter.format(postData[i].upvote)}</span>
                        </div>
                        <div class="downvote reaction-align">
                            <img onclick=downvote(id) id="down#${postData[i].impostorId}" src="./asset/voted.png" alt="reaction">
                            <span class="vote-reaction" id="downvote#${postData[i].impostorId}">${formatter.format(postData[i].downvote)}</span>
                        </div>
                        <div class="comment reaction-align">
                            <span class="comment-btn" id="comment#${postData[i].impostorId}">0 Comment</span>
                        </div>
                        <div class="report reaction-align">
                            <img onclick=reportvote(id) id="report#${postData[i].impostorId}" src="./asset/report.png" alt="reaction">
                            <span class="report-reaction" id="share#${postData[i].impostorId}">${formatter.format(postData[i].share)}</span>
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
                            <img onclick=upvote(id) id="up#${postData[i].impostorId}" src="./asset/sus.png" alt="reaction">
                            <span class="sus-reaction" id="upvote#${postData[i].impostorId}">${formatter.format(postData[i].upvote)}</span>
                        </div>
                        <div class="downvote reaction-align">
                            <img onclick=downvote(id) id="down#${postData[i].impostorId}" src="./asset/voted.png" alt="reaction">
                            <span class="vote-reaction" id="downvote#${postData[i].impostorId}">${formatter.format(postData[i].downvote)}</span>
                        </div>
                        <div class="comment reaction-align">
                            <span class="comment-btn" id="comment#${postData[i].impostorId}">0 Comment</span>
                        </div>
                        <div class="report reaction-align">
                            <img onclick=reportvote(id) id="report#${postData[i].impostorId}" src="./asset/report.png" alt="reaction">
                            <span class="report-reaction" id="share#${postData[i].impostorId}">${formatter.format(postData[i].share)}</span>
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

function generateComment() {
    for (var i = postData.length - 1; i >= 0; i--) {
        // console.log(postData[i].comment)

        //* https://stackoverflow.com/questions/24403732/how-to-check-if-array-is-empty-or-does-not-exist

        if (postData[i].comment?.length) {
            // ? check size of comment then proceed to render comment
            // console.log(postData[i].comment)
            for (var j = 0; j < postData[i].comment.length; j++) {
                var tempText = JSON.stringify(postData[i].comment[j].comments)
                // ? remove first and last character
                tempText = tempText.substring(1, tempText.length - 1)

                document.getElementById(`cmt#${postData[i].impostorId}`).innerHTML += `
                <div class="cmt-text" id="cmted#${j + 1}">
                <img src="${profile[randomNum(0, 5)]}" alt="profile">
                <span> ${tempText}
                </span>
                </div>
                `

                tempText = ''
            }
            if (postData[i].comment.length == 0 || postData[i].comment.length == 1) {
                document.getElementById(`comment#${postData[i].impostorId}`).innerHTML = formatter.format(postData[i].comment.length) + " comment"
            } else if (postData[i].comment.length > 1) {
                document.getElementById(`comment#${postData[i].impostorId}`).innerHTML = formatter.format(postData[i].comment.length) + " comments"
            }
        }
    }
    console.log("Done")
}

//*Credit https://stackoverflow.com/questions/17772260/textarea-auto-height
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}


async function sendCmt(event) {
    var commentArr = [{}]
    var textArr = {}
    var cmtId = ''
    var ranNum = randomNum(0, 5)
    var impId = event.replace('send#', '')
    var totalCmt = ''
    // console.log(impId)
    var cmtText = document.getElementById(`content#${impId}`).value
    if (cmtText != "") {
        // var commentArr = [{}]
        await fetchData().then(function (allData) {

            // ? get array of comment and then we put object into temp array then push to array of comment and start patching on database
            commentArr = allData[impId - 1].comment
            // console.log(commentArr)
            textArr = { comments: cmtText }
            commentArr.push(textArr)
            cmtId = commentArr.length
            console.log(commentArr)
        })

        try {
            await axios.patch(`https://yatoconfessionapi77.netlify.app/.netlify/functions/api/post/by_id/${impId}`, {
                comment: commentArr
            }).then((res) => {
                console.log("Comment has been posted")
                // console.log(res)
                return res
            })
        } catch (err) {
            console.log(err)
        }

        document.getElementById(`cmt#${impId}`).innerHTML += `
        <div class="cmt-text" id="cmted#${cmtId}">
        <img src="${profile[ranNum]}" alt="profile">
        <span> ${cmtText}
        </span>
        </div>
        `
    } else {
        console.log('Comment has no content! Send denied')
    }

    // ? after post to api we change text area to blank and change comment plural

    document.getElementById(`content#${impId}`).value = ''
    document.getElementById(`content#${impId}`).style.height = '20px'

    totalCmt = document.getElementById(`comment#${impId}`).innerText
    totalCmt = totalCmt.replace(' comments', '')
    totalCmt = parseInt(totalCmt)
    totalCmt += 1
    // console.log(totalCmt)

    if (totalCmt <= 1) {
        document.getElementById(`comment#${impId}`).innerHTML = formatter.format(totalCmt) + " comment"
    } else if (totalCmt > 1) {
        document.getElementById(`comment#${impId}`).innerHTML = formatter.format(totalCmt) + " comments"
    }
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
    } catch (err) {
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

async function upvote(impID) {
    impID = impID.replace('up#', '')
    await fetchData().then(function (allData) {
        try {
            if (allData[impID - 1].impostorId == impID) {
                axios.patch(`https://yatoconfessionapi77.netlify.app/.netlify/functions/api/post/by_id/${impID}`, {
                    upvote: allData[impID - 1].upvote + 1
                }).then((res) => {
                    console.log("Upvoted")
                    // console.log(res)
                    return res
                })
                document.getElementById(`upvote#${impID}`).innerHTML = formatter.format(allData[impID - 1].upvote + 1)
            }
        } catch (err) {
            console.log(err)
        }
    })
}

async function downvote(impID) {
    impID = impID.replace('down#', '')
    await fetchData().then(function (allData) {
        try {
            if (allData[impID - 1].impostorId == impID) {
                axios.patch(`https://yatoconfessionapi77.netlify.app/.netlify/functions/api/post/by_id/${impID}`, {
                    downvote: allData[impID - 1].downvote - 1
                }).then((res) => {
                    console.log("Downvoted")
                    // console.log(res)
                    return res
                })
                document.getElementById(`downvote#${impID}`).innerHTML = formatter.format(allData[impID - 1].downvote - 1)
            }
        } catch (err) {
            console.log(err)
        }
    })
}

async function reportvote(impID) {
    impID = impID.replace('report#', '')
    await fetchData().then(function (allData) {
        try {
            if (allData[impID - 1].impostorId == impID) {
                axios.patch(`https://yatoconfessionapi77.netlify.app/.netlify/functions/api/post/by_id/${impID}`, {
                    share: allData[impID - 1].share + 1
                }).then((res) => {
                    console.log("Reported")
                    // console.log(res)
                    return res
                })
                document.getElementById(`share#${impID}`).innerHTML = formatter.format(allData[impID - 1].share + 1)
            }
        } catch (err) {
            console.log(err)
        }
    })
}