import BaseComponent from "../../src/components/baseComponent/base";

export interface TestProps {
    login: string;
    email: string;
}

export class TestBaseComponent extends BaseComponent<string, TestProps> {
    public constructor(tagName: string, props: TestProps) {
        super(tagName, props);
    }
    protected override createRootElement(): string {
        return `root`;
    }
    protected override render(): string {
        return `${this.tagName} rendered`;
    }
}
