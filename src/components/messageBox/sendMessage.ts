import { MESSAGE_REGEX } from "../../utils/validations";
import { Form } from "../form";
import type { FormProps } from "../form/form";
import { InputSearch, InputSendMessage } from "../input";

const InputSend = new InputSendMessage({
    label: "",
    name: "message",
    placeholder: "Сообщение...",
    validationRegex: MESSAGE_REGEX,
    value: "",
});

export class SendMessage extends Form {
    public constructor(props: FormProps) {
        super(
            {
                ...props,
                children: {
                    ...props.children,
                    InputSend,
                },
            },
            [InputSend]
        );
    }

    protected override render(): string {
        return `<template class="message-box__send-message">
                {{{ InputSend }}}
                <button class="button button--primary">→</button>
            </template>`;
    }
}

const inputSearch = new InputSearch({
    label: "",
    name: "search",
    placeholder: "",
    value: "",
    type: "search",
});

interface SearchBoxProps extends FormProps {
    searchText: string;
}

export class SearchBox extends Form {
    public constructor(props: SearchBoxProps) {
        super(
            {
                ...props,
                children: {
                    ...props.children,
                    inputSearch,
                },
            },
            [inputSearch]
        );
    }

    protected override render(): string {
        return `
            <template>
                {{{ inputSearch }}}
                <img src="/images/search.svg" alt="Поиск" />
            </template>
        `;
    }
}
