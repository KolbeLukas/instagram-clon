let posts = [
    {
        'user-logo': 'img/user-logo/hulk-logo.png',
        'user': 'hulk',
        'post-img': 'img/post/minion-hulk.jpg',
        'likes': 512,
        'description': 'So sehe ich also als minion aus. Wütend, nur mit Brille.',
        'comment-author': ['ironman', 'thanos', 'cp. america'],
        'comment-user-logo': ['img/user-logo/ironman-logo.png', 'img/user-logo/thanos-logo.png', 'img/user-logo/cpamerica-logo.png'],
        'comments': ['Cool', 'Wie süß', 'wo gibts den zu kaufen?'],
        'time': 'VOR 20 STUNDEN'
    },
    {
        'user-logo': 'img/user-logo/cpamerica-logo.png',
        'user': 'cp. america',
        'post-img': 'img/post/cpamerica-team.jpg',
        'likes': 324,
        'description': 'Unterwegs mit den Jungs!',
        'comment-author': ['ironman', 'batman', 'hulk'],
        'comment-user-logo': ['img/user-logo/ironman-logo.png', 'img/user-logo/batman-logo.png', 'img/user-logo/hulk-logo.png'],
        'comments': ['Cool', 'wo war ich da?', 'was ein team!!'],
        'time': 'GESTERN'
    },
    {
        'user-logo': 'img/user-logo/ironman-logo.png',
        'user': 'ironman',
        'post-img': 'img/post/ironman-collection.jpg',
        'likes': 204,
        'description': 'Endlich! Endlich ist die Sammlung komplett. Ich habe jeden einzelnen "mark" gefunden.',
        'comment-author': ['hulk', 'batman', 'cp. america'],
        'comment-user-logo': ['img/user-logo/hulk-logo.png', 'img/user-logo/batman-logo.png', 'img/user-logo/cpamerica-logo.png'],
        'comments': ['Cool', 'Was kommt als nächstes', 'hat aber auch lange genug gedauert'],
        'time': 'GESTERN'
    },
    {
        'user-logo': 'img/user-logo/thanos-logo.png',
        'user': 'thanos',
        'post-img': 'img/post/thanos-home.jpg',
        'likes': 395,
        'description': 'Ahhh, endlich zu Hause.',
        'comment-author': ['ironman', 'hulk', 'cp. america'],
        'comment-user-logo': ['img/user-logo/ironman-logo.png', 'img/user-logo/hulk-logo.png', 'img/user-logo/cpamerica-logo.png'],
        'comments': ['Buuuuhhhh', 'was hast du getan', 'wir finden dich schon'],
        'time': 'GESTERN'
    },
    {
        'user-logo': 'img/user-logo/batman-logo.png',
        'user': 'batman',
        'post-img': 'img/post/batman-sign.jpg',
        'likes': 143,
        'description': 'OK muss los die Pflicht ruft mal wieder!',
        'comment-author': ['joker', 'harley quinn'],
        'comment-user-logo': ['img/user-logo/joker-logo.png', 'img/user-logo/harley-quinn-logo.png'],
        'comments': ['OHH NEIN!', 'nehmt euch in acht'],
        'time': 'GESTERN'
    },
];

let login = [
    {
        'avatar': [],
        'name': []
    }
];


function renderPosts() {
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        document.getElementById('posts-section').innerHTML += renderOnePostBox(post, i);
        renderLastCommentInPostbox(i);
    }
}


function renderLastCommentInPostbox(i) {
    let content = document.getElementById('last-comment' + i);
    let comment = posts[i]['comments'].length;
    let author = posts[i]['comment-author'].length;

    content.innerHTML = '';
    content.innerHTML = lastComment(i, comment, author);
}


function saveNewComment(i) {
    let comment = document.getElementById('comment' + i);
    let commenttext = document.getElementById('comment-text');
    let author = login[0]['name'][0];
    let img = login[0]['avatar'][0];

    posts[i]['comments'].push(comment.value);
    posts[i]['comment-author'].push(author);
    posts[i]['comment-user-logo'].push(img);
    comment.value = '';
    commenttext.removeAttribute('data-replicated-value');
    enablePostButton(i);
    renderLastCommentInPostbox(i);
}


function enablePostButton(i) {
    let comment = document.getElementById('comment' + i);
    let postButton = document.getElementById('post-button' + i);

    if (comment.value > '') {
        postButton.disabled = false;
        postButton.classList.remove('disabled');
    } else {
        postButton.disabled = true;
        postButton.classList.add('disabled');
    }
}


function openCommentOverlay(i) {
    document.getElementById('comment-overlay').classList.remove('d-none');
    document.getElementById('body').classList.add('no-scroll');
    document.getElementById('comment-overlay').innerHTML = renderCommentOverlay(i);
    renderAllComments(i);
    if (login[0]['name'] == 0) {
        document.getElementById('overlay-comment' + i).disabled = true;
    }
}


function closeCommentOverlay() {
    document.getElementById('comment-overlay').classList.add('d-none');
    document.getElementById('body').classList.remove('no-scroll');
}


function overlaySaveNewComment(i) {
    let comment = document.getElementById('overlay-comment' + i);
    let commenttext = document.getElementById('overlay-comment-text');
    let author = login[0]['name'][0];
    let img = login[0]['avatar'][0];

    posts[i]['comments'].push(comment.value);
    posts[i]['comment-author'].push(author);
    posts[i]['comment-user-logo'].push(img);
    comment.value = '';
    commenttext.removeAttribute('data-replicated-value');
    enableOverlayPostButton(i);
    renderAllComments(i);
    renderLastCommentInPostbox(i);
}


function enableOverlayPostButton(i) {
    let comment = document.getElementById('overlay-comment' + i);
    let postButton = document.getElementById('overlay-post-button' + i);

    if (comment.value > '') {
        postButton.disabled = false;
        postButton.classList.remove('disabled');
    } else {
        postButton.disabled = true;
        postButton.classList.add('disabled');
    }
}


function renderAllComments(i) {
    document.getElementById('overlay-comments' + i).innerHTML = ``;
    for (let j = 0; j < posts[i]['comments'].length; j++) {
        document.getElementById('overlay-comments' + i).innerHTML += allComments(i, j);
    }
}


function loginAsGuest() {
    document.getElementById('login-overlay').classList.add('d-none');
    document.getElementById('body').classList.remove('no-scroll');
    for (let i = 0; i < posts.length; i++) {
        document.getElementById('comment' + i).disabled = true;
        document.getElementById('like-button' + i).disabled = true;
    }
}


function selectAvatar(i) {
    login[0]['avatar'] = [];
    const select = document.getElementsByClassName('login-user-logo');
    for (let j = 0; j < select.length; j++) {
        select[j].classList.remove('selected');
    }
    login[0]['avatar'].push('img/user-logo/login' + i + '.png');
    document.getElementById('login-user-logo' + i).classList.add('selected');
}


function loginWithAvatarAndName() {
    let name = document.getElementById('login-name');
    let avatar = login[0]['avatar'];

    if (name.value.length > 1 && avatar.length > 0) {
        login[0]['name'].push(name.value);
        document.getElementById('login-overlay').classList.add('d-none');
        document.getElementById('login-button').classList.add('d-none');
        document.getElementById('body').classList.remove('no-scroll');
        document.getElementById('logged-in-icon').innerHTML = loggedInButton(avatar);
        takeOverAvatarAndName();
    } else {
        if (name.value.length < 1) {
            name.classList.add('warning');
            setTimeout(showAlert, 1500);
        }
        if (avatar.length == 0) {
            document.getElementById('login-avatar').classList.add('warning');
            setTimeout(showAlert, 1500)
        }
    }
}


function takeOverAvatarAndName() {
    let avatar = login[0]['avatar'];
    let name = login[0]['name'];

    if (avatar.length > 0 && name.length > 0) {
        document.getElementById('login-icon-with-name').innerHTML = /*html*/`
            <img src="${avatar[0]}">`;
        document.getElementById('follow-section-name').innerHTML = /*html*/`
            <span><b>${name[0]}</b></span>`;
    }
}


function filterPostsByUser() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();

    let content = document.getElementById('posts-section');
    content.innerHTML = ``;

    for (let i = 0; i < posts.length; i++) {
        let name = posts[i]['user'];
        let post = posts[i];

        if (name.toLowerCase().includes(search)) {
            content.innerHTML += renderOnePostBox(post, i);
        }
    }
}


function showAlert() {
    document.getElementById('login-name').classList.remove('warning');
    document.getElementById('login-avatar').classList.remove('warning');
}


function openLoginOverlay() {
    document.getElementById('login-overlay').classList.remove('d-none');
    document.getElementById('body').classList.add('no-scroll');
    for (let i = 0; i < posts.length; i++) {
        document.getElementById('comment' + i).disabled = false;
        document.getElementById('like-button' + i).disabled = false;
    }
}


function setFavorite(j) {
    document.getElementById('favorite-icon-red' + j).classList.remove('d-none');
    document.getElementById('favorite-icon' + j).classList.add('d-none');
    posts[j]['likes']++;
    document.getElementById('likes' + j).innerHTML = posts[j]['likes'];
}


function removeFavorite(j) {
    document.getElementById('favorite-icon-red' + j).classList.add('d-none');
    document.getElementById('favorite-icon' + j).classList.remove('d-none');
    posts[j]['likes']--;
    document.getElementById('likes' + j).innerHTML = posts[j]['likes'];
}


function scrollToTop() {
    window.scrollTo(0, 0)
}


/* HTML-RENDERING */

function renderOnePostBox(post, i) {
    return /*html*/ `
        <div class="posts-box">
            <div class="posts-header">
                <div class="posts-user">
                    <img class="posts-user-img" src="${post['user-logo']}">
                    <span><b>${post['user']}</b></span>
                </div>
                <div>
                    <img onclick="underConstruction()" class="posts-nav" src="img/icon/dots-icon.png">
                </div>
            </div>
            <img class="posts-img" src="${post['post-img']}">
            <div class="posts-icon-section">
                <div class="posts-icon-left">
                    <div class="grid">
                        <button id="like-button${i}" onclick="setFavorite(${i})" class="posts-like-button">
                            <img id="favorite-icon${i}" class="hover-effect on-each-other" src="img/icon/favorite-icon.png">
                        </button>
                        <button onclick="removeFavorite(${i})" class="posts-like-button">
                            <img id="favorite-icon-red${i}" class="d-none on-each-other"
                                src="img/icon/favorite-icon-red.png">
                        </button>
                    </div>
                    <img onclick="openCommentOverlay(${i})" class="hover-effect" src="img/icon/comments-icon.png">
                    <img onclick="underConstruction()" class="hover-effect" src="img/icon/dm-icon.png">
                </div>
                <img onclick="underConstruction()" class="hover-effect" src="img/icon/notice-icon.png">
            </div>
            <div class="posts-text-section">
                <div class="posts-text-likes">
                    <span>Gefällt <span id="likes${i}">${post['likes']}</span> Mal</span>
                </div>
                <div class="posts-text-description">
                    <span><b>${post['user']}</b> ${post['description']}</span>
                </div>
                <button onclick="openCommentOverlay(${i})" class="post-show-comments">Alle Kommentare ansehen</button>
                <div class="last-comment" id="last-comment${i}">
                </div>
                <div class="posts-time">
                    <span>${post['time']}</span>
                </div>
            </div>
            <div class="posts-comment-section">
                <div class="posts-comment-write">
                    <div>
                        <img onclick="underConstruction()" class="posts-comment-emoji" src="img/icon/emoji-icon.png">
                    </div>
                    <div id="comment-text" class="posts-comment-textarea-box">
                        <textarea id="comment${i}" rows="1"
                            oninput="this.parentNode.dataset.replicatedValue = this.value; enablePostButton(${i})"
                            class="posts-comment-textarea" placeholder="Kommentieren ..."></textarea>
                    </div>
                </div>
                <button id="post-button${i}" onclick="saveNewComment(${i})" disabled
                    class="posts-comment-send disabled">Posten</button>
            </div>
        </div>`;
}


function loggedInButton(avatar) {
    return /*html*/ `
        <img onclick="underConstruction()" src="${avatar}">`;
}


function lastComment(i, comment, author) {
    return /*html*/ `
        <span class="comment-author">${posts[i]['comment-author'][author - 1]}</span>
        <span class="comment-text">${posts[i]['comments'][comment - 1]}</span>`;
}


function renderCommentOverlay(i) {
    return /*html*/ `
        <img onclick="closeCommentOverlay()" src="img/icon/cross.png" class="close-comment-overlay">
        <div class="comment-overlay-box">
            <div class="comment-overlay-img">
                <img src="${posts[i]['post-img']}">
            </div>
            <div>
                <div class="posts-header">
                    <div class="posts-user">
                        <img class="posts-user-img" src="${posts[i]['user-logo']}">
                        <span><b>${posts[i]['user']}</b></span>
                    </div>
                </div>
                <div class="posts-text-section">
                    <div class="posts-text-description">
                        <span><b>${posts[i]['user']}</b> ${posts[i]['description']}</span>
                    </div>
                    <div class="overlay-comments" id="overlay-comments${i}">
                    </div>
                </div>
                <div class="posts-comment-section">
                    <div class="posts-comment-write">
                        <div>
                            <img onclick="underConstruction()" class="posts-comment-emoji" src="img/icon/emoji-icon.png">
                        </div>
                        <div id="overlay-comment-text" class="posts-comment-textarea-box">
                            <textarea id="overlay-comment${i}" rows="1"
                                oninput="this.parentNode.dataset.replicatedValue = this.value; enableOverlayPostButton(${i})"
                                class="posts-comment-textarea" placeholder="Kommentieren ..."></textarea>
                        </div>
                    </div>
                    <button id="overlay-post-button${i}" onclick="overlaySaveNewComment(${i})" disabled
                        class="posts-comment-send disabled">Posten</button>
                </div>
            </div>
        </div>`;
}


function allComments(i, j) {
    return /*html*/`
        <div class="one-comment">
            <img class="posts-user-img" src="${posts[i]['comment-user-logo'][j]}">
            <span class="comment-author">${posts[i]['comment-author'][j]}</span>
            <span class="comment-text">${posts[i]['comments'][j]}</span>
        </div>`;
}


function underConstruction() {
    alert('Wir arbeiten an weiterne Funktionen!');
}