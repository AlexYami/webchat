import Handlebars from "handlebars";
import { createElement } from "../../utils/dom";
import BaseComponent from "./base";

export interface BaseProps {
    children?: Record<string, WebComponent<object> | WebComponent<object>[]>;
    events?: Record<string, EventListener>;
}

export abstract class WebComponent<TProps extends BaseProps> extends BaseComponent<HTMLElement, TProps> {
    public constructor(tagName: string, props: TProps) {
        super(tagName, props);
    }

    protected override createRootElement(tagName: string): HTMLElement {
        return createElement(tagName);
    }

    protected override handleRender(): void {
        this.removeListeners();

        const compiledTemplate = this.compile();

        this.replaceChildren(compiledTemplate);

        this.root.className = "";
        this.root.classList.add(...compiledTemplate.classList);

        const attributes = [...compiledTemplate.attributes];

        for (const attr of attributes) {
            this.root.setAttribute(attr.name, attr.value);

            if (attr.name === "value") this.root.value = attr.value;
        }

        this.root.replaceChildren(...compiledTemplate.content.childNodes);

        this.addListeners();
    }

    protected replaceChildren(el: HTMLTemplateElement): void {
        const replaceDummyMarkup = (c: WebComponent<object>): void => {
            const dummy = el.content.querySelector(`[data-id="${c.id}"]`);

            dummy?.replaceWith(c.getContent());
        };

        if (this.props.children) {
            for (const component of Object.values(this.props.children)) {
                if (Array.isArray(component)) {
                    component.forEach(replaceDummyMarkup);
                } else {
                    replaceDummyMarkup(component);
                }
            }
        }
    }

    private removeListeners(): void {
        if (this.props.events) {
            for (const [eventName, handler] of Object.entries(this.props.events)) {
                this.root.removeEventListener(eventName, handler);
            }
        }
    }
    private addListeners(): void {
        if (this.props.events) {
            for (const [eventName, handler] of Object.entries(this.props.events)) {
                this.root.addEventListener(eventName, handler);
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
        const result: Record<string, unknown> = { ...props };

        const getDummyMarkup = (id: string): string => `<div data-id="${id}"></div>`;

        if (this.props.children) {
            for (const [key, component] of Object.entries(this.props.children)) {
                if (Array.isArray(component)) {
                    result[key] = component.map((c) => getDummyMarkup(c.id));
                } else {
                    result[key] = getDummyMarkup(component.id);
                }
            }
        }

        return result;
    }

    public getContent(): HTMLElement {
        return this.root;
    }
}
