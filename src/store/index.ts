import { EventBus } from "../utils/eventBus";

export enum StoreEvents {
    Updated = "Updated",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type State = any;

export class Store extends EventBus {
    private state: State = {};

    private constructor(defaultState: {}) {
        super();

        this.on(StoreEvents.Updated, () => {
            console.log("store updated");
        });
        this.state = defaultState;
        this.set(defaultState);
    }

    public getState(): State {
        return this.state;
    }

    public set(nextState: State): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const prevState = { ...this.state };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.state = { ...this.state, ...nextState };

        this.emit(StoreEvents.Updated, prevState, nextState);
    }
}
