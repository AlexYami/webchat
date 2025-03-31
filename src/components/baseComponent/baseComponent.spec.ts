import sinon from "sinon";
import BaseComponent from "./base";
import { expect } from "chai";


interface TestProps {
    login: string;
    email: string;
}

class TestBaseComponent extends BaseComponent<string, TestProps> {
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

// NOTE: need cast to any to avoid TypeScript protection:
/* eslint-disable-next-line */
const TestBaseComponentPrototype = TestBaseComponent.prototype as any;

const props: TestProps = {
    login: "login",
    email: "email",
};

describe("Base component", () => {
    beforeEach(() => { });

    it("should call to lifecycle methods", () => {

        const handleInitSpy = sinon.spy(TestBaseComponentPrototype, "handleInit");
        const handleComponentDidMountSpy = sinon.spy(TestBaseComponentPrototype, "handleComponentDidMount");
        const handleRenderSpy = sinon.spy(TestBaseComponentPrototype, "handleRender");

        new TestBaseComponent("test", props);

        expect(handleInitSpy.calledOnce).is.true;
        expect(handleComponentDidMountSpy.calledOnce).is.true;
        expect(handleRenderSpy.calledOnce).is.true;

        handleInitSpy.restore();
        handleComponentDidMountSpy.restore();
        handleRenderSpy.restore();
    });

    it("should call to lifecycle methods on settings set", () => {
        const baseComponent = new TestBaseComponent("test", props);

        const handleComponentDidUpdateSpy = sinon.spy(TestBaseComponentPrototype, "handleComponentDidUpdate");
        const handleComponentDidMountSpy = sinon.spy(TestBaseComponentPrototype, "handleComponentDidMount");
        const handleRenderSpy = sinon.spy(TestBaseComponentPrototype, "handleRender");

        baseComponent.setProps({
            login: "ivan",
            email: "ivan@email.com",
        });

        expect(handleComponentDidUpdateSpy.calledTwice).is.true;
        expect(handleComponentDidMountSpy.calledOnce).is.true;
        expect(handleRenderSpy.calledOnce).is.true;

        handleComponentDidUpdateSpy.restore();
        handleComponentDidMountSpy.restore();
        handleRenderSpy.restore();
    });
});
