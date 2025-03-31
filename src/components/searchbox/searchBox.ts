import { BaseForm, type BaseFormProps } from "../form/form";
import { InputSearch } from "../input";

const inputSearch = new InputSearch({
    label: "",
    name: "search",
    placeholder: "",
    value: "",
    type: "search",
});

interface SearchBoxProps extends BaseFormProps {
    searchText: string;
    onSearch: (search: string | undefined) => void;
}

export class SearchBox extends BaseForm<SearchBoxProps> {
    public constructor(props: SearchBoxProps) {
        super({
            ...props,
            children: {
                ...props.children,
                inputSearch,
            },
            onFormSubmit: (): void => {
                const { search } = this.getValues();

                this.props.onSearch(search);
            },
        });
    }

    protected override render(): string {
        return `
            <template class="searchbox">
                {{{ inputSearch }}}
                <img src="/images/search.svg" alt="Поиск" />
            </template>
        `;
    }
}
