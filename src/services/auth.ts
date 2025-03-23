// import AuthApi from "../api/auth";
// import { ROUTER } from "../constants";

import { ToastService } from ".";
import { __AuthAPI } from "../api/auth/auth";
import { __ChatAPI } from "../api/auth/chat";
import { Router } from "../router/router";
import { ROUTES } from "../router/routes";
import { HTTP_UNAUTHORIZED_ERROR } from "../utils/ajax";
import type { HttpError } from "../utils/errors";

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

export async function ensureStore() {
    let user;
    let chats;

    return __AuthAPI
        .me()
        .then(async (userInfo) => {
            user = userInfo;

            return __ChatAPI.getChats();
        })
        .then((chatsInfo) => {
            chats = chatsInfo;

            debugger;

            window.store.set({
                user,
                contacts: chats.map((item) => {
                    return {
                        id: item.id,
                        name: item.title,
                        image: item.avatar,
                        notifiesNumber: item.unread_count,
                        lastMessageDate: formatDate(item.last_message?.time),
                        preview: item.last_message?.content,
                    };
                }),
            });
        })
        .catch((err) => {
            if (err.code === 401) {
                if (window.location.pathname != "/signin") {
                    Router.get().go(ROUTES.login);
                }
            } else {
                Router.get().go(ROUTES.page500);
            }
            // void authApi.logout();
        });
}

export async function login(userLogin: string, userPassword: string): Promise<void> {
    return __AuthAPI
        .login(userLogin, userPassword)
        .catch((err: unknown) => {
            const httpError = err as HttpError;

            if (httpError.code === HTTP_UNAUTHORIZED_ERROR) {
                ToastService.error("Неверные логин или пароль");
            }

            throw err;
        })
        .then(async () => ensureStore())
        .then(() => {
            Router.get().go(ROUTES.chat);
        });
}
