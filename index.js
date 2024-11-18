var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var inputButton = document.getElementById("search-button");
if (inputButton && inputButton instanceof HTMLInputElement) {
    var inputSearch_1 = document.getElementById("search-input");
    if (inputSearch_1 && inputSearch_1 instanceof HTMLInputElement) {
        inputButton.addEventListener("click", function () {
            var requestValue = inputSearch_1.value;
            if (requestValue === "") {
                messageReturn("O input não pode estar vazio!!", "error-message");
                inputSearch_1.focus();
            }
            else {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var response, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetchApi("https://pokeapi.co/api/v2/pokemon/".concat(requestValue.toLocaleLowerCase()))];
                            case 1:
                                response = _a.sent();
                                if (response.error) {
                                    messageReturn(response.error, "error-message");
                                }
                                else {
                                    messageReturn("Sucesso!", "sucess-message");
                                    console.log("Resposta:", response.response);
                                    console.log("Dados:", response.data);
                                    data = response.response;
                                    processApiResponseForAOne(data);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
        });
    }
}
var seeAllButton = document.getElementById("search-all");
if (seeAllButton && seeAllButton instanceof HTMLInputElement) {
    seeAllButton.addEventListener("click", function () {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchApi("https://pokeapi.co/api/v2/pokemon?limit=255")];
                    case 1:
                        response = _a.sent();
                        if (response.error) {
                            messageReturn(response.error, "error-message");
                        }
                        else {
                            messageReturn("Sucesso!", "sucess-message");
                            console.log("Resposta:", response.response);
                            console.log("Dados:", response.data);
                            data = response;
                            processApiResponseForAll(data);
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    });
}
function returnPokemon(requestValue) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof requestValue == "string")) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchApi("https://pokeapi.co/api/v2/pokemon/".concat(requestValue.toLocaleLowerCase()))];
                case 1:
                    data = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(typeof requestValue == "number")) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetchApi("https://pokeapi.co/api/v2/pokemon/".concat(requestValue))];
                case 3:
                    data = _a.sent();
                    _a.label = 4;
                case 4:
                    data = data === null || data === void 0 ? void 0 : data.response;
                    if (data) {
                        processApiResponseForAOne(data);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function processApiResponseForAOne(response) {
    var returnPoke = document.getElementById("return-poke");
    if (returnPoke && returnPoke instanceof HTMLDivElement) {
        if (response) {
            var returnPokes = document.getElementById("return-pokes");
            if (returnPokes && returnPokes instanceof HTMLDivElement) {
                returnPokes.innerHTML = "";
            }
            var types = [];
            for (var i = 0; i < response.types.length; i++)
                [
                    types.push(response.types[i].type.name)
                ];
            var typesHTML = types.map(function (type) { return "<div class=\"type ".concat(type, "\">").concat(type, "</div>"); }).join("");
            returnPoke.innerHTML = "\n                \n            <div class=\"card\">\n\n                <div>\n                    ".concat(typesHTML, "\n                </div>\n\n                <img src=\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/").concat(response.id, ".png\"></img>\n\n                <div>\n                    <p>").concat(response.name, "</p>\n                    <span>#").concat(response.id, "</span>\n                </div>\n                <div>\n                    <p>").concat(response.height, " cm</p>\n                    <p>").concat(response.weight, " Kg</p>\n                </div>\n\n            </div>\n\n        ");
        }
    }
}
function processApiResponseForAll(response) {
    var returnPokes = document.getElementById("return-pokes");
    if (returnPokes && returnPokes instanceof HTMLDivElement) {
        if (response.response) {
            response.response.results.forEach(function (pokemon, i) {
                var returnPoke = document.getElementById("return-poke");
                if (returnPoke && returnPoke instanceof HTMLDivElement) {
                    returnPoke.innerHTML = "";
                }
                returnPokes.innerHTML += "\n                \n                    <div class=\"card\">\n\n                        <img src=\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/".concat(i + 1, ".png\"></img>\n\n                        <input \n                        type=\"button\" \n                        value=\"Ver ").concat(pokemon.name, "\" \n                        class=\"details-button\"\n                        onClick=\"returnPokemon('").concat(pokemon.name, "')\"\n                        >\n\n                    </div>\n\n                ");
            });
        }
    }
}
function fetchApi(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    messageReturn("Buscando <span class='loader'></span>", "await-message");
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (response.status === 404) {
                        throw new Error("A resposta não foi encontrada: 404");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, { response: data }];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, { error: error_1.message }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function messageReturn(message, type) {
    var messageReturn = document.getElementById("message-return");
    if (messageReturn && messageReturn instanceof HTMLDivElement) {
        messageReturn.innerHTML = "\n            <div class=\"".concat(type, " message-control\"><p>").concat(message, "</p></div>\n        ");
        var messageDiv_1 = document.querySelector(".message-control");
        if (messageDiv_1 && messageDiv_1 instanceof HTMLDivElement) {
            setTimeout(function () {
                messageDiv_1.remove();
            }, 6000);
        }
    }
}
