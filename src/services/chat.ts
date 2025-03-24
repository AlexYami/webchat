// import AuthApi from "../api/auth";
// import { ROUTER } from "../constants";

import { ToastService } from ".";
import { __ChatAPI } from "../api/auth/chat";
import { __UserAPI } from "../api/auth/user";

function formatDate(dateStr: string | undefined) {
    if (!dateStr) return "";

    const options = {
        // weekday: "short", // день недели
        month: "short", // месяц
        day: "numeric", // день месяца
    };

    return new Date(dateStr).toLocaleString("ru-RU", options);
}

// const authApi = new AuthApi();

// export const login = async (model) => {
//     window.store.set({ isLoading: true });
//     try {
//         await authApi.login(model);
//         window.router.go(ROUTER.cats);
//     } catch (responsError) {
//         const error = await responsError.json();
//         window.store.set({ loginError: error.reason });
//     } finally {
//         window.store.set({ isLoading: false });
//     }
// };

// export const checkLoginUser = async () => {
//     window.store.set({ isLoading: true });
//     try {
//         const user = await authApi.me();
//         window.router.go(ROUTER.cats);
//         window.store.set({ user });
//     } catch (responsError) {
//         const error = await responsError.json();
//         window.store.set({ loginError: error.reason });
//     } finally {
//         window.store.set({ isLoading: false });
//     }
// };

export async function addUserToChat(userLogin: string, chatId: number): Promise<void> {
    return __UserAPI.searchUser(userLogin).then((users) => {
        if (!users.length) {
            ToastService.error(`Пользователь с логином "${userLogin}" не найден`);
        } else {
            __ChatAPI
                .addUsersToChat(chatId, [users[0].id])
                .then(() => {
                    ToastService.info(`Пользователь с логином "${userLogin}" был добавлен в чат`);
                })
                .catch(() => {
                    ToastService.error(`Произошла неизвестная ощибка`);
                });
        }
    });
}

export async function deleteUserFromChat(userLogin: string, chatId: number): Promise<void> {
    return __UserAPI.searchUser(userLogin).then((users) => {
        if (!users.length) {
            ToastService.error(`Пользователь с логином "${userLogin}" не найден`);
        } else {
            __ChatAPI
                .deleteUsersFromChat(chatId, [users[0].id])
                .then(() => {
                    ToastService.info(`Пользователь с логином "${userLogin}" был удален из чата`);
                })
                .catch(() => {
                    ToastService.error(`Произошла неизвестная ощибка`);
                });
        }
    });
}

// export async function signup(formData: SignupFormData): Promise<void> {
//     return __AuthAPI
//         .create(formData)
//         .catch((err: unknown) => {
//             ToastService.error("Во время регистрации произошла ошибка");

//             throw err;
//         })
//         .then(() => {
//             Router.get().go(ROUTES.chat);
//         });
// }

export async function createChat(title: string) {
    return __ChatAPI
        .createChat(title)
        .then(() => {
            ToastService.info(`Чат "${title}" был успешно создан`);
        })
        .then(async () => {
            return __ChatAPI.getChats();
        })
        .then((res) => {
            window.store.set({
                contacts: res.map((item) => {
                    return {
                        name: item.title,
                        image: item.avatar,
                        notifiesNumber: item.unread_count,
                        lastMessageDate: item.last_message,
                        preview: item.last_message,
                    };
                }),
            });
        })
        .catch((err) => {
            ToastService.error("Произошла неизвестная ошибка");
        });
}
export async function updateAvatar(chatId: number, file: File) {
    const formData = new FormData();

    formData.append("avatar", file);

    return __ChatAPI
        .uploadAvatar(chatId, formData)
        .then((res) => {
            ToastService.info("Аватар успешно обновлен");

            window.store.set({
                user: res,
            });
        })
        .catch((err: unknown) => {
            ToastService.error("Произошла неизвестная ошибка");
        });
}
