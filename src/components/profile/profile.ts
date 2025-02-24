import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import { ProfileLayoutItem, type ProfileLayoutItemProps } from "../profileLayoutItem/profileLayoutItem";

import ProfileTemplate from "./profile.hbs?raw";

interface ProfileProps extends BaseProps {
    partial: string;
    name: string;
    image: string;
    items: ProfileLayoutItemProps[];
}

export class Profile extends WebComponent<ProfileProps> {
    public constructor(props: ProfileProps) {
        super("div", {
            ...props,
            children: {
                ...props.children,
                LayoutItems: props.items.map((item) => {
                    return new ProfileLayoutItem(item);
                }),
            },
        });
    }

    protected override render(): string {
        return (ProfileTemplate as string).replace("{{{ partial }}}", this.props.partial);
    }
}
