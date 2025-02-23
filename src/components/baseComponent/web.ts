import Handlebars from "handlebars";
import { createElement } from "../../utils/dom";
import { HandlebarsASTParser } from "../../utils/parse";
import BaseComponent from "./base";
import { createComponent } from "./createComponent";

export abstract class BaseWebComponent<TProps extends object> extends BaseComponent<HTMLElement, TProps> {
    public constructor(tagName: string, props: TProps) {
        super(tagName, props);
    }

    public getContent(): HTMLElement {
        return this.root;
    }

    protected override applyRender(root: HTMLElement, rendered: string): void {
        this.root.innerHTML = rendered;
    }

    protected override createRootElement(tagName: string): HTMLElement {
        return createElement(tagName);
    }
    // protected override render(): string {
    //     this.removeListeners();

    //     this.addListeners();

    //     return this.tagName;
    // }

    protected override handleRender(): void {
        this.removeListeners();

        debugger;

        const compiledTemplate = this.compile();

        // if (this.root.children.length === 0) {
        //     this.root.appendChild(block);
        // } else {
        //     this.root.replaceChildren(block);
        // }

        this.root.classList.add(...compiledTemplate.classList);
        // this.root.replaceChildren(...compiledTemplate.children);

        this.root.append(...compiledTemplate.content.childNodes);

        this.addListeners();
    }

    private removeListeners(): void {}
    private addListeners(): void {}

    private compile(): HTMLTemplateElement {
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

        const template = Handlebars.compile(this.render());

        const onContentAdded = (content: string): void => {
            debugger;
            console.log("on content added: " + content);
        };

        const onPartialBlockAdded = (args: CreateComponentArgs): void => {
            debugger;

            createComponent(args);
        };

        const onPartialAdded = (content: string): void => {
            debugger;
            console.log("on partial added: " + content);
        };

        const hbsParser = new HandlebarsASTParser(
            onPartialAdded.bind(this),
            onPartialBlockAdded.bind(this),
            onContentAdded.bind(this)
        );

        // hbsParser.parse(this.render());

        const tmpEl = document.createElement("div");

        tmpEl.innerHTML = template(this.props);

        return tmpEl.children[0] as HTMLTemplateElement;

        return createElement("template") as HTMLTemplateElement;
    }
}
