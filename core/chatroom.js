
export const MESSAGE_TYPE_CHATLOG = "chat-log"
export const MESSAGE_TYPE_CHAT_HISTORY = "chat-history"

export class ChatLog {
    constructor(login, message){
        this.login = login;
        this.message = message;
    }
};

export class Message_ChatLog {
    constructor(chat_log){
        this.msgtype = MESSAGE_TYPE_CHATLOG;
        this.chat_log = chat_log;
    }
};

export class Message_ChatHistory {
    constructor(chat_hitory){        
        this.msgtype = MESSAGE_TYPE_CHAT_HISTORY;
        this.message_history = chat_log;
    }
};

const max_history_size = 100;

export const ChatRoom = function(){
    
    this.message_history = []; // ChatLog objects in history order
    this.listeners = [];

    this.notify_all = function(chat_log){
        for(let listener of this.listeners){
            listener(chat_log);
        }
    };


    this.add_listener= function(listener){
        console.assert(listener);
        this.listeners.push(listener);
    };

    this.remove_listener= function(listener_to_remove){
        this.listeners = this.listeners.filter((listener)=>{
            return listener == listener_to_remove;
        });
    };
    
    this.add_log = function(chat_log){
        console.log("ChatRoom: " + chat_log.login + "> " + chat_log.message);
        this.message_history.push(chat_log);
        
        while(this.message_history.size > max_history_size) {
            this.message_history.shift();
        }

        this.notify_all(chat_log);
    };

    this.capture_message_history = function(){
        return this.message_history.slice();
    };

}



