interface ClientConfig {
    authToken: String;
}

interface Message {
    role: String | null;
    id: String;
    content: {
        content_type: "text";
        parts: String[];
    }
}

interface APIRequest {
    action: String;
    conversation_id?: String;
    parent_message_id: String;
    model: String;
    messages: Message[];
}

interface APIResponse {
    message: {
        id: String;
        role: String;
        user: null;
        create_time: null;
        update_time: null;
        content: {
            content_type: "text";
            parts: String[];
        }
        end_turn: null;
        weight: Number;
        metadata: any;
        recipient: "all";
    },
    conversation_id: String;
    error: String | null;
}

interface Conversation {
    id: String;
    parent_id: String;
}