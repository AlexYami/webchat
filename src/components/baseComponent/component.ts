import { BaseWebComponent, type BaseProps } from "./web";

export abstract class WebComponent<TProps extends BaseProps> extends BaseWebComponent<TProps> {
    private readonly children: Record<string, BaseWebComponent<object>> | undefined;

    public constructor(tagName: string, props: TProps) {
        super(tagName, props);
    }

    // private getChildren(): Record<string, BaseWebComponent<object>> {
    //     if (!this.children) this.children = this.getChildComponents();

    //     return this.children;
    // }

    protected override prepareTemplateProps(props: object): object {
        debugger;

        const result: Record<string, unknown> = { ...props };

        if (this.props.children) {
            for (const [key, component] of Object.entries(this.props.children)) {
                result[key] = `<div data-id="${component.id}">keks</div>`;
            }
        }

        return result;
    }

    protected override compile(): HTMLTemplateElement {
        debugger;
        const el = super.compile();

        debugger;

        if (this.props.children) {
            for (const component of Object.values(this.props.children)) {
                const dummy = el.content.querySelector(`[data-id="${component.id}"]`);

                dummy?.replaceWith(component.getContent());
            }
        }

        return el;
    }

    // protected abstract getChildComponents(): Record<string, BaseWebComponent<object>>;

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
