import { BaseForm, type FormProps } from "../form/form";

interface ProfileProps extends FormProps {
    title: string;
    image: string;
}

export abstract class BaseProfile extends BaseForm {
    public constructor(props: ProfileProps) {
        super({ ...props, children: { ...props.children } } as FormProps);
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
                    ${this.renderInputs()}
                    ${this.renderContent()}
                </div>
            </template>
        `;
    }

    protected renderGoBackButton(): string {
        return `
            <div class="go-back">
                <button class="button button--primary">←</button>
            </div>`;
    }

    protected renderAvatar(): string {
        return `
            <div class="profile__avatar">
                <label for="upload-avatar">
                    <img src="{{image}}" alt="Загрузите аватар" />
                </label>
                <input type="file" id="upload-avatar" name="avatar" />
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
