export default {
    Endpoint: "https://chat.openai.com/backend-api/conversation",

    Headers: {
        "Accept": "application/json",
        "Authorization": "Bearer ",
        "Content-Type": "application/json"
    },

    Data: {
        "action": "next",
        "parent_message_id": "",
        "model": "text-davinci-002-render",
        "messages": []
    }
}