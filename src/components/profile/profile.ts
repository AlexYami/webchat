import { __UserAPI } from "../../api/auth/user";
import { Router } from "../../router/router";
import { connect } from "../../utils/connect";
import type { BaseProps } from "../baseComponent/web";
import { Button } from "../button";
import { BaseForm } from "../form/form";
import { InputField } from "../inputField";

interface ProfileProps extends BaseProps {
    title: string;
    image: string;
}
abstract class BaseProfile extends BaseForm<ProfileProps> {
    public constructor(props: ProfileProps) {
        super({
            ...props,
            children: {
                ...props.children,
                AvatarUpload: new InputField({
                    name: "avatar",
                    type: "file",
                    placeholder: "",
                    value: "",
                    id: "upload-avatar",
                    events: {
                        change: (e) => {
                            debugger;

                            const input = e.target as HTMLInputElement;

                            if (input.files) {
                                const file = input.files[0];

                                if (file) {
                                    const formData = new FormData();
                                    formData.append("avatar", file);

                                    debugger;
                                    // __UserAPI.uploadAvatar({ avatar: formData });

                                    __UserAPI.uploadAvatar(formData);
                                }
                            }
                        },
                    },
                }),
                GoBackButton: new Button({
                    text: "←",
                    role: "primary",
                    events: {
                        click: () => {
                            Router.get().back();
                        },
                    },
                }),
            },
        });
        1;
    }

    protected override render(): string {
        debugger;

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
        return `
            <div class="profile__avatar">
                <label for="upload-avatar">
                    <img src="https://ya-praktikum.tech/api/v2/resources/{{image}}" alt="Загрузите аватар" />
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

// user;
// avatar;
// display_name;
// email;
// first_name;
// id;
// login;
// phone;
// second_name;

const mapStateToProps = (state) => {
    debugger;

    return {
        title: state.user.first_name,
        image:
            state.user.avatar || "/6a716089-32e6-40e9-a03f-3153e7ffbcf7/94524df9-0d8d-4a87-9613-8979c512bebe_vimeo.jpg",
    };
};

export default connect(mapStateToProps)(BaseProfile);
