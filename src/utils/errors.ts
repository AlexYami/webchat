export class EventBusNoHandlerForEventError extends Error {
    public readonly event: string;

    public constructor(event: string) {
        super(`EventBus. No handler for the '${event}' event`);

        this.event = event;
    }
}

export class BaseComponentRootIsEmptyError extends Error {
    public constructor() {
        super("BaseComponent. Root is empty");
    }
}

export class CreateComponentContructorNotFoundError extends Error {
    public constructor(componentName: string) {
        super(`CreateComponent. Contructor '${componentName}' is not found`);
    }
}

export class HttpError extends Error {
    public code: number;
    public statusText: string;

    public constructor(code: number, statusText: string) {
        super(`HttpError. Status code: '${code}'. Status text: '${statusText}'`);

        this.code = code;
        this.statusText = statusText;
    }
}
