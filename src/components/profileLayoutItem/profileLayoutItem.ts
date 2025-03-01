import { BaseWebComponent, type BaseProps } from "../baseComponent/web";
import ProfileLayoutItemTemplate from "./profileLayoutItem.hbs?raw";

export interface ProfileLayoutItemProps extends BaseProps {
    label: string;
    type: string;
    value: string;
    name: string;
}

export class ProfileLayoutItem extends BaseWebComponent<ProfileLayoutItemProps> {
    public constructor(props: ProfileLayoutItemProps) {
        super("div", props);
    }

    protected override render(): string {
        return ProfileLayoutItemTemplate;
    }
}
