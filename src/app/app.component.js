// ```
// app.ts
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// app.ts may be freely distributed under the MIT license
// ```
"use strict";
// *src/app/app.ts*
// This file contains the main class as well as the necessary
// decorators for creating the primary `app` `component`
/*
 * Angular 2 decorators and services
 */
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var app_service_1 = require('./app.service');
var router_active_directive_1 = require('./shared/directives/router-active/router-active.directive');
var home_1 = require('./home');
// Import NgFor directive
var common_1 = require('@angular/common');
// Import Todo component
var todo_component_1 = require('./todo/todo.component');
// Import Recipes component
var recipes_component_1 = require('./recipes/recipes.component');
/*
 * App Component
 * Top Level Component
 */
var App = (function () {
    // Pass in our application `state`
    // Alternative to using `redux`
    function App(appState) {
        this.appState = appState;
        this.angularLogo = 'assets/img/angular-logo.png';
        this.name = 'Angular 2 MEAN Webpack Starter';
        this.url = 'https://twitter.com/datatype_void';
    }
    // Fire off upon initialization
    App.prototype.ngOnInit = function () {
        console.log('Initial App State', this.appState.state);
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            providers: [],
            directives: [todo_component_1.Todo,
                common_1.NgFor,
                router_active_directive_1.RouterActive],
            encapsulation: core_1.ViewEncapsulation.None,
            pipes: [],
            // Load our main `Sass` file into our `app` `component`
            styleUrls: [require('!style!css!sass!../sass/main.scss')],
            template: "\n    <md-content>\n      <md-toolbar color=\"primary\">\n          <span>{{ name }}</span>\n          <span class=\"fill\"></span>\n          <button md-button router-active [routerLink]=\" ['Index'] \">\n            Index\n          </button>\n          <button md-button router-active [routerLink]=\" ['Home'] \">\n            Home\n          </button>\n          <button md-button router-active [routerLink]=\" ['Todo'] \">\n            Todo\n          </button>\n          <button md-button router-active [routerLink]=\" ['Recipes'] \">\n            Recipes\n          </button>\n          <button md-button router-active [routerLink]=\" ['About'] \">\n            About\n          </button>\n      </md-toolbar>\n\n      <md-progress-bar mode=\"indeterminate\" color=\"primary\" *ngIf=\"loading\">\n      </md-progress-bar>\n\n      <router-outlet></router-outlet>\n\n      <pre class=\"app-state\">this.appState.state = {{ appState.state | json }}</pre>\n\n      <footer>\n        <img [src]=\"angularLogo\" width=\"7%\">\n        <span>Angular 2 MEAN Webpack Starter by <a [href]=\"url\">@datatype_void</a></span>\n      </footer>\n    </md-content>\n  "
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', name: 'Index', component: home_1.Home, useAsDefault: true },
            { path: '/home', name: 'Home', component: home_1.Home },
            { path: '/todo', component: todo_component_1.Todo, name: 'Todo' },
            { path: '/redux', component: recipes_component_1.Recipes, name: 'Recipes' },
            // Async load a component using Webpack's require with
            // es6-promise-loader and webpack `require`
            { path: '/about', name: 'About', loader: function () { return require('es6-promise!./about')('About'); } },
        ]), 
        __metadata('design:paramtypes', [app_service_1.AppState])
    ], App);
    return App;
}());
exports.App = App;
/*
 * For help or questions please contact us at @datatype_void on twitter
 * or our chat on Slack at http://www.davidniciforovic.com/wp-login.php?action=slack-invitation
 */
//# sourceMappingURL=app.component.js.map