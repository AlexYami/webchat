import { BaseWebComponent, type BaseProps } from "./web";

export abstract class WebComponent<TProps extends BaseProps> extends BaseWebComponent<TProps> {
    public constructor(tagName: string, props: TProps) {
        super(tagName, props);
    }

    protected override prepareTemplateProps(props: object): object {
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

    protected override compile(): HTMLTemplateElement {
        const el = super.compile();

        const replaceDummyMarkup = (c: BaseWebComponent<object>): void => {
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

        return el;
    }
}
