let file_input = document.getElementById('file_input');
let image_showcase = document.querySelector('.image_showcase');
let btn = document.querySelector('.send_btn');
let character = document.querySelector('.character');
let privacy = document.querySelector('.privacy');
character.classList.add('disabled');
character.disabled = true;
privacy.disabled = true;
btn.classList.add('disabled');
privacy.classList.add('disabled');
btn.disabled = true;
function displayImg() {
    image_showcase.innerHTML = "";
    for (const [id, file] of Object.entries(file_input.files)) {
        let sub_img = document.createElement('div');
        sub_img.classList.add('sub_img');
        let html = `<div class="sub_img">
            <img src="${URL.createObjectURL(file)}"
            alt="" class="new_img"></div>`;
        sub_img.innerHTML = html;
        image_showcase.appendChild(sub_img);
    }
}
async function enableChar() {
    let origin = document.querySelector('.origin');
    character.innerHTML = '';
    if (document.querySelector('.select_org').selected == false) {
        let origId = origin.value
        character.classList.remove('disabled');
        privacy.classList.remove('disabled');
        character.disabled = false;
        privacy.disabled = false;
        let req = await fetch(`/character/fig/${origId}`);
        let result = await req.json();
        for (let ele of result.characters) {
            const newOption = document.createElement('option');
            newOption.value = ele._id;
            newOption.text = ele.name;
            character.appendChild(newOption);
        }
        btn.disabled = false;
        btn.classList.remove('disabled');
        return;
    }
    character.classList.add('disabled');
    character.disabled = true;
    btn.disabled = true;
    privacy.disabled = true;
    btn.classList.add('disabled');
}
function enableButton() {
}