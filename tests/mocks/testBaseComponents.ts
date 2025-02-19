import BaseComponent from "../../src/components/baseComponent/base";

export class TestProps {
    public login: string;
    public email: string;

    constructor(login: string, email: string) {
        this.login = login;
        this.email = email;
    }
}

export class TestBaseComponent extends BaseComponent<string, TestProps> {
    public constructor(tagName: string, props: TestProps) {
        super(tagName, props);
    }
    protected override applyRender(root: string, rendered: string): void {}
    protected override createRootElement(tagName: string): string {
        return `root`;
    }
    protected override render(): string {
        return `${this.tagName} rendered`;
    }
}
