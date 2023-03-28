const subImg = document.querySelectorAll('.child_img img');
const Img = document.querySelector('.main_img img');
const mainImg = document.querySelector('.main_img');
for(let ele of subImg){
    ele.addEventListener('click',function(){
        Img.src = this.src
        mainImg.href = this.src
    })
}