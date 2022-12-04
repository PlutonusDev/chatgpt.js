<img width="150" height="150" align="left" style="float: left; margin: 0 20px 0 0;" alt="Arlo" src="https://i.vgy.me/rW8hIU.png">

## chatgpt.js

[![](https://img.shields.io/github/issues/PlutonusDev/chatgpt)](https://github.com/PlutonusDev/chatgpt/issues)
[![](https://snyk.io/test/github/PlutonusDev/chatgpt)]()

> ` chatgpt.js ` is a basic NodeJS library enabling users to programmatically interact with the brand new ChatGPT public beta.

---

## Getting Started

To start using ` chatgpt.js ` in your project, follow this quick guide:

1. Add the package with ` npm i chatgpt.js -S ` or ` yarn add chatgpt.js `
2. Refer to the example code below to integrate:

<details>
<summary>Code Example (Click to Open)</summary>

**index.js**
```ts
const GPTChat = require("gptchat.js");
const { authToken } = require("./config");

const Client = new GPTChat.Client({ authToken });

Client.call("hello there!").then(resp => {
    console.log(resp);
}).catch(e => console.log(e));

/*
    Output:

    {
        text: "Hello! How can I help you today? Is there something on your mind that you'd like to talk about? I'm a large language model trained by OpenAI, so I'm here to help answer any questions you might have. Let me know if there's anything I can do for you."
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

## Finally

Thank you so much for visiting! I hope that my code is useful to you. I'd really appreciate a ⭐ if this helped you out. Cheers!