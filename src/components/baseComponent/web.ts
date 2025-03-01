import Handlebars from "handlebars";
import { createElement } from "../../utils/dom";
import BaseComponent from "./base";

export interface BaseProps {
    children?: Record<string, BaseWebComponent<object> | BaseWebComponent<object>[]>;
    events?: Record<string, EventListener>;
}

export abstract class BaseWebComponent<TProps extends BaseProps> extends BaseComponent<HTMLElement, TProps> {
    public constructor(tagName: string, props: TProps) {
        super(tagName, props);
    }

    protected override createRootElement(tagName: string): HTMLElement {
        return createElement(tagName);
    }

    protected override handleRender(): void {
        this.removeListeners();

        const compiledTemplate = this.compile();

        this.root.className = "";
        this.root.classList.add(...compiledTemplate.classList);

        const attributes = [...compiledTemplate.attributes];

        for (const attr of attributes) {
            this.root.setAttribute(attr.name, attr.value);
        }

        this.root.replaceChildren(...compiledTemplate.content.childNodes);

        this.addListeners();
    }

    private removeListeners(): void {}
    private addListeners(): void {
        if (this.props.events) {
            for (const [eventName, handler] of Object.entries(this.props.events)) {
                this.root.addEventListener(eventName, handler.bind(this));
            }
        }
    }

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
