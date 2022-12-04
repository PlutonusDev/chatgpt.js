import axios from "axios";
import BaseInfo from "../util/requests";
import Helpers from "../util/helpers";

/** The base ChatGPT Client */
export default class ChatGPTClient {
    config: ClientConfig;
    conversationCache: Conversation[];

    /**
     * Instantiate the ChatGPT Client
     * @param {ClientConfig} configuration - Configuration options for ChatGPT
     * @param {String} configuration.authToken - The Authorization token from ChatGPT
     */
    constructor(config: ClientConfig) {
        this.config = config;
        this.conversationCache = [];
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
            //let responses: APIResponse[] = [];

            const reqData: APIRequest = {
                ...BaseInfo.Data,
                "parent_message_id": cached?.parent_id || Helpers.generateID(),
                "messages": [{
                    "role": "user",
                    "id": Helpers.generateID(),
                    "content": {
                        "content_type": "text",
                        "parts": [ prompt ]
                    }
                }]
            }
            if(conversation_id) reqData["conversation_id"] = conversation_id;

            const resp = await axios({
                url: BaseInfo.Endpoint,
                method: "POST",
                headers: {
                    ...BaseInfo.Headers,
                    "Authorization": `Bearer ${this.config.authToken}`
                },
                data: reqData
            }).catch(e => rej(`${e.code} - ${e.response.data.detail.code}`));

            const finalData = resp?.data.split("\n\n");
            if(!finalData) {
                return rej("Something went wrong getting the response from OpenAI. Check your API key");
            }

            res({
                text: JSON.parse(finalData[finalData.length - 4].split("data: ")[1]).message.content.parts[0]
            });
        });
    }
}