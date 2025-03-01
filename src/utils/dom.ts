import type { WebComponent } from "../components/baseComponent/web";

export function createElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
}

export function renderDOM(webComponent: WebComponent<object>): void {
    const root = document.querySelector("#app");

    root!.innerHTML = "";
    root!.appendChild(webComponent.getContent());
}
