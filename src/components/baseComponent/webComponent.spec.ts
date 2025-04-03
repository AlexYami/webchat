import sinon from "sinon";
import { expect } from "chai";
import { WebComponent, type BaseProps } from "./web";

interface TestWebComponentProps extends BaseProps {
    text: string;
}

class TestWebComponent extends WebComponent<TestWebComponentProps> {
    public constructor(props: TestWebComponentProps) {
        super("div", props);
    }

    public render(): string {
        return `<template>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </template>`;
    }
}

describe("WebComponent", () => {
    it("should render content", () => {
        const text = "Hello";

        const component = new TestWebComponent({ text });

        const spanText = component.getContent().querySelector("#test-text")?.innerHTML;

        expect(spanText).to.be.eq(text);
    });

    it("should rerender on setProps", () => {
        const newValue = "New value";

        const pageComponent = new TestWebComponent({ text: "Hello" });

        pageComponent.setProps({ text: newValue });

        const spanText = pageComponent.getContent().querySelector("#test-text")?.innerHTML;

        expect(spanText).to.be.eq(newValue);
    });

    it("should handle events", () => {
        const clickhadnlerStub = sinon.stub();
        const pageComponent = new TestWebComponent({
            text: "",
            events: {
                click: clickhadnlerStub,
            },
        });

        const event = new MouseEvent("click");
        pageComponent.getContent().dispatchEvent(event);

        expect(clickhadnlerStub.calledOnce).eql(true);
    });
});
