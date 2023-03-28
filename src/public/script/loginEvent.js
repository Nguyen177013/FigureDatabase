let img = document.querySelector('.header_login');
let user_detail = document.querySelector('.user_detail');
let active = false;
img.addEventListener('click',function(e){
    if(!active){
        user_detail.classList.add('show_user');
        active = true;
    }
        else{
            user_detail.classList.remove('show_user');
            active = false;
        }
})