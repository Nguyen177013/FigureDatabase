        $(document).ready(function(){
            $('.cards').slick({
                slidesToShow: 4,
                slidesToScroll: 3,        
                centerMode: false,
                focusOnSelect: true,
                prevArrow:"<span>prev</span><svg class='svg-left' width='106' height='10' viewBox='0 0 106 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M106 4.99976H1M1 4.99976L4.98104 0.999756M1 4.99976L4.98104 8.99976' stroke='#BFBFBF'></path> </svg>",
            nextArrow:"<span>next</span> <svg class='svg-right' width='106' height='10' viewBox='0 0 106 10' fill='none' xmlns='http://www.w3.org/2000/svg' style='transform: rotate(180deg)'><path d='M106 4.99976H1M1 4.99976L4.98104 0.999756M1 4.99976L4.98104 8.99976' stroke='#BFBFBF'></path> </svg>"             
        })
        })