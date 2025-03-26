import { ToastService } from ".";
import { __UserAPI } from "../api/user";
import type { SettingsEditFormData } from "../pages/settingsEdit/settingsEdit";
import type { SettingsPasswordFormData } from "../pages/settingsPassword/settingsPassword";
import { Store } from "../store";

const USER_UPDATED_MESSAGE = "Информация о пользователе успешно обновлена";
const AVATAR_UPDATED_MESSAGE = "Аватар успешно обновлен";

export async function update(settings: SettingsEditFormData): Promise<void> {
    return __UserAPI
        .updateUser(settings)
        .catch(() => {
            ToastService.error();
        })
        .then((result) => {
            ToastService.info(USER_UPDATED_MESSAGE);

            if (result) {
                Store.get().set({
                    user: {
                        ...result,
                    },
                });
            }
        });
}

export async function updateAvatar(file: File): Promise<void> {
    const formData = new FormData();

    formData.append("avatar", file);

    return __UserAPI
        .uploadAvatar(formData)
        .then((user) => {
            ToastService.info(AVATAR_UPDATED_MESSAGE);

            Store.get().set({
                user,
            });
        })
        .catch(() => {
            ToastService.error();
        });
}
export async function changePassword(data: SettingsPasswordFormData): Promise<void> {
    return __UserAPI
        .changePassword(data)
        .then(() => {
            ToastService.info("Пароль успешно обновлён");
        })
        .catch(() => {
            ToastService.error();
        });
}
