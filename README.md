<img width="150" height="150" align="left" style="float: left; margin: 0 20px 0 0;" alt="Arlo" src="https://i.vgy.me/rW8hIU.png">

## chatgpt.js

> Interact with OpenAI's ChatGPT unofficial API programatically.

<div>
    <img src="https://img.shields.io/badge/-npm%20i%20chatgpt.js-blue?style=flat-square&logo=npm">
    <img src="https://img.shields.io/github/stars/PlutonusDev/chatgpt.js?label=Stars&style=flat-square&logo=github">
    <img src="https://img.shields.io/npm/dm/chatgpt.js?label=Downloads&style=flat-square&logo=npm">
    <img src="https://img.shields.io/github/commit-activity/m/PlutonusDev/chatgpt.js?label=Commits&style=flat-square&logo=github">
</div>

---

## Getting Started

To start using ` chatgpt.js ` in your project, follow this quick guide:

1. Add the package with ` npm i chatgpt.js -S ` or ` yarn add chatgpt.js `
2. Refer to the example code below to integrate:

<details>
<summary>Code Example (Click to Open)</summary>

**index.js**
```ts
const GPTChat = require("../dist");
const { authToken } = require("./config");
const sleep = require("util").promisify(setTimeout);

const chatgpt = new GPTChat.Client({ authToken });

chatgpt.once("ready", async () => {
    let resp = await chatgpt.call("hello there!").catch(e => console.log(e));
    if(!resp) return console.error("looks like something went wrong :(");
    console.log(resp);

    await sleep(10000);
    
    resp = await chatgpt.call("what is the scientific name for the common house finch?", resp.conversation).catch(e => console.log(e));
    if(!resp) return console.error("looks like something went wrong :(");
    console.log(resp);
});

chatgpt.on("debug", m => console.log(`DEBUG: ${m}`));
chatgpt.on("error", m => console.error(`ERROR: ${m}`));

/*
    Output:

    DEBUG: sessionKey updated to: (...)fqJbBV3WQ.W8IAmqiEwjO-Uyw9ub2Zsg
    {
        text: 'Hello! How can I help you today?',
        conversation: '4e294a80-5daf-4322-8077-dc4d58affa1a',
        parent_message: 'a5f3b506-232a-414f-999a-161cd1ee26b3'
    }
    DEBUG: sessionKey updated to: (...)FTpYIborA.5t64dn9PjQsM-abpr1GaYw
    DEBUG: Found cached conversation: {"id":"4e294a80-5daf-4322-8077-dc4d58affa1a","parent_id":"a5f3b506-232a-414f-999a-161cd1ee26b3"}
    {
        text: 'The scientific name for the common house finch is Haemorhous mexicanus. This species is a small, seed-eating bird native to North America. It is often found in urban and suburban areas, where it feeds on a variety of seeere it feeds on a variety of seeds and other plant material. The male of the species is easily recognizable by its bright red head and breast.',
        conversation: '4e294a80-5daf-4322-8077-dc4d58affa1a',
        parent_message: 'ab4ff136-625f-41d9-b283-2c154230b76e'
    }
*/
```

---

**config.js**
```js
module.exports = {
    authToken: "YOUR-OPENAI-ACCESS-TOKEN"
}
```

</details>

---

## Contributing

Before **creating an issue**, please ensure that it hasn't already been reported / suggested. If you would like to contribute to the codebase, please do! Fork [this repository](https://github.com/PlutonusDev/chatgpt.js), add your edits, and submit a pull request.

---

## License

` chatgpt.js ` is licensed under the GPL 3.0 license. See the `LICENSE` file for more information. If you plan to use any part of this source code in your own bot, I would be grateful if you would include some form of credit somewhere.

---

<h2 align="center">Star History</h2>

<div align="center">
    <a href="https://star-history.com/#PlutonusDev/chatgpt.js&Timeline">
        <img src="https://api.star-history.com/svg?repos=PlutonusDev/chatgpt.js&type=Timeline" />
    </a>
</div>
