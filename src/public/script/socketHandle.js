const socket = io();
let message_input = document.getElementById('message-input');
let form = document.getElementById('send-container');
let message_body = document.querySelector('.message_body');
socket.on('user_mess',(data)=>{
    console.log(data);
}) 
socket.emit('user_mess',{userSend:userSend,userGet:userGet})
socket.on('messenger',data=>{
    if(data.userSend !== userGet)
    return;
    handleGetMessage(data)
})
form.addEventListener('submit', async function(e){
    e.preventDefault();
    let message = message_input.value;
    try{
        let req = await fetch('/message/sendmessage',{
            method:"POST",
            body: JSON.stringify({userSend,userGet,message}),
            headers:{'Content-Type': 'application/json'}
        })
        let check = await fetch('/message/addList',{
            method:"POST",
            body: JSON.stringify({userGet:userSend,userSend:userGet}),
            headers:{'Content-Type': 'application/json'}
        });
        let result = await check.json();
        console.log(result);
        let res = await req.json();
        if(res){
            handleSendMessage(message);
            socket.emit('messenger',{userSend:userSend,userGet:userGet,message:message});
            message_input.value = '';
        }
    }
    catch(ex){
        console.log(ex.message);
    }
})
function handleSendMessage(message){
    let send = document.createElement('div');
    send.classList.add('user_send');
    let html = `
        <p class="send">${message}</p>
    `
    send.innerHTML = html;
    message_body.appendChild(send);
}
function handleGetMessage(data){
    let send = document.createElement('div');
    send.classList.add('user_get');
    let html = `
        <p class="get">${data.message}</p>
    `
    send.innerHTML = html;
    message_body.appendChild(send);
}