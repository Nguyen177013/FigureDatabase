window.addEventListener('scroll', reveal);
function reveal(){
    let doc = document.documentElement;
    let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    let headerContainer = document.querySelector('header');
    let headerlogo = document.querySelector('.header_logo a');
    let headerMenu = document.querySelector('.header_menu');
    let headerLogin = document.querySelector('.header_login');
    let userDetail = document.querySelector('.user_detail');
    let find_text = document.querySelector('.find_text');
    if(top >=11.686957359313965){
        headerContainer.classList.add('scrollPos');
        if(userDetail)
        userDetail.classList.add('scrollPos');
        headerlogo.classList.add('scroll_logo');
        headerMenu.classList.add('scroll_color');
        headerLogin.classList.add('scroll_color');
        find_text.classList.add('border');
    }
    else{
        headerContainer.classList.remove('scrollPos');
        if(userDetail)
        userDetail.classList.remove('scrollPos');
        headerlogo.classList.remove('scroll_logo');
        headerMenu.classList.remove('scroll_color');
        headerLogin.classList.remove('scroll_color');
        find_text.classList.remove('border');
    }
    let reveals = document.querySelectorAll('.reveal');
    for(let reveal of reveals){
        let windowHeight= window.innerHeight;
        let revealTop = reveal.getBoundingClientRect().top;
        let revealpoint = 100;
        if(revealTop < windowHeight - revealpoint){
            reveal.classList.add('active')
        }
    }
}