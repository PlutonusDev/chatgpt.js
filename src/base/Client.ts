import axios from "axios";
import BaseInfo from "../util/requests";

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
    call(prompt: String, conversation_id?: String,) {
        return new Promise((res, rej) => {
            axios({
                url: BaseInfo.Endpoint,
                method: "POST",
                headers: {
                    ...BaseInfo.Headers,
                    "Authorization": `Bearer ${this.config.authToken}`
                },
                data: {
                    ...BaseInfo.Data,
                    "conversation_id": conversation_id,
                    "messages": {
                        "content": {
                            "parts": [ prompt ]
                        }
                    }
                },
                transformResponse: (r: APIResponse) => r.data
            }).then(resp => {
                res({
                    text: resp.data?.message?.contents?.parts[0]
                });
            }).catch(err => {
                rej(`Something went wrong! ${err.message}`);
            });
        });
    }
}