import type { BaseProps, WebComponent } from "../components/baseComponent/web";
import type { RouteInterface } from "./router";

class Route implements RouteInterface {
    private path: string;
    private page: WebComponent<BaseProps> | null;
    private readonly props: Record<string, unknown>;
    private readonly ctor: ObjectConstructor;
    private readonly selector: string;

    // eslint-disable-next-line @typescript-eslint/max-params
    public constructor(pathname: string, selector: string, ctor: ObjectConstructor, props: Record<string, unknown>) {
        this.path = pathname;
        this.ctor = ctor;
        this.page = null;
        this.props = props;
        this.selector = selector;
    }

    public navigate(path: string): void {
        if (this.match(path)) {
            this.path = path;
            this.render();
        }
    }

    public leave(): void {
        if (this.page) {
            // this._block.hide();
        }
    }

    public match(pathname: string): boolean {
        return pathname === this.path;
    }

    protected renderDom(selector: string, block: WebComponent<BaseProps>): void {
        const root = document.querySelector(selector);

        if (!root) return;

        root.innerHTML = "";

        root.append(block.getContent());
    }

    public render(): void {
        if (!this.page) {
            this.page = new this.ctor({}) as WebComponent<BaseProps>;
        }

        // this._block.show();

        this.renderDom(this.selector, this.page);

        // this.page.componentDidMount();
    }
}

export default Route;
