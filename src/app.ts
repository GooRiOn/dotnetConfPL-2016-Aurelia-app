import {RouterConfiguration, Router,NavigationInstruction, Next} from 'aurelia-router';

export class App
{
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router)
    {
        this.router = router;

        config.map([
            {route: ['', 'books'], moduleId: 'books'},
            {route: 'search', moduleId: 'search'}
        ]);
    }
}