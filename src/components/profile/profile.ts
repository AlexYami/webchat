import { WebComponent } from "../baseComponent/component";
import { Partial, type ComponentContainerProps } from "../partial/partial";
import { ProfileLayoutItem, type ProfileLayoutItemProps } from "../profileLayoutItem/profileLayoutItem";

import ProfileTemplate from "./profile.hbs?raw";

interface ProfileProps extends ComponentContainerProps {
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
                Partial: new Partial(props.Partial),
                LayoutItems: props.items.map((item) => {
                    return new ProfileLayoutItem(item);
                }),
            },
        });
    }

    protected override render(): string {
        return ProfileTemplate as string;
    }
}
