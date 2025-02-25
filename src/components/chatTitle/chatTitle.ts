import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import { ImageButton } from "../imageButton";
import { Popup } from "../popup";
import ChatTitleTemplate from "./chatTitle.hbs?raw";

interface ChatTitleProps extends BaseProps {
    title: string;
    showAddUserPopup: boolean;
}

// const popupTemplate = `
//     <div class="message-box__command-popup">
//         {{#> ImageButton text="Добавить пользователя" }}
//         <img src="/images/addUser.svg" alt="Добавить пользователя" />
//         {{/ImageButton}}
//         {{#> ImageButton text="Удалить пользователя" }}
//         <img src="/images/deleteUser.svg" alt="Удалить пользователя" />
//         {{/ImageButton}}
//     </div>
// `;

const addUserPartial = `<img src="/images/addUser.svg" alt="Добавить пользователя" />`;
const deleteUserPartial = `<img src="/images/deleteUser.svg" alt="Удалить пользователя" />`;

const popupTemplate = `
    <div class="message-box__command-popup">
        {{{ AddUser }}}
        {{{ DeleteUser }}}
    </div>
`;

export class ChatTitle extends WebComponent<ChatTitleProps> {
    public constructor(props: ChatTitleProps) {
        super("div", {
            ...props,
            children: {
                Popup: new Popup({
                    partial: popupTemplate,
                    children: {
                        AddUser: new ImageButton({ partial: addUserPartial, text: "Добавить пользователя" }),
                        DeleteUser: new ImageButton({ partial: deleteUserPartial, text: "Удалить пользователя" }),
                    },
                }),
            },
        });
    }

    protected override render(): string {
        return ChatTitleTemplate as string;
    }
}
