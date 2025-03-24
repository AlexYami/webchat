import { HttpRequest } from "../../utils/ajax";

const baseUrl = "https://ya-praktikum.tech/api/v2/chats";

function getEndpointUrl(targetUrl: string): string {
    return `${baseUrl}${targetUrl}`;
}

export interface Chat {
    avatar: string;
    created_by: number;
    id: number;
    last_message?: Record<string, unknown>;
    title: string;
    unread_count: number;
}

export default class ChatApi {
    public async getChats(): Promise<Chat[]> {
        const res = await HttpRequest.get(getEndpointUrl(""));

        const chats = JSON.parse(res) as Chat[];

        return chats;
    }

    public async getToken(chatId: number): Promise<string> {
        return HttpRequest.post(getEndpointUrl(`/token/${chatId}`), {});
    }

    public async createChat(title: string): Promise<unknown> {
        return HttpRequest.post(getEndpointUrl(""), { title });
    }

    public async uploadAvatar(chatId: number, data: FormData): Promise<string> {
        data.append("chatId", chatId);

        return HttpRequest.put(getEndpointUrl("/avatar"), data, {}).then((res) => JSON.parse(res));
    }

    public async addUsersToChat(chatId: number, users): Promise<void> {
        return HttpRequest.put(getEndpointUrl("/users"), {
            chatId,
            users,
        });
    }

    public async deleteUsersFromChat(chatId: number, users): Promise<void> {
        return HttpRequest.delete(getEndpointUrl("/users"), {
            chatId,
            users,
        });
    }
}

export const __ChatAPI = new ChatApi();
