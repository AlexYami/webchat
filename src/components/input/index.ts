import "./input.scss";

import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
import { InputField } from "../inputField";
import InputTemplate from "./input.hbs?raw";

export interface InputProps extends BaseProps {
    errorMessage?: string;
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    isValid?: boolean;
    validationRegex?: RegExp;
    value: string;
}

export class Input extends WebComponent<InputProps> {
    public constructor(props: InputProps) {
        super("div", {
            ...props,
            ...{
                isValid: props.isValid ?? true,
            },
            children: {
                ...props.children,
                Input: new InputField({
                    ...props,
                    events: {
                        blur: (e: Event): void => {
                            const inputEl = e.target as HTMLInputElement;

                            const value = inputEl.value || "";

                            this.setProps({
                                value,
                                isValid: this.validate(value, true),
                            });
                        },
                    },
                }),
            },
        });
    }

    protected override render(): string {
        return InputTemplate;
    }

    public IsValid(): boolean {
        return !!this.props.isValid;
    }

    public validate(value?: string, silent: boolean = false): boolean {
        value ??= this.props.value;

        const regex = this.props.validationRegex;

        if (regex) {
            const isValid = regex.test(value);

            if (!silent) this.setProps({ isValid });

            return isValid;
        }

        return true;
    }

    public getKeyValue(): [string, string] {
        return [this.props.name, this.props.value];
    }
}

export class InputProfile extends Input {
    protected override render(): string {
        return `
        <template class="profile__layout-item">
            <div title="{{ errorMessage }}"
                class="profile__layout-item-key  {{#unless isValid}}profile__layout-item-key--invalid{{/unless}}">{{label}}
            </div>
            <div class="profile__layout-item-value">
                {{{Input}}}
            </div>
        </template>
        `;
    }
}

export class InputSendMessage extends Input {
    protected override render(): string {
        return `<template class="message-box__send-message-input {{#unless isValid}}message-box__send-message-input--invalid{{/unless}}">{{{Input}}}</template>`;
    }
}

export class InputSearch extends Input {
    protected override render(): string {
        return `<template class="searchbox-input">{{{Input}}}</template>`;
    }
}
