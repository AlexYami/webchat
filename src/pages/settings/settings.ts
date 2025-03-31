import { Button } from "../../components";
import { BaseSettings } from "../../components/baseSettings";
import type { BaseSettingsProps } from "../../components/baseSettings/baseSettings";
import { InputSettings } from "../../components/input";
import { Router } from "../../router/router";
import { ROUTES } from "../../router/routes";
import { AuthService } from "../../services";
import type { State } from "../../store";
import { connect } from "../../utils/connect";
import { mapStateToSettings } from "../../utils/mappings";
import { EMAIL_REGEX, LOGIN_REGEX, NAME_REGEX, PHONE_REGEX } from "../../utils/validations";

interface SettingsProps extends BaseSettingsProps {
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    displayName: string;
    phone: string;
}

class Settings extends BaseSettings {
    public constructor(props: SettingsProps) {
        super({
            ...props,
            children: {
                ButtonChangeData: new Button({
                    text: "Изменить данные",
                    type: "button",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.editSettings);
                        },
                    },
                }),
                ButtonChangePassword: new Button({
                    text: "Изменить пароль",
                    type: "button",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.password);
                        },
                    },
                }),
                ButtonLogout: new Button({
                    text: "Выйти",
                    role: "danger",
                    type: "button",
                    events: {
                        click: (): void => {
                            void AuthService.logout();
                        },
                    },
                }),

                InputEmail: new InputSettings({
                    label: "Почта",
                    name: "email",
                    type: "email",
                    value: props.email,
                    placeholder: "Не задано",
                    errorMessage: "Неправильный адрес электронной почты",
                    validationRegex: EMAIL_REGEX,
                }),

                InputLogin: new InputSettings({
                    label: "Логин",
                    value: props.login,
                    name: "login",
                    type: "text",
                    placeholder: "Не задано",
                    validationRegex: LOGIN_REGEX,
                }),

                InputName: new InputSettings({
                    label: "Имя",
                    value: props.firstName,
                    name: "first_name",
                    type: "text",
                    placeholder: "Не задано",
                    validationRegex: NAME_REGEX,
                }),

                InputSecondName: new InputSettings({
                    label: "Фамилия",
                    value: props.lastName,
                    name: "second_name",
                    type: "text",
                    placeholder: "Не задано",
                    validationRegex: NAME_REGEX,
                }),

                InputDisplayName: new InputSettings({
                    label: "Имя в чате",
                    value: props.displayName,
                    name: "display_name",
                    type: "text",
                    placeholder: "Не задано",
                }),

                InputPhone: new InputSettings({
                    label: "Телефон",
                    value: props.phone,
                    name: "phone",
                    type: "text",
                    placeholder: "Не задано",
                    validationRegex: PHONE_REGEX,
                    errorMessage: "Неправильный телефон",
                }),
            },
        });
    }

    protected override renderContent(): string {
        return `
            <div class="profile__buttons">
                {{{ ButtonChangeData }}}
                {{{ ButtonChangePassword }}}
                {{{ ButtonLogout }}}
            </div>
        `;
    }

    protected override renderInputs(): string {
        return `
            <div class="profile__readonly">
            {{{ InputEmail }}}
            {{{ InputLogin }}}
            {{{ InputName }}}
            {{{ InputSecondName }}}
            {{{ InputDisplayName }}}
            {{{ InputPhone }}}
             </div>
        `;
    }
}

const mapStateToProps = (state: State): Record<string, unknown> => {
    return mapStateToSettings(state.user!);
};

export default connect<SettingsProps>(mapStateToProps)(Settings);
