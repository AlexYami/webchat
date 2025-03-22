import { sendMessage } from "../../api/messageTransport";
import { MESSAGE_REGEX } from "../../utils/validations";
import type { BaseProps } from "../baseComponent/web";
import { BaseForm } from "../form/form";
import { InputSendMessage } from "../input";

// const InputSend = new InputSendMessage({
//     label: "",
//     name: "message",
//     placeholder: "Сообщение...",
//     validationRegex: MESSAGE_REGEX,
//     value: "",
// });

interface SendMessageProps extends BaseProps {}

export class SendMessage extends BaseForm<SendMessageProps> {
    public constructor(props) {
        super({
            ...props,
            // children: {
            //     InputSend,
            // },
            onFormSubmit: () => {
                // this.store.user

                // debugger;

                console.log(window.store.getState().user.id);
                console.log(this.props.chatId);
                console.log("send message form submit");

                const val = this.getValues();

                this.getInputs().forEach((input) => {
                    input.setProps({
                        value: "",
                    });
                });

                // debugger;

                sendMessage(window.store.getState().user.id, this.props.chatId, val.message);
            },
        });
    }

    protected override render(): string {
        // debugger;

        this.props.children.InputSend = new InputSendMessage({
            label: "",
            name: "message",
            placeholder: "Сообщение...",
            validationRegex: MESSAGE_REGEX,
            value: "",
        });

        window.SEND = this.props.children.InputSend;

        return `<template class="message-box__send-message">
                {{{ InputSend }}}
                <button class="button button--primary">→</button>
            </template>`;
    }
}
