class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = database.collection('chats');
        this.unsub;
    }
    async addChat(message){
        //format a chat object
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        // save the chat document
        const response = await this.chats.add(chat);
        return response;
    }
    async deleteChat(id){
        const response = await this.chats.doc(id).delete();
        return response;
    }
    getChats(callback){
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        callback(change.doc.data(), change.doc.id);
                    }
                })
            })
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }
    updateRoom(room){
        this.room = room;
        if(this.unsub){
            this.unsub();
        }
        localStorage.setItem('room', room);
    } 

}
