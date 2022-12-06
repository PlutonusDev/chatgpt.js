export default {
    BaseEndpoint: "https://chat.openai.com/chat",
    ConversationEndpoint: "https://chat.openai.com/backend-api/conversation",
    SessionEndpoint: "https://chat.openai.com/api/auth/session",

    Headers: {
        "Accept": "application/json",
        "Cookie": "__Secure-next-auth.session-token=",
        "Authorization": "Bearer ",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
    },

    Data: {
        "action": "next",
        "parent_message_id": "",
        "model": "text-davinci-002-render",
        "messages": []
    }
}