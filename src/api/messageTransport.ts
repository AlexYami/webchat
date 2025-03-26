import { Store } from "../store";
import { WS_URL } from "../utils/constants";
import { __ChatAPI } from "./chat";

type MessageResponse = Record<string, unknown>[] | { type: string };

const activeConnections = new Map<string, WebSocket>();

function getKey(userId: number, chatId: number): string {
    return `${userId}-${chatId}`;
}

function getConnection(userId: number, chatId: number): WebSocket | null {
    const connection = activeConnections.get(getKey(userId, chatId));

    return connection ?? null;
}

async function ensureConnection(userId: number, chatId: number): Promise<WebSocket> {
    return new Promise((resolve) => {
        const connection = getConnection(userId, chatId);

        if (connection) {
            resolve(connection);
        } else {
            void __ChatAPI.getToken(chatId).then(({ token }) => {
                const socket = new WebSocket(`${WS_URL}/${userId}/${chatId}/${token}`);

                activeConnections.set(getKey(userId, chatId), socket);

                socket.addEventListener("open", () => {
                    resolve(socket);
                });

                socket.addEventListener("close", () => {
                    activeConnections.delete(getKey(userId, chatId));
                });

                socket.addEventListener("message", (event: MessageEvent) => {
                    const result = JSON.parse(String(event.data)) as MessageResponse;

                    if (Array.isArray(result)) {
                        Store.get().set({
                            messages: result,
                        });
                    } else if (result.type === "user connected") {
                    } else if (result.type === "message") {
                        const existingMessages = Store.get().getState().messages ?? [];

                        Store.get().set({
                            messages: [...existingMessages, result],
                        });
                    }
                });
            });
        }
    });
}

export function sendMessage(userId: number, chatId: number, message: string): void {
    void ensureConnection(userId, chatId).then((connection) => {
        connection.send(
            JSON.stringify({
                content: message,
                type: "message",
            })
        );
    });
}

export function getMessages(userId: number, chatId: number): void {
    void ensureConnection(userId, chatId).then((connection) => {
        connection.send(
            JSON.stringify({
                content: "0",
                type: "get old",
            })
        );
    });
}
