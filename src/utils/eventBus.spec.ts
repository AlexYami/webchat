import { expect } from "chai";
import { EventBus } from "./eventBus";

describe("Event Bus", () => {
    let eventBus: EventBus = new EventBus();

    beforeEach(() => {
        eventBus = new EventBus();
    });

    it("should subscribe and emit", () => {
        let a = null;
        let b = null;
        let c = null;

        eventBus.on("click", (...args: number[]) => {
            [a, b] = args;
            c = args.length;
        });

        eventBus.emit("click", 1, 2);

        expect(a).eql(1);
        expect(b).eql(2);
        expect(c).eql(2);
    });

    it("should clear listeners", () => {
        let handled = false;

        eventBus.on("click", () => {
            handled = true;
        });

        eventBus.off("click");
        eventBus.emit("click");

        expect(handled).eql(false);
    });

    it("should throw an error if event does not exist", () => {
        expect(() => {
            eventBus.emit("click", 1, 2);
        }).to.throw("EventBus. No handler for the 'click' event");

        expect(() => {
            eventBus.off("click");
        }).to.throw("EventBus. No handler for the 'click' event");
    });
});
