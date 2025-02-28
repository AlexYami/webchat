import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import type { ContactProps } from "../contact/contact";
import { ContactList } from "../contactList";
import { SearchBox } from "../messageBox/sendMessage";

interface LayoutProps extends BaseProps {
    searchText: string;
    contacts: ContactProps[];
}

export abstract class BaseLayout extends WebComponent<LayoutProps> {
    public constructor(props: LayoutProps) {
        super("div", {
            ...props,
            children: {
                ...props.children,
                SearchBox: new SearchBox({ searchText: props.searchText }),
                ContactList: new ContactList({ contacts: props.contacts }),
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
