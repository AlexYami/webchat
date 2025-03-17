import { HttpRequest } from "../../utils/ajax";

const baseUrl = "https://ya-praktikum.tech/api/v2/chats";

function getEndpointUrl(targetUrl: string): string {
    return `${baseUrl}${targetUrl}`;
}

export interface Chat {
    avatar: string;
    created_by: number;
    id: number;
    last_message: string;
    title: string;
    unread_count: number;
}

export default class ChatApi {
    public async getChats(): Promise<Chat[]> {
        const res = await HttpRequest.get(getEndpointUrl(""));

        return JSON.parse(res) as Chat[];
    }

    public async getToken(chatId: number): Promise<string> {
        return HttpRequest.post(getEndpointUrl(`/token/${chatId}`), {});
    }

    public async createChat(): Promise<unknown> {
        return HttpRequest.post(getEndpointUrl(""), { title: `Чат ${Date.now()}` });
    }

    public async addUsersToChat(chatId: number, users): Promise<void> {
        return HttpRequest.put(getEndpointUrl("/users"), {
            chatId,
            users,
        });
    }
}

export const __ChatAPI = new ChatApi();
