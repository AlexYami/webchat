import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";

interface ImageButtonProps extends BaseProps {
    content: string;
    text: string;
}

export class ImageButton extends WebComponent<ImageButtonProps> {
    public constructor(props: ImageButtonProps) {
        super("button", props);
    }
    protected override render(): string {
        return `
        <template class="image-button">
            ${this.props.content}
            <div class="image-button__text">
                {{text}}
            </div>
        </template>
        `;
    }
}
