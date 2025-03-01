import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";

interface PopupProps extends BaseProps {}

export abstract class BasePopup extends WebComponent<PopupProps> {
    public constructor(props: PopupProps) {
        super("div", props);
    }
    protected override render(): string {
        return `<template class="popup">${this.renderContent()}</template>`;
    }

    protected abstract renderContent(): string;
}
