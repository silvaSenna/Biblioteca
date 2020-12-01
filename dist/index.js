"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var helmet_1 = __importDefault(require("helmet"));
var express_session_1 = __importDefault(require("express-session"));
var rotas_1 = __importDefault(require("./config/rotas"));
//import expressLayout from 'express-ejs-layouts';
var App = /** @class */ (function () {
    function App() {
        this.express = express_1.default();
        this.configuracao();
        this.listen();
    }
    App.prototype.configuracao = function () {
        this.express.use(helmet_1.default());
        this.express.use('/public', express_1.default.static(__dirname + 'public'));
        this.express.set('view engine', 'ejs');
        this.express.set('views', __dirname + '/public');
        //this.express.use(expressLayout);
        this.express.use(body_parser_1.default.urlencoded({ extended: false }));
        this.express.use(express_session_1.default({ secret: 'teste', resave: false,
            saveUninitialized: true }));
        this.express.use('/auth', rotas_1.default);
    };
    App.prototype.listen = function () {
        this.express.listen(3000, function () {
            console.log('Backend funcionando!');
        });
    };
    return App;
}());
exports.default = new App();
