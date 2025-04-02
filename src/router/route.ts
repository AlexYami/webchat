import type { BaseProps, WebComponent } from "../components/baseComponent/web";

class Route {
    private path: string;
    private page: WebComponent<BaseProps> | null;
    private readonly ctor: ObjectConstructor;
    private readonly selector: string;

    public constructor(pathname: string, selector: string, ctor: ObjectConstructor) {
        this.path = pathname;
        this.ctor = ctor;
        this.page = null;
        this.selector = selector;
    }

    public navigate(path: string): void {
        if (this.match(path)) {
            this.path = path;
            this.render();
        }
    }

    public leave(): void {}

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
        this.page ??= new this.ctor({}) as WebComponent<BaseProps>;

        this.renderDom(this.selector, this.page);
    }
}

export default Route;
