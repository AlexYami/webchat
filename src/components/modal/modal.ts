import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
import { AddUserForm, type AddUserFormProps } from "./addUserForm";
import { DeleteUserForm, type DeleteUserFormProps } from "./deleteUserForm";

export interface SearchUserFormData {
    login: string;
}

interface ModalProps extends BaseProps {}

export abstract class BaseModal extends WebComponent<ModalProps> {
    public constructor(props: ModalProps) {
        super("div", {
            ...props,
            children: {
                ...props.children,
            },
        });
    }
    protected override render(): string {
        return `<template class="modal">
                    <div class="modal__bg"></div>
                    <div class="modal__content">
                        ${this.renderContent()}
                    </div>
                </template>`;
    }

    protected abstract renderContent(): string;
}

export class AddUserModalForm extends BaseModal {
    public constructor(props: AddUserFormProps) {
        super({
            children: {
                AddUserForm: new AddUserForm(props),
            },
        });
    }

    protected override renderContent(): string {
        return `{{{ AddUserForm }}}`;
    }
}

export class DeleteUserModalForm extends BaseModal {
    public constructor(props: DeleteUserFormProps) {
        super({
            children: {
                DeleteUserForm: new DeleteUserForm(props),
            },
        });
    }

    protected override renderContent(): string {
        return `{{{ DeleteUserForm }}}`;
    }
}
