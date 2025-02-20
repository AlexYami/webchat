import { BaseComponentRootIsEmptyError } from "../../utils/errors";
import { EventBus } from "../../utils/eventBus";

const EVENTS = {
    INIT: "init",
    COMPONENT_DID_UPDATE: "component-did-update",
    COMPONENT_DID_MOUNT: "component-did-mount",
    RENDER: "render",
};

export abstract class BaseComponent<TRootElement, TProps extends object> {
    public readonly tagName: string;

    private _root: TRootElement | null = null;
    private readonly eventBus: EventBus;
    private readonly props: TProps;
    private updateTimeout: number | null = null;

    protected constructor(tagName: string, props: TProps) {
        this.tagName = tagName;
        this.eventBus = new EventBus();

        this.registerEvents(this.eventBus);
        this.props = this.createProxy(props);

        this.eventBus.emit(EVENTS.INIT);
    }

    private createProxy(props: TProps): TProps {
        const that = this;

        const handler = {
            get(target: TProps, prop: keyof TProps): TProps[keyof TProps] {
                return target[prop];
            },
            set(target: TProps, prop: keyof TProps, value: TProps[keyof TProps]): boolean {
                target[prop] = value;

                that.eventBus.emit(EVENTS.COMPONENT_DID_UPDATE, { ...target });

                return true;
            },
        };

        return new Proxy(props, handler as ProxyHandler<object>) as TProps;
    }

    public setProps(props: Partial<TProps | null>): void {
        if (!props) return;

        Object.assign(this.props, props);
    }

    protected get root(): TRootElement {
        if (!this._root) throw new BaseComponentRootIsEmptyError();

        return this._root;
    }

    private registerEvents(eventBus: EventBus): void {
        eventBus.on(EVENTS.INIT, () => {
            this.handleInit();
        });

        eventBus.on(EVENTS.COMPONENT_DID_UPDATE, () => {
            this.handleComponentDidUpdate();
        });

        eventBus.on(EVENTS.COMPONENT_DID_MOUNT, () => {
            this.handleComponentDidMount();
        });

        eventBus.on(EVENTS.RENDER, () => {
            this.handleRender();
        });
    }
    protected handleInit(): void {
        this.createResources();

        this.eventBus.emit(EVENTS.COMPONENT_DID_MOUNT);
    }

    protected handleComponentDidUpdate(): void {
        if (!this.updateTimeout) {
            this.updateTimeout = setTimeout(() => {
                this.eventBus.emit(EVENTS.COMPONENT_DID_MOUNT);

                this.updateTimeout = null;
            }) as unknown as number;
        }
    }

    protected handleComponentDidMount(): void {
        this.eventBus.emit(EVENTS.RENDER);
    }

    protected handleRender(): void {
        const rendered = this.render();

        this.applyRender(this.root, rendered);
    }

    protected abstract applyRender(root: TRootElement, rendered: string): void;

    protected createResources(): void {
        this._root = this.createRootElement(this.tagName);
    }

    protected abstract createRootElement(tagName: string): TRootElement;

    protected abstract render(): string;
}

export default BaseComponent;
