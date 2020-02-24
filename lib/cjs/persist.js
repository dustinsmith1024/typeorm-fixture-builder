"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var reflect_1 = require("./reflect");
var resolve_1 = require("./resolve");
/**
 * Persists an array relation (many-to-many, one-to-many)
 *
 * @param manager EntityManager.
 * @param fixture Fixture.
 * @param propertyName Property.
 */
function persistManyRelation(manager, fixture, propertyName) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _i, index, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = [];
                    for (_b in fixture[propertyName] || [])
                        _a.push(_b);
                    _i = 0;
                    _e.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    index = _a[_i];
                    _c = fixture[propertyName];
                    _d = index;
                    return [4 /*yield*/, persist(manager, fixture[propertyName][index])];
                case 2:
                    _c[_d] = _e.sent();
                    _e.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Persists a non array relation (one-to-one, many-to-one).
 *
 * @param manager EntityManager.
 * @param fixture Fixture.
 * @param propertyName Property.
 */
function persistOneRelation(manager, fixture, propertyName) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!fixture[propertyName]) return [3 /*break*/, 2];
                    _a = fixture;
                    _b = propertyName;
                    return [4 /*yield*/, persist(manager, fixture[propertyName])];
                case 1:
                    _a[_b] = _c.sent();
                    _c.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
/**
 * Persists the relations of a fixture.
 *
 * @param manager EntityManager.
 * @param fixture Fixture.
 */
function persistRelations(manager, fixture) {
    return __awaiter(this, void 0, void 0, function () {
        var relations, _i, relations_1, _a, propertyName, relationType, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    relations = manager.connection.getMetadata(fixture.constructor).relations;
                    _i = 0, relations_1 = relations;
                    _c.label = 1;
                case 1:
                    if (!(_i < relations_1.length)) return [3 /*break*/, 7];
                    _a = relations_1[_i], propertyName = _a.propertyName, relationType = _a.relationType;
                    _b = relationType;
                    switch (_b) {
                        case 'many-to-many': return [3 /*break*/, 2];
                        case 'one-to-many': return [3 /*break*/, 2];
                        case 'many-to-one': return [3 /*break*/, 4];
                        case 'one-to-one': return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 6];
                case 2: return [4 /*yield*/, persistManyRelation(manager, fixture, propertyName)];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, persistOneRelation(manager, fixture, propertyName)];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
/**
 * Persists the fixture itself.
 *
 * @param manager EntityManager.
 * @param fixture Fixture.
 */
function persistEntity(manager, fixture) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = manager
                        .getRepository(fixture.constructor)).save;
                    return [4 /*yield*/, resolve_1.resolve(manager, fixture)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    });
}
/**
 * Persists a fixture.
 *
 * @param manager EntityManager.
 * @param fixture Fixture.
 */
function persist(manager, fixture) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(reflect_1.isPersisted(fixture) === false)) return [3 /*break*/, 3];
                    return [4 /*yield*/, persistRelations(manager, fixture)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, persistEntity(manager, fixture)];
                case 2:
                    _a.sent();
                    reflect_1.setPersisted(fixture, true);
                    _a.label = 3;
                case 3: return [2 /*return*/, fixture];
            }
        });
    });
}
exports.persist = persist;
