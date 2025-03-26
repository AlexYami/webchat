import { EventBus } from "../utils/eventBus";

export enum StoreEvents {
    Updated = "Updated",
}

export interface UserState {
    avatar?: string;
    display_name: string;
    email: string;
    first_name: string;
    id: number;
    login: string;
    phone: string;
    second_name: string;
}

export interface ActiveChatState {
    image: string;
    id: number;
    name: string;
}

export interface State {
    user?: UserState | null;
    contacts?: Record<string, unknown>[] | null;
    messages?: Record<string, unknown>[] | null;
    activeChat?: ActiveChatState | null;
}

export class Store extends EventBus {
    private state: State = {};

    private constructor(defaultState: State) {
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
        const prevState = { ...this.state };

        this.state = { ...this.state, ...nextState };

        this.emit(StoreEvents.Updated, prevState, nextState);
    }

    private static instance: Store | null;

    public static create(defaultState: State): Store {
        Store.instance = new Store(defaultState);

        return Store.instance;
    }

    public static get(): Store {
        if (!Store.instance) throw new Error("Store does not exist");

        return Store.instance;
    }
}
