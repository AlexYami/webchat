import type { GetChatResultItem } from "../api/chat";
import type { ContactProps } from "../components/contact/contact";
import type { MessageProps } from "../components/message/message";
import type { MessageResult } from "../components/messageBox/messageBox";
import type { UserState } from "../store";
import { DEFAULT_AVATAR_URL } from "./constants";
import { toLongDate, toShortDate } from "./date";

export function mapToContact(chat: GetChatResultItem): ContactProps {
    return {
        id: chat.id,
        name: chat.title,
        image: chat.avatar ?? DEFAULT_AVATAR_URL,
        notifiesNumber: chat.unread_count,
        lastMessageDate: toShortDate(chat.last_message?.time),
        preview: chat.last_message?.content ?? "",
        isActive: false,
    };
}

export function mapStateToSettings(user: UserState): Record<string, unknown> {
    return {
        email: user.email,
        login: user.login,
        image: user.avatar ?? "",
        firstName: user.first_name,
        lastName: user.second_name,
        displayName: user.display_name,
        phone: user.phone,
    };
}

export function mapToMessage(message: MessageResult, userId: number): MessageProps {
    return {
        my: message.user_id === userId,
        read: message.is_read,
        text: message.content,
        date: toLongDate(message.time),
    };
}
