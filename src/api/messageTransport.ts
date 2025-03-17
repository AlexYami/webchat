import { __ChatAPI } from "./auth/chat";

const activeConnections = new Map();

function getKey(userId: number, chatId: number) {
    return `${userId}-${chatId}`;
}

function getConnection(userId: number, chatId: number) {
    return activeConnections.get(getKey(userId, chatId));
}

async function ensureConnection(userId: number, chatId: number) {
    return new Promise((resolve) => {
        const connection = getConnection(userId, chatId);

        if (connection) {
            resolve(connection);
        } else {
            __ChatAPI.getToken(chatId).then((res) => {
                const { token } = JSON.parse(res);

                const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

                activeConnections.set(getKey(userId, chatId), socket);

                socket.addEventListener("open", () => {
                    resolve(socket);
                });

                socket.addEventListener("message", (event) => {
                    const messages = JSON.parse(event.data);

                    window.store.set({
                        messages: messages,
                    });
                });
            });
        }
    });
}

export function getMessages(userId: number, chatId: number, token: string) {
    console.log(activeConnections);

    void ensureConnection(userId, chatId).then((connection) => {
        connection.send(
            JSON.stringify({
                content: "0",
                type: "get old",
            })
        );
    });
}
