let table = document.querySelector('.table');
async function findPost() {
    let text = document.getElementById('findpost').value;
    let req = await fetch('/findPost', {
        method: 'POST',
        body: JSON.stringify({ name: text }),
        headers: { 'Content-Type': 'application/json' }
    })
    let res = await req.json();
    if (res.posts) {
        renderTable(res.posts);
    }
}
function renderTable(data) {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    for (let ele of data) {
        let tr = document.createElement('tr');
        let html = `
        <td>
        ${ele.user._id}
    </td>
    <td>
    ${ele.user.username}
    </td>
    <td>
       ${ele.title}
    </td>
    <td>
       <div class="image_display">
           <img src="${ele.images[0].url}" alt="">
       </div>
    </td>
    <td>
    <div class="post_option">
        <div class="option_btn" data-id="${ele._id}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 option">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>           
            </div>
    </div>  
</td>
        `
        tr.innerHTML = html;
        table.appendChild(tr);
    }
    let option_btns = document.querySelectorAll('.option_btn');
    option_btns.forEach(post=>{
        post.addEventListener('click',async function(e){
            let postId = post.dataset.id;
            let req = await fetch('/user/remove',{
                method:'POST',
                body: JSON.stringify({postId}),
                headers:{'Content-Type': 'application/json'}
            })
            let res = await req.json();
            if(res.success){
                window.location.reload();
            }
        })
    })
}
