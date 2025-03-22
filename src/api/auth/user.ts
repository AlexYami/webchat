import { HttpRequest } from "../../utils/ajax";

const baseUrl = "https://ya-praktikum.tech/api/v2/user";

function getEndpointUrl(targetUrl: string): string {
    return `${baseUrl}${targetUrl}`;
}

export default class UserApi {
    public async searchUser(login: string): Promise<string> {
        return HttpRequest.post(getEndpointUrl(`/search`), { login });
    }

    public async updateUser(data): Promise<string> {
        return HttpRequest.put(getEndpointUrl(`/profile`), data).then((res) => {
            return JSON.parse(res);
        });
    }

    public async uploadAvatar(data: string): Promise<string> {
        // return HttpRequest.put(getEndpointUrl(`/profile/avatar`), data, {
        //     "Content-Type" : "multipart/form-data"
        // }).then((res) => {
        //     return JSON.parse(res);
        // });

        const q = function updateAvatar() {
            var xhr = new XMLHttpRequest();

            // Добавляем файл изображения в formData

            // Открываем запрос с методом PUT
            xhr.open("PUT", "https://ya-praktikum.tech/api/v2/user/profile/avatar", true);

            xhr.withCredentials = true;

            // Обработчик события успешного ответа
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log("Avatar updated successfully");
                    console.log(xhr.responseText); // Ответ от сервера
                } else {
                    console.error("Failed to update avatar:", xhr.status, xhr.statusText);
                }
            };

            // Обработчик ошибки запроса
            xhr.onerror = function () {
                console.error("Request failed");
            };

            // Отправляем запрос с данными
            xhr.send(data);
        };

        q(data);
    }

    public async changePassword(data): Promise<string> {
        return HttpRequest.put(getEndpointUrl(`/password`), data);
    }
}

export const __UserAPI = new UserApi();
