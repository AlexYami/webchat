import { BaseForm, type FormProps } from "../form/form";
import type { InputProfile } from "../input";

interface ProfileProps extends FormProps {
    title: string;
    image: string;
}

export abstract class BaseProfile extends BaseForm {
    public constructor(props: ProfileProps, inputs: InputProfile[]) {
        super({ ...props, children: { ...props.children, Inputs: inputs } } as FormProps, inputs);
    }

    protected override render(): string {
        return `
            <template>
                ${this.renderGoBackButton()}
                <div class="go-back-layout">
                    ${this.renderAvatar()}
                    ${this.renderName()}
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

    protected renderInputs(): string {
        return `
            <div class="profile__layout">
                {{#each Inputs}}
                {{{ this }}}
                {{/each}}
            </div>`;
    }

    protected abstract renderContent(): string;
}
