#!/usr/bin/env node
"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-node/register");
var commander_1 = __importDefault(require("commander"));
var glob_1 = require("glob");
var path_1 = require("path");
var typeorm_1 = require("typeorm");
var ora_1 = __importDefault(require("ora"));
var collect_1 = require("./collect");
var install_1 = require("./install");
/**
 * Collects the paths and fixtures from bundle files using the given pattern.
 *
 * @param spinner Spinner.
 * @param pattern Pattern.
 */
function collectBundles(spinner, pattern) {
    spinner.start('Collecting fixtures from bundles');
    var bundles = glob_1.sync(pattern, {
        cwd: process.cwd(),
        absolute: true,
    }).map(function (file) {
        try {
            return [path_1.relative(process.cwd(), file), collect_1.collect(require(file))];
        }
        catch (error) {
            spinner.fail("Failed to load bundle file at: " + path_1.relative(process.cwd(), file) + ": " + error.message);
            return process.exit(1);
        }
    });
    var count = bundles.reduce(function (count, fixtures) { return (count += fixtures.length); }, 0);
    spinner.succeed("Found " + bundles.length + " fixture bundles with a total of " + count + " fixtures");
    return bundles;
}
/**
 * Creates a database connection using a connection name.
 *
 * @param spinner Spinner.
 * @param connectionName Connection name.
 */
function getConnection(spinner, connectionName) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, _a, error_1, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    spinner.start('Connecting to database');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 6]);
                    _a = typeorm_1.createConnection;
                    return [4 /*yield*/, new typeorm_1.ConnectionOptionsReader({
                            root: process.cwd(),
                        }).get(connectionName)];
                case 2: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 3:
                    connection = _b.sent();
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _b.sent();
                    return [4 /*yield*/, typeorm_1.createConnection(connectionName)];
                case 5:
                    connection = _b.sent();
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_2 = _b.sent();
                    spinner.fail("Failed to get database connection: " + error_2.message);
                    return [2 /*return*/, process.exit(1)];
                case 8:
                    spinner.succeed('Connected');
                    return [2 /*return*/, connection];
            }
        });
    });
}
/**
 * Resets the database.
 *
 * @param spinner Spinner.
 * @param connection Connection.
 * @param useMigrations Use migrations.
 */
function reset(spinner, connection, useMigrations) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, connection.dropDatabase()];
                case 1:
                    _a.sent();
                    if (!(useMigrations === true)) return [3 /*break*/, 3];
                    spinner.start('Migrating database');
                    return [4 /*yield*/, connection.runMigrations()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    spinner.start('Synchronizing database');
                    return [4 /*yield*/, connection.synchronize()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_3 = _a.sent();
                    spinner.fail("Failed to reset database: " + error_3.message);
                    return [2 /*return*/, process.exit(1)];
                case 7:
                    spinner.succeed('Database reset complete');
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Installs a list of bundles.
 *
 * @param spinner Spinner.
 * @param connection Connection.
 * @param bundles Bundles to install.
 */
function installBundles(spinner, connection, bundles) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, bundles_1, _a, path, fixtures;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, bundles_1 = bundles;
                    _b.label = 1;
                case 1:
                    if (!(_i < bundles_1.length)) return [3 /*break*/, 4];
                    _a = bundles_1[_i], path = _a[0], fixtures = _a[1];
                    spinner.start(path);
                    return [4 /*yield*/, install_1.install(connection, fixtures)];
                case 2:
                    _b.sent();
                    spinner.succeed(path);
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * "install" command action.
 *
 * @param pattern
 * @param options
 */
function action(pattern, options) {
    if (pattern === void 0) { pattern = './fixtures/**/*.bundle.ts'; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, connectionName, resetDatabase, useMigrations, spinner, bundles, connection;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = options.connection, connectionName = _a === void 0 ? 'default' : _a, resetDatabase = options.resetDatabase, useMigrations = options.useMigrations;
                    spinner = ora_1.default('');
                    bundles = collectBundles(spinner, pattern);
                    return [4 /*yield*/, getConnection(spinner, connectionName)];
                case 1:
                    connection = _b.sent();
                    if (!(resetDatabase === true)) return [3 /*break*/, 3];
                    return [4 /*yield*/, reset(spinner, connection, useMigrations)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [4 /*yield*/, installBundles(spinner, connection, bundles)];
                case 4:
                    _b.sent();
                    spinner.succeed('Done');
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
commander_1.default
    .command('install [pattern]')
    .description('Load fixtures into database. Pattern is optional and can be a glob pattern. [default: "fixtures/**/*.bundle.ts"')
    .option('-r, --reset-database', 'Drops and synchronizes the database before loading fixtures')
    .option('-c, --connection <name>', 'Name of connection to use. Check the typeorm documentation for further information. [default: "default"]', 'default')
    .option('-m, --use-migrations', 'Execute migrations instead synchronization after dropping the database')
    .action(action);
commander_1.default.parse(process.argv);
