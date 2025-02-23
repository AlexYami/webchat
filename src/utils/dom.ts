import type { BaseWebComponent } from "../components/baseComponent/web";

export function createElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
}

export function renderDOM(webComponent: BaseWebComponent<object>): void {
    const root = document.querySelector("#app");

    root!.innerHTML = "";
    root!.appendChild(webComponent.getContent());
}
