export class EventBusNoHandlerForEventError extends Error {
    private readonly event: string;

    public constructor(event: string) {
        super(`EventBus. No handler for the '${event}' event`);

        this.event = event;
    }
}
