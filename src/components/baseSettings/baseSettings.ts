import { Router } from "../../router/router";
import { SettingsService } from "../../services";
import { BASE_API_URL, DEFAULT_AVATAR_URL } from "../../utils/constants";
import type { BaseProps } from "../baseComponent/web";
import { Button } from "../button";
import { BaseForm } from "../form/form";
import { InputField } from "../inputField";

export interface BaseSettingsProps extends BaseProps {
    title?: string;
    image?: string;
    onFormSubmit: (formData: Record<string, string>) => void;
}
export abstract class BaseSettings extends BaseForm<BaseSettingsProps> {
    public constructor(props: BaseSettingsProps) {
        super({
            ...props,
            children: {
                ...props.children,
                AvatarUpload: new InputField({
                    name: "avatar",
                    type: "file",
                    accept: "image/png, image/jpeg",
                    placeholder: "",
                    value: "",
                    id: "upload-avatar",
                    events: {
                        change: (e): void => {
                            const input = e.target as HTMLInputElement;

                            if (input.files) {
                                const [file] = input.files;

                                if (file) {
                                    void SettingsService.updateAvatar(file);
                                }
                            }
                        },
                    },
                }),
                GoBackButton: new Button({
                    text: "←",
                    type: "button",
                    role: "primary",
                    events: {
                        click: (): void => {
                            Router.get().back();
                        },
                    },
                }),
            },
        });
    }

    protected override render(): string {
        return `
            <template>
                ${this.renderGoBackButton()}
                <div class="go-back-layout">
                    ${this.renderAvatar()}
                    ${this.renderName()}
                    <div class="profile__layout">
                        ${this.renderInputs()}
                    </div>
                    ${this.renderContent()}
                </div>
            </template>
        `;
    }

    protected renderGoBackButton(): string {
        return `
            <div class="go-back">
                {{{ GoBackButton }}}
            </div>`;
    }

    protected renderAvatar(): string {
        if (!this.props.image) {
            this.props.image = DEFAULT_AVATAR_URL;
        }

        return `
            <div class="profile__avatar">
                <label for="upload-avatar">
                    <img src="${BASE_API_URL}/resources/{{image}}" alt="Загрузите аватар" />
                </label>
                {{{ AvatarUpload }}}
            </div>`;
    }

    protected renderName(): string {
        return `
            <h1 class="profile__name">
                {{title}}
            </h1>`;
    }

    protected abstract renderInputs(): string;
    protected abstract renderContent(): string;
}
