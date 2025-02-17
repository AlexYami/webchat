import { EventBusNoHandlerForEventError } from "./errors";

export class EventBus {
    private handlers: Record<string, Function[]>;

    public constructor() {
        this.handlers = {};
    }

    public on(event: string, handler: Function): void {
        this.handlers[event] = this.handlers[event] ?? [];

        this.handlers[event].push(handler);
    }

    public off(event: string): void {
        this.guard(event);

        this.handlers[event] = [];
    }

    public emit(event: string, ...args: unknown[]): void {
        this.guard(event);

        for (const handler of this.handlers[event]) {
            handler.call(null, ...args);
        }
    }

    private guard(event: string): void {
        if (!this.handlers[event]) {
            throw new EventBusNoHandlerForEventError(event);
        }
    }
}
