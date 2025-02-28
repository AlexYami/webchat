import range from "../../utils/range";
import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import { ContactList } from "../contactList";
import { SearchBox } from "../messageBox/sendMessage";

interface LayoutProps extends BaseProps {
    searchText: string;
}

const messages = range(10).map((i) => {
    return {
        name: `Контакт #${i}`,
        image: "https://placehold.co/47x47/orange/white",
        preview: `Так увлёкся работой по курсу, что совсем забыл его анонсировать`,
        lastMessageDate: "Пт",
        notifiesNumber: i % 3,
    };
});

const ContactListComponent = new ContactList({
    items: messages,
});

export abstract class BaseLayout extends WebComponent<LayoutProps> {
    public constructor(props: LayoutProps) {
        super("div", {
            ...props,
            children: {
                ...props.children,
                SearchBox: new SearchBox({}),
                ContactList: ContactListComponent,
                //     items: range(10)
                //         .map((i) => {
                //             return {
                //                 name: `Контакт #${i}`,
                //                 image: "https://placehold.co/47x47/orange/white",
                //                 preview: `Так увлёкся работой по курсу, что совсем забыл его анонсировать`,
                //                 lastMessageDate: "Пт",
                //                 notifiesNumber: i % 3,
                //             };
                //         })
                //         .filter((i) => i.name.includes(props.searchText)),
                // }),
            },
        });
    }
    protected override render(): string {
        return `
            <template class="layout">
                <aside class="layout__sidebar">
                    <a class="profile-link" href="#">Профиль</a>
                    {{{ SearchBox }}}
                    {{{ ContactList }}}
                </aside>
                <div class="layout__content">
                    ${this.renderLayoutContent()}
                </div>
            </template>
        `;
    }

    protected abstract renderLayoutContent(): string;
}
