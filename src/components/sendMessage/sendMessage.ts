import { MESSAGE_REGEX } from "../../utils/validations";
import type { BaseProps } from "../baseComponent/web";
import { BaseForm } from "../form/form";
import { InputSendMessage } from "../input";

const InputSend = new InputSendMessage({
    label: "",
    name: "message",
    placeholder: "Сообщение...",
    validationRegex: MESSAGE_REGEX,
    value: "",
});

interface SendMessageProps extends BaseProps {}

export class SendMessage extends BaseForm<SendMessageProps> {
    public constructor() {
        super({
            children: {
                InputSend,
            },
        });
    }

    protected override render(): string {
        return `<template class="message-box__send-message">
                {{{ InputSend }}}
                <button class="button button--primary">→</button>
            </template>`;
    }
}
