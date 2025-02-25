import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";

import PopupTemplate from "./popup.hbs?raw";

interface PopupProps extends BaseProps {
    partial: string;
}

export class Popup extends WebComponent<PopupProps> {
    public constructor(props: PopupProps) {
        super("div", props);
    }
    protected override render(): string {
        return (PopupTemplate as string).replace("{{{ partial }}}", this.props.partial);
    }
}
