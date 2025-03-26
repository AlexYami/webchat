import { ToastService } from ".";
import { __ChatAPI } from "../api/chat";
import { __UserAPI, type SearchUserResult } from "../api/user";
import { Store } from "../store";
import { mapToContact } from "../utils/mappings";

const getUserNotFoundErrorMessage = (userLogin: string): string => `Пользователь с логином "${userLogin}" не найден`;
const getUserAddedToChatMessage = (userLogin: string): string => `Пользователь с логином "${userLogin}" добавлен в чат`;
const getUserDeletedFromChatMessage = (userLogin: string): string =>
    `Пользователь с логином "${userLogin}" был удален из чата`;
const getChatCreatedMessage = (title: string): string => `Чат "${title}" был успешно создан`;

export async function addUserToChat(userLogin: string, chatId: number): Promise<void> {
    return __UserAPI.searchUser(userLogin).then((user: SearchUserResult | null) => {
        if (!user) {
            ToastService.error(getUserNotFoundErrorMessage(userLogin));
        } else {
            __ChatAPI
                .addUsersToChat(chatId, [user.id])
                .then(() => {
                    ToastService.info(getUserAddedToChatMessage(userLogin));
                })
                .catch(() => {
                    ToastService.error();
                });
        }
    });
}

export async function deleteUserFromChat(userLogin: string, chatId: number): Promise<void> {
    return __UserAPI.searchUser(userLogin).then((user: SearchUserResult | null) => {
        if (!user) {
            ToastService.error(getUserNotFoundErrorMessage(userLogin));
        } else {
            __ChatAPI
                .deleteUsersFromChat(chatId, [user.id])
                .then(() => {
                    ToastService.info(getUserDeletedFromChatMessage(userLogin));
                })
                .catch(() => {
                    ToastService.error(`Произошла неизвестная ощибка`);
                });
        }
    });
}

export async function createChat(title: string): Promise<void> {
    return __ChatAPI
        .createChat(title)
        .then(() => {
            ToastService.info(getChatCreatedMessage(title));
        })
        .then(async () => {
            return __ChatAPI.getChats();
        })
        .then((chats) => {
            Store.get().set({
                contacts: chats.map((chat) => {
                    return { ...mapToContact(chat) };
                }),
            });
        })
        .catch(() => {
            ToastService.error();
        });
}
export async function updateAvatar(chatId: number, file: File): Promise<void> {
    const formData = new FormData();

    formData.append("avatar", file);

    return __ChatAPI
        .uploadAvatar(chatId, formData)
        .then((result) => {
            ToastService.info("Аватар успешно обновлен");

            const store = Store.get();

            const { activeChat, contacts } = store.getState();

            if (!activeChat || !contacts) return;

            const updatedContacts = contacts.map((contact) => {
                const image = contact.id === chatId ? result.avatar : contact.image;

                return {
                    ...contact,
                    image,
                };
            });

            store.set({
                contacts: updatedContacts,
                activeChat: {
                    ...activeChat,
                    image: result.avatar,
                },
            });
        })
        .catch(() => {
            ToastService.error();
        });
}
