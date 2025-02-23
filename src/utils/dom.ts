import type { BaseWebComponent } from "../components/baseComponent/web";

export function createElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
}

export function renderDOM(block: BaseWebComponent<object>): void {
    const root = document.querySelector("#app");

    root!.innerHTML = "";
    root!.appendChild(block.getContent());
}

// export function render(query: string, block) {
//     const root = document.querySelector(query);

//     root.appendChild(block.getContent());

//     block.dispatchComponentDidMount();

//     return root;
// }
