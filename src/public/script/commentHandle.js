async function submit_form(e) {
    let textComment = document.querySelector('.text_comment');
    if ((window.event ? event.keyCode : e.which) == 13) {
        let comment = (e.target.value);
        let postId = (e.target.parentNode.parentNode.parentNode.parentNode.parentNode).dataset.id;
        let req = await fetch('/figure-wiki/comment', {
            method: "POST",
            body: JSON.stringify({ postId, comment, userId }),
            headers: { 'Content-Type': 'application/json' }
        })
        let res = await req.json();
        if (res.comment) {
            e.target.parentNode.parentNode.parentNode.parentNode.childNodes[3].appendChild(handleComment(res.comment));
            textComment.value = "";
        }
    }
}
function handleComment(data) {
    let listComment = document.querySelector('.list_comments');
    let comment = document.createElement('div');
    comment.classList.add('about_user');
    let html = `
    <div class="option_img comment_img">
        <a href="">
            <img src="${data.user.image.img_url}" alt="">
        </a>
    </div>
    <div class="user_cmts cmts">
        <div class="user_name">
            ${data.user.username}
        </div>
        <div class="cmt">
            <p>${data.title}
            </p>
        </div>
    </div>
    `
    comment.innerHTML = html;
    return comment;
}