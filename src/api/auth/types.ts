export interface APIError {
    reason: string;
}

export interface SignUpResponse {
    id: number;
}

export interface UserDTO {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
}

export type CreateUser = Omit<UserDTO, "avatar" | "display_name" | "id"> & {
    password: string;
};

export interface CreateChat {
    title: string;
}

// export interface LoginRequestData {
//     login: string;
//     password: string;
// }

interface LastMessage {
    user: UserDTO;
    time: string;
    content: string;
}

export interface ChatDTO {
    id: number;
    title: string;
    avatar: string | null;
    unread_count: number;
    last_message: LastMessage | null;
}
