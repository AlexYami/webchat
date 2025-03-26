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

export class HttpError extends Error {
    public code: number;
    public statusText: string;
    public responseData: Record<string, string> | null = null;

    public constructor(code: number, statusText: string, responseText: string) {
        super(`HttpError. Status code: '${code}'. Status text: '${statusText}'`);

        this.code = code;
        this.statusText = statusText;

        try {
            this.responseData = JSON.parse(responseText) as Record<string, string>;
        } catch {}

        console.log(
            `%cHttpError with the ${this.code} code occured.`,
            "color: white; font-size: 14px; background-color: red; padding: 3px;"
        );
    }
}
