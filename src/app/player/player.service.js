"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var PlayerService = (function () {
    function PlayerService(http) {
        this.http = http;
    }
    PlayerService.prototype.getAll = function () {
        return this.http.get('/api/player')
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.create = function (data) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/player', JSON.stringify(data), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.delete = function (id) {
        return this.http.delete("/api/player/" + id)
            .map(function (res) { return res.json(); });
    };
    PlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
//# sourceMappingURL=player.service.js.map