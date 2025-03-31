import { HttpRequest } from "../utils/ajax";
import { BASE_API_URL } from "../utils/constants";

function getEndpointUrl(targetUrl: string): string {
    return `${BASE_API_URL}/chats/${targetUrl}`;
}

export interface GetChatResultItem {
    avatar?: string;
    created_by: number;
    id: number;
    last_message?: {
        time: string;
        content: string;
    };
    title: string;
    unread_count: number;
}

export interface UploadChatAvatarResult {
    avatar: string;
    created_by: number;
    id: number;
    title: string;
}

export interface CreateChatResult {
    id: number;
}

export interface GetTokenResult {
    token: string;
}

export default class ChatApi {
    public async getChats(): Promise<GetChatResultItem[]> {
        const result = await HttpRequest.get(getEndpointUrl(""));

        return JSON.parse(result) as GetChatResultItem[];
    }

    public async getToken(chatId: number): Promise<GetTokenResult> {
        const result = await HttpRequest.post(getEndpointUrl(`/token/${chatId}`), {});

        return JSON.parse(result) as GetTokenResult;
    }

    public async createChat(title: string): Promise<CreateChatResult> {
        const result = await HttpRequest.post(getEndpointUrl(""), { title });

        return JSON.parse(result) as CreateChatResult;
    }

    public async uploadAvatar(chatId: number, data: FormData): Promise<UploadChatAvatarResult> {
        data.append("chatId", String(chatId));

        return HttpRequest.put(getEndpointUrl("/avatar"), data, {}).then((result) => {
            return JSON.parse(result) as UploadChatAvatarResult;
        });
    }

    public async addUsersToChat(chatId: number, users: number[]): Promise<string> {
        return HttpRequest.put(getEndpointUrl("/users"), {
            chatId,
            users,
        });
    }

    public async deleteUsersFromChat(chatId: number, users: number[]): Promise<string> {
        return HttpRequest.delete(getEndpointUrl("/users"), {
            chatId,
            users,
        });
    }
}

export const __ChatAPI = new ChatApi();
