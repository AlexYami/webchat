import { BaseSettings, Button } from "../../components";
import type { BaseSettingsProps } from "../../components/baseSettings/baseSettings";
import { InputSettings } from "../../components/input";
import { SettingsService } from "../../services";
import type { State } from "../../store";
import { connect } from "../../utils/connect";
import { mapStateToSettings } from "../../utils/mappings";
import { EMAIL_REGEX, LOGIN_REGEX, NAME_REGEX, PHONE_REGEX } from "../../utils/validations";

export interface SettingsEditFormData {
    display_name: string;
    email: string;
    first_name: string;
    login: string;
    phone: string;
    second_name: string;
}

interface SettingsEditProps extends BaseSettingsProps {
    email: string;
    login: string;
    lastName: string;
    firstName: string;
    displayName: string;
    phone: string;
}

class SettingsEdit extends BaseSettings {
    public constructor(props: SettingsEditProps) {
        super({
            ...props,
            children: {
                ButtonSave: new Button({ text: "Сохранить", role: "primary" }),
                InputEmail: new InputSettings({
                    label: "Почта",
                    name: "email",
                    type: "email",
                    value: props.email,
                    placeholder: "Введите почту",
                    errorMessage: "Неправильный адрес электронной почты",
                    validationRegex: EMAIL_REGEX,
                }),

                InputLogin: new InputSettings({
                    label: "Логин",
                    value: props.login,
                    name: "login",
                    type: "text",
                    placeholder: "Введите логин",
                    validationRegex: LOGIN_REGEX,
                }),

                InputName: new InputSettings({
                    label: "Имя",
                    value: props.firstName,
                    name: "first_name",
                    type: "text",
                    placeholder: "Введите имя",
                    validationRegex: NAME_REGEX,
                }),

                InputSecondName: new InputSettings({
                    label: "Фамилия",
                    value: props.lastName,
                    name: "second_name",
                    type: "text",
                    placeholder: "Введите фамилию",
                    validationRegex: NAME_REGEX,
                }),

                InputDisplayName: new InputSettings({
                    label: "Имя в чате",
                    value: props.displayName,
                    name: "display_name",
                    type: "text",
                    placeholder: "Введите имя в чате",
                }),

                InputPhone: new InputSettings({
                    label: "Телефон",
                    value: props.phone,
                    name: "phone",
                    type: "text",
                    placeholder: "Введите телефон",
                    validationRegex: PHONE_REGEX,
                    errorMessage: "Неправильный телефон",
                }),
            },
            onFormSubmit: (formData: Record<string, unknown>) => {
                void SettingsService.update(formData as unknown as SettingsEditFormData);
            },
        });
    }

    protected renderContent(): string {
        return `{{{ ButtonSave }}}`;
    }

    protected renderInputs(): string {
        return `
            {{{ InputEmail }}}
            {{{ InputLogin }}}
            {{{ InputName }}}
            {{{ InputSecondName }}}
            {{{ InputDisplayName }}}
            {{{ InputPhone }}}
        `;
    }
}

const mapStateToProps = (state: State): Record<string, unknown> => {
    return mapStateToSettings(state.user!);
};

export default connect<SettingsEditProps>(mapStateToProps)(SettingsEdit);
