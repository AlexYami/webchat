import Handlebars from "handlebars";
import { EventBus } from "./eventBus";

const EVENTS = {
    PARTIAL_ADDED: "partial-added",
    PARTIAL_BLOCK_ADDED: "partial-block-added",
    CONTENT_ADDED: "content-added",
};

export class HandlebarsASTParser {
    private readonly eventBus: EventBus;

    public constructor(onPartial: Function, onPartialBlock: Function, onContent: Function) {
        this.eventBus = new EventBus();

        this.eventBus.on(EVENTS.PARTIAL_ADDED, onPartial);
        this.eventBus.on(EVENTS.PARTIAL_BLOCK_ADDED, onPartialBlock);
        this.eventBus.on(EVENTS.CONTENT_ADDED, onContent);
    }

    public parse(template: string): void {
        Handlebars.registerHelper("helperMissing", function (/* dynamic arguments */) {
            debugger;
            console.log("test");

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            var options = arguments[arguments.length - 1];
            var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            return new Handlebars.SafeString("Missing: " + options.name + "(" + args + ")");
        });

        Handlebars.registerHelper("blockHelperMissing", function (context, options) {
            debugger;
            console.log("block");
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return "Helper '" + options.name + "' not found. " + "Printing block: " + options.fn(context);
        });

        Handlebars.compile(template)({ title: "test" });

        const root = Handlebars.parse(template);

        this.iterateHandlebarsASTRecursevely(root);
    }

    private iterateHandlebarsASTRecursevely(node: hbs.AST.Program): void {
        for (const childNode of node.body) {
            debugger;
            if (childNode.type === "PartialBlockStatement") {
                const partial = childNode as hbs.AST.PartialBlockStatement;

                if (partial.hash.pairs.length) {
                }

                const component = {
                    /* eslint-disable */
                    name: partial.name.original,
                    props: partial.hash.pairs.map((pair) => {
                        return {
                            name: pair.key,
                            value: pair.value.value,
                        };
                    }),
                    /* eslint-enable */
                };

                debugger;

                this.eventBus.emit(EVENTS.PARTIAL_BLOCK_ADDED, component);

                // this.iterateHandlebarsASTRecursevely(partial.program);
            }
            if (childNode.type === "PartialStatement") {
                const partial = childNode as hbs.AST.PartialStatement;

                const component = {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    name: partial.name.original,
                };

                this.eventBus.emit(EVENTS.PARTIAL_ADDED, component);
            }

            if (childNode.type === "ContentStatement") {
                const content = childNode as hbs.AST.CommentStatement;

                this.eventBus.emit(EVENTS.CONTENT_ADDED, content.value);
            }
        }
    }
}

// export default function parse(hbs: string): void {
//     const root = Handlebars.parse(hbs);

//     iterateHandlebarsASTRecursevely(root);
// }
