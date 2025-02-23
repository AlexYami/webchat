import Handlebars from "handlebars";
import { createElement } from "../../utils/dom";
import BaseComponent from "./base";

export abstract class BaseWebComponent<TProps extends object> extends BaseComponent<HTMLElement, TProps> {
    public constructor(tagName: string, props: TProps) {
        super(tagName, props);
    }

    protected override applyRender(root: HTMLElement, rendered: string): void {
        this.root.innerHTML = rendered;
    }

    protected override createRootElement(tagName: string): HTMLElement {
        return createElement(tagName);
    }
    // protected override render(): string {
    //     this.removeListeners();

    //     this.addListeners();

    //     return this.tagName;
    // }

    protected override handleRender(): void {
        this.removeListeners();

        const compiledTemplate = this.compile();

        // if (this.root.children.length === 0) {
        //     this.root.appendChild(block);
        // } else {
        //     this.root.replaceChildren(block);
        // }

        this.root.classList.add(...compiledTemplate.classList);
        // this.root.replaceChildren(...compiledTemplate.children);

        this.root.append(...compiledTemplate.content.childNodes);

        // document.body.appendChild(this.root);

        this.addListeners();
    }

    private removeListeners(): void {}
    private addListeners(): void {}

    protected compile(): HTMLTemplateElement {
        const template = Handlebars.compile(this.render());

        const tmpEl = document.createElement("div");

        tmpEl.innerHTML = template(this.prepareTemplateProps({ ...this.props }));

        return tmpEl.children[0] as HTMLTemplateElement;
    }

    protected prepareTemplateProps(props: object): object {
        return props;
    }

    public getContent(): HTMLElement {
        return this.root;
    }
}
