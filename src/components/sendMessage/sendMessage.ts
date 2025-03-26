import { sendMessage } from "../../api/messageTransport";
import type { State } from "../../store";
import { connect } from "../../utils/connect";
import { MESSAGE_REGEX } from "../../utils/validations";
import { BaseForm, type BaseFormProps } from "../form/form";
import { InputSendMessage } from "../input";

interface SendMessageProps extends BaseFormProps {
    userId?: number;
    chatId?: number;
}

export class SendMessage extends BaseForm<SendMessageProps> {
    public constructor(props: SendMessageProps) {
        super({
            ...props,
            children: {
                InputSend: new InputSendMessage({
                    label: "",
                    name: "message",
                    placeholder: "Сообщение...",
                    validationRegex: MESSAGE_REGEX,
                    value: "",
                }),
            },

            onFormSubmit: (formData: Record<string, string>) => {
                this.getInputs().forEach((input) => {
                    input.setProps({
                        value: "",
                    });
                });

                if (formData.message) {
                    sendMessage(props.userId!, this.props.chatId!, formData.message);
                }
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

const mapStateToProps = (state: State): Record<string, unknown> => {
    return {
        chatId: state.activeChat?.id,
        userId: state.user?.id,
    };
};

export default connect<SendMessageProps>(mapStateToProps)(SendMessage);
