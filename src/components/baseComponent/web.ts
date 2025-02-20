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
    protected override render(): string {
        return this.tagName;
    }
}

// interface ButtonProps {
//     text: string;
// }
// class Button extends BaseWebComponent<ButtonProps> {
//     public constructor(props: ButtonProps) {
//         super("tag", props);
//     }
// }

// export default BaseWebComponent;
