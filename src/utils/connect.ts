import { StoreEvents } from "../store";
import isEqual from "./isEqual";

export function connect(mapStateToProps: Function) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
    return function (Component: any) {
        return class extends Component {
            private readonly onChangeStoreCallback: () => void;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            public constructor(props: any) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                const { store } = window as unknown as any;

                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                let state = mapStateToProps(store.getState());

                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                super({ ...props, ...state });

                this.onChangeStoreCallback = (): void => {
                    debugger;

                    // при обновлении получаем новое состояние
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    if (!isEqual(state, newState)) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        this.setProps({ ...newState });
                    }

                    // не забываем сохранить новое состояние
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    state = newState;
                };

                // подписываемся на событие
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }

            // componentWillUnmount() {
            // super.componentWillUnmount();
            // window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
            // }
        };
    };
}
