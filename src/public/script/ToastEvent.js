const main = document.querySelector('#toast');
function toastHandle(title = 'Thông Báo',icon = 'success',message='Đăng ký thành công'){
    const toast = document.createElement('div');
    setTimeout(function(){
        main.removeChild(toast)
    },4000)
    toast.classList.add('toast',icon);
    toast.innerHTML = 
`<div class="toast_body">
    <div class="toast-title">
        ${title}
    </div>
    <div class="toast-msg">
        ${message}
    </div>
</div>`
main.appendChild(toast);
}