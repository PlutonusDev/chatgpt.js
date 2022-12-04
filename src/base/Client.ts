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
            const cached = this.conversationCache.find(conv => conv.id === conversation_id || null);

            axios({
                url: BaseInfo.Endpoint,
                method: "POST",
                headers: {
                    ...BaseInfo.Headers,
                    "Authorization": `Bearer ${this.config.authToken}`
                },
                data: {
                    ...BaseInfo.Data,
                    "parent_message_id": cached?.parent_id,
                    "conversation_id": conversation_id,
                    "messages": {
                        "content": {
                            "parts": [ prompt ]
                        }
                    }
                },
                transformResponse: (r: APIResponse) => r.data
            }).then(resp => {
                if(!cached || !conversation_id) {
                    this.conversationCache.push({
                        id: resp.data?.conversation_id,
                        parent_id: resp.data?.message?.id
                    });
                } else {
                    cached.parent_id = resp.data?.message?.id;
                }

                res({
                    text: resp.data?.message?.contents?.parts[0]
                });
            }).catch(err => {
                rej(`Something went wrong! ${err.message}`);
            });
        });
    }
}