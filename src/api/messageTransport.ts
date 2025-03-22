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

                socket.addEventListener("close", (event) => {
                    activeConnections.delete(getKey(userId, chatId));
                });

                socket.addEventListener("message", (event) => {
                    // debugger;
                    const messages = JSON.parse(event.data);

                    if (Array.isArray(messages)) {
                        window.store.set({
                            messages,
                        });
                    } else if (messages.type === "user connected") {
                    } else if (messages.type === "message") {
                        const existingMessages = window.store.getState().messages;

                        window.store.set({
                            messages: [...existingMessages, messages],
                        });
                    }
                });
            });
        }
    });
}

export function sendMessage(userId: number, chatId: number, message: string) {
    void ensureConnection(userId, chatId).then((connection) => {
        connection.send(
            JSON.stringify({
                content: message,
                type: "message",
            })
        );
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
