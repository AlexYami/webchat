import { __UserAPI } from "../../api/auth/user";
import { Button } from "../../components";
import { InputProfile } from "../../components/input";
import BaseProfile from "../../components/profile/profile";
import { connect } from "../../utils/connect";
import { EMAIL_REGEX, LOGIN_REGEX, NAME_REGEX, PHONE_REGEX } from "../../utils/validations";

// const InputEmail = new InputProfile({
//     label: "Почта",
//     name: "email",
//     type: "email",
//     value: "pochta@yandex.ru",
//     placeholder: "Введите почту",
//     errorMessage: "Неправильный адрес электронной почты",
//     validationRegex: EMAIL_REGEX,
// });

// const InputLogin = new InputProfile({
//     label: "Логин",
//     value: "ivanivanov",
//     name: "login",
//     type: "text",
//     placeholder: "Введите логин",
//     validationRegex: LOGIN_REGEX,
// });

// const InputName = new InputProfile({
//     label: "Имя",
//     value: "Иван",
//     name: "first_name",
//     type: "text",
//     placeholder: "Введите имя",
//     validationRegex: NAME_REGEX,
// });

// const InputSecondName = new InputProfile({
//     label: "Фамилия",
//     value: "Иванов",
//     name: "second_name",
//     type: "text",
//     placeholder: "Введите фамилию",
//     validationRegex: NAME_REGEX,
// });

// const InputDisplayName = new InputProfile({
//     label: "Имя в чате",
//     value: "Иван",
//     name: "display_name",
//     type: "text",
//     placeholder: "Введите имя в чате",
// });

// const InputPhone = new InputProfile({
//     label: "Телефон",
//     value: "+7(909)967-30-30",
//     name: "phone",
//     type: "text",
//     placeholder: "Введите телефон",
//     validationRegex: PHONE_REGEX,
//     errorMessage: "Неправильный телефон",
// });

class ChangeProfilePage extends BaseProfile {
    public constructor(props) {
        super({
            image: "https://placehold.co/130x130/orange/white",
            title: "Иван",
            children: {
                ButtonSave: new Button({ text: "Сохранить", role: "primary" }),

                InputEmail: new InputProfile({
                    label: "Почта",
                    name: "email",
                    type: "email",
                    value: props.email,
                    placeholder: "Введите почту",
                    errorMessage: "Неправильный адрес электронной почты",
                    validationRegex: EMAIL_REGEX,
                }),

                InputLogin: new InputProfile({
                    label: "Логин",
                    value: props.login,
                    name: "login",
                    type: "text",
                    placeholder: "Введите логин",
                    validationRegex: LOGIN_REGEX,
                }),

                InputName: new InputProfile({
                    label: "Имя",
                    value: props.firstName,
                    name: "first_name",
                    type: "text",
                    placeholder: "Введите имя",
                    validationRegex: NAME_REGEX,
                }),

                InputSecondName: new InputProfile({
                    label: "Фамилия",
                    value: props.lastName,
                    name: "second_name",
                    type: "text",
                    placeholder: "Введите фамилию",
                    validationRegex: NAME_REGEX,
                }),

                InputDisplayName: new InputProfile({
                    label: "Имя в чате",
                    value: props.displayName,
                    name: "display_name",
                    type: "text",
                    placeholder: "Введите имя в чате",
                }),
                InputPhone: new InputProfile({
                    label: "Телефон",
                    value: props.phone,
                    name: "phone",
                    type: "text",
                    placeholder: "Введите телефон",
                    validationRegex: PHONE_REGEX,
                    errorMessage: "Неправильный телефон",
                }),
            },
            onFormSubmit: () => {
                const profile = this.getValues();

                __UserAPI.updateUser(profile).then((user) => {
                    window.store.set({
                        user,
                    });
                });
            },
        });
    }

    protected override renderContent(): string {
        return `{{{ ButtonSave }}}`;
    }

    protected override renderInputs(): string {
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

const mapStateToProps = (state) => {
    return {
        email: state.user.email,
        login: state.user.login,
        firstName: state.user.first_name,
        lastName: state.user.second_name,
        displayName: state.user.display_name,
        phone: state.user.phone,
    };
};

export default connect(mapStateToProps)(ChangeProfilePage);
