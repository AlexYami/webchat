import { __AuthAPI } from "../../api/auth/auth";
import { Button } from "../../components";
import { InputProfile } from "../../components/input";
import BaseProfile from "../../components/profile/profile";
import { Router } from "../../router/router";
import { ROUTES } from "../../router/routes";
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

class ProfilePage extends BaseProfile {
    public constructor(props) {
        super({
            title: "Вадим",
            image: props.avatar ?? "https://placehold.co/130x130/orange/white",
            children: {
                ButtonChangeData: new Button({
                    text: "Изменить данные",
                    type: "button",
                    events: {
                        click: () => {
                            Router.get().go(ROUTES.changeProfile);
                        },
                    },
                }),
                ButtonChangePassword: new Button({
                    text: "Изменить пароль",
                    type: "button",
                    events: {
                        click: () => {
                            Router.get().go(ROUTES.changePassword);
                        },
                    },
                }),
                ButtonLogout: new Button({
                    text: "Выйти",
                    role: "danger",
                    type: "button",
                    events: {
                        click: async () => {
                            __AuthAPI.logout()
                            .then(() => {
                                Router.get().go(ROUTES.login)
                            })
                        },
                    },
                }),

                InputEmail: new InputProfile({
                    label: "Почта",
                    name: "email",
                    type: "email",
                    value: props.email,
                    placeholder: "Не задано",
                    errorMessage: "Неправильный адрес электронной почты",
                    validationRegex: EMAIL_REGEX,
                }),

                InputLogin: new InputProfile({
                    label: "Логин",
                    value: props.login,
                    name: "login",
                    type: "text",
                    placeholder: "Не задано",
                    validationRegex: LOGIN_REGEX,
                }),

                InputName: new InputProfile({
                    label: "Имя",
                    value: props.firstName,
                    name: "first_name",
                    type: "text",
                    placeholder: "Не задано",
                    validationRegex: NAME_REGEX,
                }),

                InputSecondName: new InputProfile({
                    label: "Фамилия",
                    value: props.lastName,
                    name: "second_name",
                    type: "text",
                    placeholder: "Не задано",
                    validationRegex: NAME_REGEX,
                }),

                InputDisplayName: new InputProfile({
                    label: "Имя в чате",
                    value: props.displayName,
                    name: "display_name",
                    type: "text",
                    placeholder: "Не задано",
                }),

                InputPhone: new InputProfile({
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

    override setProps(props) {
        super.setProps(props);

        debugger;
    }

    protected override renderContent(): string {
        debugger;

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

const mapStateToProps = (state) => {
    debugger;

    return {
        email: state.user.email,
        login: state.user.login,
        firstName: state.user.first_name,
        lastName: state.user.second_name,
        displayName: state.user.display_name,
        phone: state.user.phone,
    };
};

export default connect(mapStateToProps)(ProfilePage);
