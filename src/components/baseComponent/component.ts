import { BaseWebComponent } from "./web";

export abstract class WebComponent<TProps extends object> extends BaseWebComponent<TProps> {
    private children: Record<string, BaseWebComponent<object>> | undefined;

    public constructor(tagName: string, props: TProps) {
        super(tagName, props);
    }

    private getChildren(): Record<string, BaseWebComponent<object>> {
        if (!this.children) this.children = this.getChildComponents();

        return this.children;
    }

    protected override prepareTemplateProps(props: object): object {
        debugger;

        const result: Record<string, unknown> = { ...props };

        for (const [key, component] of Object.entries(this.getChildren())) {
            result[key] = `<div data-id="${component.id}">keks</div>`;
        }

        return result;
    }

    protected override compile(): HTMLTemplateElement {
        debugger;
        const el = super.compile();

        debugger;

        for (const component of Object.values(this.getChildren())) {
            const dummy = el.content.querySelector(`[data-id="${component.id}"]`);

            dummy?.replaceWith(component.getContent());
        }

        return el;
    }

    protected abstract getChildComponents(): Record<string, BaseWebComponent<object>>;

    // getChildrenAndProps(propsWithChilren: TProps) {
    //     const children = {};
    //     let props: TProps;

    //     Object.entries(propsAndChildren).forEach(([key, value]) => {
    //         if (Array.isArray(value)) {
    //             value.forEach((obj) => {
    //                 if (obj instanceof Block) {
    //                     children[key] = value;
    //                 } else {
    //                     props[key] = value;
    //                 }
    //             });

    //             return;
    //         }
    //         if (value instanceof BaseWebComponent) {
    //             children[key] = value;
    //         } else {
    //             props[key] = value;
    //         }
    //     });

    //     return { children, props };
    // }
}
