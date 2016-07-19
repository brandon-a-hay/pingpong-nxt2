"use strict";
var core_1 = require('@angular/core');
var player_service_1 = require('./player.service');
var http_1 = require('@angular/http');
var Player = (function () {
    function Player(playerService) {
        this.playerService = playerService;
        this.player = {
            name: ''
        };
        console.log('Player constructor go!');
        this.playerService.getAll().subscribe(function (x) { return console.log(x); });
    }
    Player.prototype.createPlayer = function () {
        var _this = this;
        this.playerService.create(this.player)
            .subscribe(function (res) {
            _this.players = res;
            _this.player.name = '';
        });
    };
    Player.prototype.deletePlayer = function (id) {
        var _this = this;
        this.playerService.delete(id)
            .subscribe(function (res) {
            _this.players = res;
        });
    };
    Player = __decorate([
        core_1.Component({
            selector: 'new-player',
            providers: http_1.HTTP_PROVIDERS.concat([player_service_1.PlayerService]),
            directives: [],
            template: require('./players.html')
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService])
    ], Player);
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.component.js.map