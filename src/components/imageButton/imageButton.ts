import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";

import ImageButtonTemplate from "./imageButton.hbs?raw";

interface ImageButtonProps extends BaseProps {
    partial: string;
    text: string;
}

export class ImageButton extends WebComponent<ImageButtonProps> {
    public constructor(props: ImageButtonProps) {
        super("button", props);
    }
    protected override render(): string {
        return (ImageButtonTemplate as string).replace("{{{ partial }}}", this.props.partial);
    }
}
