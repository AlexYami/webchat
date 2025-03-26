import type { BaseProps, WebComponent } from "../components/baseComponent/web";
import { Store, StoreEvents, type State } from "../store";
import isEqual from "./isEqual";

export function connect<TProps extends BaseProps>(
    mapStateToProps: (state: State, props: TProps) => Record<string, unknown>
) {
    type ComponentType = new (props: TProps) => {
        setProps: (props: Partial<TProps> | null) => void;
    };

    return function (Component: ComponentType): new (props: TProps) => WebComponent<TProps> {
        // @ts-expect-error: A mixin class must have a constructor with a single rest parameter of type 'any[]'.
        return class extends Component {
            private readonly onChangeStoreCallback: () => void;

            public constructor(props: TProps) {
                const store = Store.get();

                let state = mapStateToProps(store.getState(), props);

                super({ ...props, ...state });

                this.onChangeStoreCallback = (): void => {
                    const newState = mapStateToProps(store.getState(), props);

                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState } as unknown as TProps);
                    }

                    state = newState;
                };

                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        };
    };
}
