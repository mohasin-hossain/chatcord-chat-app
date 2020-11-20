class ChatUI {
    constructor(list){
        this.list = list;
    }
    clear(){
        this.list.innerHTML = '';
    }
    render(data, id){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix: true }
        )
        const html = `
        <li class="list-group-item list" data-id=${id}>
        <span class="username text-info">${data.username}</span>
        <span class="message text-white">${data.message}</span>
        <div class="close float-right text-danger">x</div>
        <div class="time text-muted">${when}</div>
        </li>
        `;
        this.list.innerHTML += html;
    }
}