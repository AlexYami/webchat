import { ToastService } from ".";
import { __AuthAPI, type AuthMeResult } from "../api/auth";
import { __ChatAPI, type GetChatResultItem } from "../api/chat";
import type { SignupFormData } from "../pages/signup/signup";
import { Router } from "../router/router";
import { ROUTES } from "../router/routes";
import { Store } from "../store";
import { HTTP_UNAUTHORIZED_ERROR } from "../utils/ajax";
import { DEFAULT_AVATAR_URL } from "../utils/constants";
import type { HttpError } from "../utils/errors";
import { mapToContact } from "../utils/mappings";

const LOGIN_PASSWORD_ERROR = "Неверные логин или пароль";
const REGISTRATION_ERROR = "Во время регистрации произошла ошибка";

export async function ensureStore(): Promise<void> {
    let user: AuthMeResult | null = null;
    let chats: GetChatResultItem[] | null = null;

    return __AuthAPI
        .me()
        .then(async (userInfo: AuthMeResult) => {
            user = { ...userInfo, avatar: userInfo.avatar ?? DEFAULT_AVATAR_URL };

            return __ChatAPI.getChats();
        })
        .then((chatsInfo) => {
            chats = chatsInfo;

            Store.get().set({
                user,
                contacts: chats.map((chat) => {
                    return { ...mapToContact(chat) };
                }),
            });
        })
        .catch((err: unknown) => {
            if ((err as HttpError).code === 401) {
                if (window.location.pathname != "/signup") {
                    Router.get().go(ROUTES.login);
                }
            } else {
                Router.get().go(ROUTES.page500);
            }
        });
}

export async function login(userLogin: string, userPassword: string): Promise<void> {
    return __AuthAPI
        .login(userLogin, userPassword)
        .catch((err: unknown) => {
            const httpError = err as HttpError;

            if (httpError.code === HTTP_UNAUTHORIZED_ERROR) {
                ToastService.error(LOGIN_PASSWORD_ERROR);
            }

            throw err;
        })
        .then(async () => ensureStore())
        .then(() => {
            Router.get().go(ROUTES.chat);
        });
}

export async function logout(): Promise<void> {
    return __AuthAPI
        .logout()
        .then(() => {
            Router.get().go(ROUTES.login);
        })
        .catch(() => {
            ToastService.error();
        });
}

export async function signup(formData: SignupFormData): Promise<void> {
    return __AuthAPI
        .create(formData)
        .then(async () => ensureStore())
        .catch((err: unknown) => {
            ToastService.error(REGISTRATION_ERROR);

            throw err;
        })
        .then(() => {
            Router.get().go(ROUTES.chat);
        });
}
