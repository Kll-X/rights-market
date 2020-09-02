import Vue from "vue";

const Bus = new Vue();
const handlers = {};

Bus.$idonce = (msg,id,callback)=>{
    handlers[msg] = handlers[msg] || {};
    handlers[msg][id] = callback;
}

Bus.$emitidonce = (msg)=>{
    if (handlers[msg]) {
        for(let id of Object.keys(handlers[msg])){
            handlers[msg][id]();
            delete handlers[msg][id];
        }
        if(Object.keys(handlers[msg]).length == 0){
            delete handlers[msg];
        }
    }
}

export default Bus;