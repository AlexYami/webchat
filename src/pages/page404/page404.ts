import { WebComponent } from "../../components/baseComponent/web";
import { ErrorPageBase } from "../../components/error";

export class Page404 extends WebComponent<object> {
    public constructor() {
        super("div", {
            children: {
                Error: new ErrorPageBase({ title: "Ошибка 404", text: "Не туда попали 👀" }),
            },
        });
    }

    protected override render(): string {
        return `<template>{{{ Error }}}</template>`;
    }
}
