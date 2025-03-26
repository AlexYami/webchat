import { BaseSettings, Button } from "../../components";
import type { BaseSettingsProps } from "../../components/baseSettings/baseSettings";
import { InputSettings } from "../../components/input";
import { SettingsService } from "../../services";
import type { State } from "../../store";
import { connect } from "../../utils/connect";
import { mapStateToSettings } from "../../utils/mappings";
import { PASSWORD_REGEX } from "../../utils/validations";

const InputOldPassword = new InputSettings({
    label: "Старый пароль",
    value: "",
    name: "oldPassword",
    type: "password",
    placeholder: "Введите старый пароль",
    errorMessage: "Введите более сложный пароль",
    validationRegex: PASSWORD_REGEX,
});

const InputNewPassword = new InputSettings({
    label: "Новый пароль",
    value: "",
    name: "newPassword",
    type: "password",
    placeholder: "Введите новый пароль",
    errorMessage: "Введите более сложный пароль",
    validationRegex: PASSWORD_REGEX,
});

const InputNewPassword2 = new InputSettings({
    label: "Повторите новый пароль",
    value: "",
    name: "newPassword2",
    type: "password",
    placeholder: "Повторите новый пароль",
    errorMessage: "Введите более сложный пароль",
    validationRegex: PASSWORD_REGEX,
});

export interface SettingsPasswordFormData {
    newPassword: string;
    newPassword2: string;
    oldPassword: string;
}

class SettingsPassword extends BaseSettings {
    public constructor(props: BaseSettingsProps) {
        super({
            ...props,
            children: {
                ButtonSave: new Button({
                    text: "Сохранить",
                    role: "primary",
                }),
                InputOldPassword,
                InputNewPassword,
                InputNewPassword2,
            },
            onFormSubmit: (formData: Record<string, unknown>) => {
                void SettingsService.changePassword(formData as unknown as SettingsPasswordFormData);
            },
        });
    }

    protected renderContent(): string {
        return `{{{ ButtonSave }}}`;
    }

    protected renderInputs(): string {
        return `
            {{{ InputOldPassword }}}
            {{{ InputNewPassword }}}
            {{{ InputNewPassword2 }}}
        `;
    }
}

const mapStateToProps = (state: State): Record<string, unknown> => {
    return mapStateToSettings(state.user!);
};

export default connect<BaseSettingsProps>(mapStateToProps)(SettingsPassword);
