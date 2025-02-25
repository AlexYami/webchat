import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";

export interface PartialProps extends BaseProps {
    template: string;
    [key: string]: unknown;
}

export interface ComponentContainerProps extends BaseProps {
    Partial: PartialProps;
}

export class Partial extends WebComponent<PartialProps> {
    public constructor(props: PartialProps) {
        super("div", props);
    }
    protected override render(): string {
        return `<template>${this.props.template}</template>`;
    }
}
