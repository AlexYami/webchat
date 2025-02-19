import { createElement } from "../../utils/dom";
import BaseComponent from "./base";

export class BaseWebComponent<TProps extends object> extends BaseComponent<HTMLElement, TProps> {
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

export default BaseWebComponent;
