import "./contact.scss";

import type { State } from "../../store";
import { connect } from "../../utils/connect";
import { WebComponent, type BaseProps } from "../baseComponent/web";
import ContactTemplate from "./contact.hbs?raw";

export interface ContactProps extends BaseProps {
    id: number;
    image: string;
    name: string;
    preview: string;
    lastMessageDate: string;
    notifiesNumber: number;
    isActive: boolean;
}
class Contact extends WebComponent<ContactProps> {
    public constructor(props: ContactProps) {
        super("li", props);
    }

    protected override render(): string {
        return ContactTemplate;
    }

    public toggleActive(): void {
        this.setProps({
            isActive: !this.props.isActive,
        });
    }
}

const mapStateToProps = (state: State, props: ContactProps): Record<string, unknown> => {
    const isActive = state.activeChat?.id === props.id;
    const image = isActive ? state.activeChat?.image : props.image;

    return {
        isActive,
        image,
    };
};

export default connect<ContactProps>(mapStateToProps)(Contact);
