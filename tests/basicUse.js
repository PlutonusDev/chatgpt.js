const GPTChat = require("../dist");
const { authToken } = require("./config");

const Client = new GPTChat.Client({ authToken });

Client.call("hello there!").then(resp => {
    console.log(resp);
}).catch(e => console.log(e));