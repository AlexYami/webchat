import { EventBus } from "../src/utils/eventBus";

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

        expect(a).toBe(1);
        expect(b).toBe(2);
        expect(c).toBe(2);
    });

    it("should clear listeners", () => {
        let handled = false;

        eventBus.on("click", () => {
            handled = true;
        });

        eventBus.off("click");
        eventBus.emit("click");

        expect(handled).toBe(false);
    });

    it("should throw an error if event does not exist", () => {
        expect(() => {
            eventBus.emit("click", 1, 2);
        }).toThrow("EventBus. No handler for the 'click' event");

        expect(() => {
            eventBus.off("click");
        }).toThrow("EventBus. No handler for the 'click' event");
    });
});
