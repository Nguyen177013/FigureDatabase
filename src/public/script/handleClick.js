let option_btn = document.querySelectorAll('.option_btn');
let list_options = document.getElementsByClassName('list_options');
let contain = document.querySelector('.list_posts');
let deletes = document.getElementsByClassName('delete'); 
let a = [].slice.call(list_options);
console.log(a);
let setUp=(length)=>{
    for(let i=0;i<length;i++){
        let status = false;
        option_btn[i].addEventListener('click',e=>{
            console.log(i);
            console.log(list_options);
            if(status == false){
                list_options[i].classList.add('show');
                status = true;
                return;
            }
            status = false;
            list_options[i].classList.remove('show');
        })
    }
}
for(let j = 0;j<deletes.length;j++){
    deletes[j].addEventListener('click',e =>{
        list_options[j].parentNode.removeChild(list_options[j])
        contain.removeChild(contain.children[j]);
    })
}