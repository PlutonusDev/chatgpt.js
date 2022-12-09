const GPTChat = require("../dist");
const { authToken } = require("./config");
const sleep = require("util").promisify(setTimeout);

const chatgpt = new GPTChat.Client({ authToken });

chatgpt.once("ready", async () => {
    let resp = await chatgpt.call("what is the scientific name for the common house finch?").catch(e => console.log(e));
    if(!resp) return console.error("looks like something went wrong :(");
    console.log(resp);

    await sleep(10000);
    
    resp = await chatgpt.call("are there any in Australia?", resp.conversation).catch(e => console.log(e));
    if(!resp) return console.error("looks like something went wrong :(");
    console.log(resp);
});

chatgpt.on("debug", m => console.log(`DEBUG: ${m}`));
chatgpt.on("error", m => console.error(`ERROR: ${m}`));