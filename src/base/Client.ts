import axios from "axios";
import { EventEmitter } from "node:events";
import BaseInfo from "../util/requests";
import Helpers from "../util/helpers";

/** The base ChatGPT Client */
export default class ChatGPTClient extends EventEmitter {
    config: ClientConfig;
    conversationCache: Conversation[];
    sessionKey: String;

    /**
     * Instantiate the ChatGPT Client
     * @param {ClientConfig} configuration - Configuration options for ChatGPT
     * @param {String} configuration.authToken - The Authorization token from ChatGPT
     */
    constructor(config: ClientConfig) {
        super();

        this.config = config;
        this.conversationCache = [];

        // Temporary until we can generate a fake accesskey that OpenAI will accept and replace for us
        this.sessionKey = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..CO6KGYcaJ38qApl9.SrBSBzNbYsvTrhVHu-TLGWlKpVct-owkw8IL6l4czxi8eEerfnIA2QEXMOiUfjUnWRk7YkQ4R7Mcf54FntzxW_rSq4R5z3w0iIfADeDn4RzhhmroPaBrPCV4FkjfmG1Dyh_Gky3ylFwcmxon5ixdZIxd6EuiJqw1lEtQAhBnw8wgpv3i5kDxwfMfGu194Vnwp6NgJnpejJvATPQiMN4IvcXYjsTNZQ0OvHyWRdmeDQnvr6fxjJLyzy1XBkNJFQQsPv41cOLgAlxphv7rIuhskI0oy6OPiNOWhVwiG3fitu-2_ypW2KPxR-_MDfg8yEt5lL7ZO6Aeg26ZfLJ_NGpLU563WY9w3cn_rt8QhNTbw0QfPa6bfAC9FpU2MxbUR1WKb6YXl7mGlBerYWBTaEpo90uVbONtmJuTWQKeI5Fjp8tw4mTnOUuaW93IOTup67Ags4tlPIu6AqN42FdYdZNVfkvX3Ad8tzAY1CkpqrDoQKux1XV4KIKQfEoyvu2S7bmYjNtRzx-YEqRG8W7u5WZaYQPGn-48DNEBgIq22LLp31RWRu4itc-7LIorYaySuvDy1ern_bTWaUhBNBQuo__6LtnVPj0cy1ofzcMReIKanzh_2A-5t5ZSC0sZ05e47Ot1JpZnIYNcDMuKMijnt9F2xuNO2jrqfyArKKQ-e9JI1cMeoSW_1BcKyA28CGHokxVTyNiZODDx-B0dgOcTH1utBbLjFtnypYmCvsx4hJ95RG4QpYPCzEovl1bCYogw2thDC4-N58JYhmXGr1RshPxD8CQAFVS73HYFL4ObXhAW4tTuC_VvsxO5fQv7j9T9zt2onPkj6y5zkYjHcJa39RA_kTP5hLNogYIlOsVMZh9hrqKwdhU62C5-_0KvOOwlVaxeXZRwXvKV2OinfN6udSKKQu-atLaqjC1dJL3KVlbenSuDC4aWlxF8YyHocXoazwKslLBp7tP3C8dKYTBdu45KjTL9jDuy1-azpWHKDiFKzlXlKLXrDZK-LwGFY9We55jTIr7PjaPVXKpmxf5yVokLSijAS0o5D1zZI1lOrxmFqrSt6oDtk3Fs3Nkq6Vs9V5Gcld9J8WuJBg43_2CEDN1KNkjhvcMnfFuOYRXrpWbMYKcTwIxFsHo7dve808QqxUXD87PlZHQIihSEghE868XsvDs-SYiQgfpV5Pjpm76uiE6HB4JDKqPFbeEQD8dGVZByqDui2A1XgXOnO1Go2AHLlhBBUr0nKg4D4AG0lSMCU80Tq4ZsygSip9hEXSJlbhOUjl7ViUkz5jdOb60qjkO7SJQzsqdspetsYHPnQ7893W2W4KbThHhM29hknrZ00GXP57f8bKnRbXsTsonEEy3BrpSj8CP3D1EpLU1B27hw69IvcgVI6h2OpnEJVLHspRtIxFj5CliQz-HeonN6d99vP5LoPkOltYM9elxKyYei4-0g6pZTGFTy4HpRU4txqcFC9KR4aavTeWZ19BPs8WwtWIA1x3LAbNu3UXsrK6bTWY5qJsVluhmdIQAUuUmgzVxVKILwPEyHwngr9A7yEISuN6kXRjuxO0gzSOHP7oSeaU8unKSw7Qk7TpH68ggGceomTyN13sVGlH0BFbJ4cT7HHvlc8rwxvi-GgpPm3omyrTSaQBFzNvkxgRQ8mPHQBhsjBAqs7iNA-ie2rB0_H1tjxgLoOQDNRNEEHd6I8sV0kUdScCp-hyE5FaLPVoXkQ8qedYzmFwDfsZ6eNmFKYFfA5NJxJTOkhU9HgEx44S_jFeVtgsmONAzJiKkANbYz0pdxrbDFvify8e9UL-CYdF9PLtJkM9oEdhMPPABkmEj-YZjm__0uLBJvcBbm3e7zutKm9kmhtSfZ3v77o1pHZk5Dw4KCs4e8aDHO1pwRoIPRnjjlUCEPRSEBFtN-bHUigcesMYWQJI0XKjeJtwcK2bVkzOsQLd37G3LQbijhSwpGVsChcYtJ_uHiItFOy_puRb1uzkacJlAX87SmeXhgx86HfeiZEVZrVFYyBFgpKRTCkYv-Pxeyc9_kNbTGhymaTsWCRbkcoyXMdY1DQdFCd0Ww5tzDCN4m2r8Wjau33auPfGH8vQsHwGid0hgSZC3y5jKNOgXy7wX_SE4OAW_MYSsPuDdG3DHjZtjf2HZquC4rjj9zJFZP22rNfWvh-sF1.aQTmJbP7siEEuYK2M0RjiQ";

        setInterval(() => this._updateAccessToken().then(m => this.emit("debug", m)).catch(e => this.emit("error", e.message)), 25000);
        this._updateAccessToken().then(m => {
            this.emit("debug", m);
            this.emit("ready");
        }).catch(e => this.emit("error", e.message));
    }

    _updateAccessToken() {
        return new Promise(async (res, rej) => {
            const sessionData = await axios({
                url: BaseInfo.SessionEndpoint,
                method: "GET",
                withCredentials: true,
                headers: {
                    ...BaseInfo.Headers,
                    "Accept": "*/*",
                    "Cookie": `__Secure-next-auth.session-token=${this.sessionKey};`,
                    "Authorization": `Bearer ${this.config.authToken}`
                }
            }).catch(e => rej(`Failed to update access token: ${e.message}`));

            let cookies = sessionData?.headers["set-cookie"];
            let sessionCookie = cookies?.find((cookie: String) => cookie.split("=")[0] == "__Secure-next-auth.session-token");
            if (!sessionCookie) return rej(`Failed to find session cookie in response!`);
            this.sessionKey = sessionCookie.split(";")[0].split("=")[1];
            res(`sessionKey updated to: (...)${this.sessionKey.substring(this.sessionKey.length - 32)}`)
        });
    }

    /**
     * Call the ChatGPT API
     * @param {String} prompt - The new prompt to continue the conversation
     * @param {String} conversation_id - The unique conversation identifier to continue a conversation
     * @returns {Promise<ApiResponse>} The API response text
     * @async
     */
    async call(prompt: String, conversation_id?: String,) {
        return new Promise(async (res, rej) => {
            const cached = this.conversationCache.find(conv => conv.id === conversation_id || null);
            if (cached) this.emit("debug", `Found cached conversation: ${JSON.stringify(cached)}`)

            const reqData: APIRequest = {
                ...BaseInfo.Data,
                "parent_message_id": cached?.parent_id || Helpers.generateID(),
                "messages": [{
                    "role": "user",
                    "id": Helpers.generateID(),
                    "content": {
                        "content_type": "text",
                        "parts": [prompt]
                    }
                }]
            }
            if (conversation_id) reqData["conversation_id"] = conversation_id;

            const resp = await axios({
                url: BaseInfo.ConversationEndpoint,
                method: "POST",
                withCredentials: true,
                headers: {
                    ...BaseInfo.Headers,
                    "Content-Type": "application/json",
                    "Cookie": `__Secure-next-auth.session-token=${this.sessionKey};`,
                    "Authorization": `Bearer ${this.config.authToken}`
                },
                data: reqData
            }).catch(e => {
                rej(`CONVERSATION REQUEST: ${e.code} - ${e.response.data.detail?.code || "Unknown OpenAI Error!"}`);
                console.log(e.response.data);
            });

            let finalData = resp?.data.split("\n\n");
            if (!finalData) {
                return rej("Something went wrong getting the response from OpenAI. Check your API key");
            }
            finalData = JSON.parse(finalData[finalData.length - 4].split("data: ")[1])

            this.conversationCache.push({
                id: finalData.conversation_id,
                parent_id: finalData.message.id
            });

            res({
                text: finalData.message.content.parts[0],
                conversation: finalData.conversation_id,
                parent_message: finalData.message.id
            });
        });
    }
}