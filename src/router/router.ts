import Route from "./route";
import type { ROUTES } from "./routes";

// export interface RouteInterface {
//     render: () => void;
//     match: (path: string) => boolean;
//     leave: () => void;
// }

export class Router {
    public routes: Route[] = [];
    private readonly history: History;
    private currentRoute: Route | null;
    private readonly selector: string;

    private constructor(selector: string) {
        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.selector = selector;
    }

    public use(path: string, page: ObjectConstructor): this {
        const route = new Route(path, this.selector, page, {});

        this.routes.push(route);

        return this;
    }

    public start(): void {
        window.onpopstate = ((): void => {
            this.onRoute(window.location.pathname);
        }).bind(this);

        this.onRoute(window.location.pathname);
    }

    private onRoute(path: string): void {
        const route = this.getRoute(path);

        if (!route) return;

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;

        route.render();
    }

    public go(path: ROUTES): void {
        this.history.pushState({}, "", path);
        this.onRoute(path);
    }

    public back(): void {
        this.history.back();
    }

    public forward(): void {
        this.history.forward();
    }

    private getRoute(path: string): Route | undefined {
        let route = this.routes.find((r) => r.match(path));

        if (!route) {
            route = this.routes.find((r) => r.match("*"));
        }

        return route;
    }

    private static instance: Router | null;

    public static create(selector: string): Router {
        Router.instance = new Router(selector);

        return Router.instance;
    }

    public static get(): Router {
        if (!Router.instance) throw new Error("kekekeke");

        return Router.instance;
    }
}
