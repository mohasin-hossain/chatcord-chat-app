// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-name-message')
const rooms = document.querySelector('.chat-rooms');
const list = document.querySelector('ul')

// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(error => console.log(error));

})

// delete chat 
list.addEventListener('click', e => {
    if(e.target.classList.contains("close")){
        const id = e.target.parentElement.getAttribute('data-id');
        chatroom.deleteChat(id).then(() => location.reload());
    }
})

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // update name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(`${newName}😎`);
    // reset the form
    newNameForm.reset();
    // show then hide the name update message
    updateMessage.innerHTML = `Success. Your name is updated to ${newName}!`;
    setTimeout(() => {
        updateMessage.innerText = ''
    },2000);
})

// update the chat room
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})
 

// check localstorage for name and room
const username = localStorage.username ? localStorage.username : 'Unknown';
const room = localStorage.room ? localStorage.room : 'general';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom(room, username);

// get chats and render
chatroom.getChats((data, id) => {
    chatUI.render(data, id)
})

