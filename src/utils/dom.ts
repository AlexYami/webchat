import type { WebComponent } from "../components/baseComponent/web";

export function createElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
}

export function renderDOM(webComponent: WebComponent<object>): void {
    const root = document.querySelector("#app");

    root!.innerHTML = "";
    root!.appendChild(webComponent.getContent());
}

export function isClickInsidePopup(el: HTMLElement | null): boolean {
    while (el) {
        if (
            el.className === "popup" ||
            el.className === "modal__content" ||
            el.classList.contains("message-box__menu")
        ) {
            return true;
        }

        el = el.parentElement;
    }

    return false;
}
