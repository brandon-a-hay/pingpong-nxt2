"use strict";
var core_1 = require('@angular/core');
var app_service_1 = require('../app.service');
var title_1 = require('./services/title');
var x_large_1 = require('./directives/x-large');
var accordion_component_1 = require('../shared/components/accordion/accordion.component');
var accordion_group_component_1 = require('../shared/components/accordion/accordion-group.component');
var common_1 = require('@angular/common');
var ng2_table_1 = require('ng2-table/ng2-table');
var player_service_1 = require('../player/player.service');
var player_component_1 = require('../player/player.component');
var Home = (function () {
    function Home(appState, title) {
        this.appState = appState;
        this.title = title;
        this.localState = { value: '' };
        this.rows = [];
        this.columns = [
            { title: 'Name', name: 'name' },
            { title: 'Wins', name: 'wins' },
            { title: 'Losses', name: 'losses' },
            { title: 'Streak', name: 'streak' },
            { title: 'Win %', name: 'winPctg', sort: 'desc' }
        ];
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '', columnName: 'name' }
        };
        this.data = [
            {
                'name': 'Brandon Hay',
                'wins': 64,
                'losses': 15,
                'winPctg': .86,
                'streak': 'W10'
            },
            {
                'name': 'Luis Bello',
                'wins': 23,
                'losses': 85,
                'winPctg': .12,
                'streak': 'L4'
            },
            {
                'name': 'Matt Vaccaro',
                'wins': 87,
                'losses': 17,
                'winPctg': .9,
                'streak': 'W4'
            }
        ];
        this.isOpen = false;
        this.groups = [
            {
                heading: 'Dynamic 1',
                content: 'I am dynamic!'
            },
            {
                heading: 'Dynamic 2',
                content: 'Dynamic as well'
            }
        ];
        this.length = this.data.length;
        // this.players = this.playerService.getAll()
        //   .map(p => { return p; });
    }
    Home.prototype.ngOnInit = function () {
        this.onChangeTable(this.config);
    };
    Home.prototype.removeDynamic = function () {
        this.groups.pop();
    };
    Home.prototype.submitState = function (value) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    };
    // grid functions
    Home.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.data; }
        console.log(page);
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    Home.prototype.changeSort = function (data, config) {
        if (!config.sorting) {
            return data;
        }
        var columns = this.config.sorting.columns || [];
        var columnName = void 0;
        var sort = void 0;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '') {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        // simple sorting
        return data.sort(function (previous, current) {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            }
            else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    };
    Home.prototype.changeFilter = function (data, config) {
        var _this = this;
        if (!config.filtering) {
            return data;
        }
        var filteredData = data.filter(function (item) {
            return item[config.filtering.columnName].match(_this.config.filtering.filterString);
        });
        return filteredData;
    };
    Home.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.data, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    };
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            providers: [title_1.Title],
            directives: [
                x_large_1.XLarge,
                accordion_component_1.Accordion,
                accordion_group_component_1.AccordionGroup,
                common_1.NgFor,
                ng2_table_1.NG_TABLE_DIRECTIVES,
                player_component_1.Player,
                player_service_1.PlayerService
            ],
            pipes: [],
            styles: [require('./home.css')],
            template: require('./home.html')
        }), 
        __metadata('design:paramtypes', [app_service_1.AppState, title_1.Title])
    ], Home);
    return Home;
}());
exports.Home = Home;
//# sourceMappingURL=home.component.js.map