$(document).ready(function(){
    $('.handle_img').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow:"<div class='slick-prev pull-left'><svg class ='prev' xmlns='http://www.w3.org/2000/svg' width='106' height='25' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'><path stroke-linecap='round' stroke-linejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' /></svg></div>",
        nextArrow:"<div class='slick-next pull-right'><svg class='next' xmlns='http://www.w3.org/2000/svg' width='106' height='25' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'><path stroke-linecap='round' stroke-linejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5'/></svg></div>"
    })
})