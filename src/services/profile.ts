// import AuthApi from "../api/auth";
// import { ROUTER } from "../constants";

import { ToastService } from ".";
import { __UserAPI } from "../api/auth/user";

export async function update(profile: any) {
    return __UserAPI
        .updateUser(profile)
        .catch(() => {
            ToastService.error("Произошла неизвестная ошибка");
        })
        .then((user) => {
            ToastService.info("Информация о пользователе успешно обновлена");

            window.store.set({
                user,
            });
        });
}

export async function updateAvatar(file: File): Promise<void> {
    const formData = new FormData();

    formData.append("avatar", file);

    return __UserAPI
        .uploadAvatar(formData)
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
export async function changePassword(data: any) {
    return __UserAPI
        .changePassword(data)
        .then(() => {
            ToastService.info("Пароль успешно обновлён");
        })
        .catch(() => {
            ToastService.error("Произошла неизвестная ошибка");
        });
}
