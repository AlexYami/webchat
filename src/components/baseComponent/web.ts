import Handlebars from "handlebars";
import { createElement } from "../../utils/dom";
import BaseComponent from "./base";

export class BaseWebComponent<TProps extends object> extends BaseComponent<HTMLElement, TProps> {
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

        debugger;

        const compiledTemplate = this.compile();

        // if (this.root.children.length === 0) {
        //     this.root.appendChild(block);
        // } else {
        //     this.root.replaceChildren(block);
        // }

        this.root.classList.add(...compiledTemplate.classList);
        // this.root.replaceChildren(...compiledTemplate.children);

        this.root.append(...compiledTemplate.content.childNodes);

        document.body.appendChild(this.root);

        this.addListeners();
    }

    private removeListeners(): void {}
    private addListeners(): void {}

    private compile(): HTMLTemplateElement {
        const template = Handlebars.compile(this.render());

        const tmpEl = document.createElement("div");

        tmpEl.innerHTML = template(this.props);

        return tmpEl.children[0] as HTMLTemplateElement;
    }
}
