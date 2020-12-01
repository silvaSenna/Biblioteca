"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Rotas = /** @class */ (function () {
    function Rotas() {
        this.rota = express_1.Router();
        this.rota.get('/login', this.get);
    }
    Rotas.prototype.get = function (_req, res) {
        res.render('login');
    };
    return Rotas;
}());
exports.default = new Rotas().rota;
