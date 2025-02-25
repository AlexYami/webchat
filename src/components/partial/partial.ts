import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";

export interface PartialProps extends BaseProps {
    partial: string;
    [key: string]: unknown;
}

export class Partial extends WebComponent<PartialProps> {
    public constructor(props: PartialProps) {
        super("div", props);
    }
    protected override render(): string {
        return `<template>${this.props.partial}</template>`;
    }
}
