// import AuthApi from "../api/auth";
// import { ROUTER } from "../constants";

import { __AuthAPI } from "../api/auth/auth";
import { __ChatAPI } from "../api/auth/chat";
import { Router } from "../router/router";
import { ROUTES } from "../router/routes";

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

            window.store.set({
                user,
                contacts: chats.map((item) => {
                    return {
                        id: item.id,
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
            if (err.code === 401) {
                Router.get().go(ROUTES.login);
            } else {
                Router.get().go(ROUTES.page500);
            }
            // void authApi.logout();
        });
}

export async function login(login: string, password: string) {
    return __AuthAPI
        .login({ login, password })
        .then(async () => ensureStore())
        .then(() => {
            Router.get().go(ROUTES.chat);
        });
}
