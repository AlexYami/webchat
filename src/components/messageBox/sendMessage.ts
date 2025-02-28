import { MESSAGE_REGEX } from "../../utils/validations";
import type { BaseProps } from "../baseComponent/web";
import { Form } from "../form";
import type { FormProps } from "../form/form";
import { InputSendMessage } from "../input";
import type { MessageProps } from "../message/message";

interface MessageBoxProps extends BaseProps {
    messages: MessageProps[];
    showAddUserPopup?: boolean;
}

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
                Partial: {
                    template: "",
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
