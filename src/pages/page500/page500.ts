import { WebComponent } from "../../components/baseComponent/component";
import { ErrorPageBase } from "../../components/error";

export class Page500 extends WebComponent<object> {
    public constructor() {
        super("div", {
            children: {
                Error: new ErrorPageBase({ title: "Ошибка 500", text: "Уже фиксим 🚧" }),
            },
        });
    }

    protected override render(): string {
        return `<template>{{{ Error }}}</template>`;
    }
}
