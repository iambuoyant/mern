"use strict";
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
var chai_1 = __importDefault(require("chai"));
var chai_fs_1 = __importDefault(require("chai-fs"));
var chai_2 = require("chai");
var sinon_1 = __importDefault(require("sinon"));
var station_1 = require("../controllers/station");
var auth_1 = __importDefault(require("../services/auth"));
var station_2 = __importDefault(require("../models/station"));
var node_fetch_1 = __importDefault(require("node-fetch"));
chai_1.default.use(require('chai-fs'));
chai_1.default.use(chai_fs_1.default);
// Env Variables
var authToken = "" + process.env.STATIC_JWT;
var serverHostName = process.env.SERVER_HOSTNAME || 'localhost';
describe('station insertion unit test case', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('should return error from station save', function (done) {
            var error = true;
            var obj = {};
            var isSaveMethodCalled = sinon_1.default.stub(station_2.default.prototype, 'save').yields(error, null);
            station_1.generateStation(obj)
                .then(function (res) {
                // never called
            })
                .catch(function (error) {
                chai_2.expect(error).to.be.not.equal(undefined);
                chai_2.expect(error).to.be.equal(true);
                chai_2.expect(isSaveMethodCalled.calledOnce).to.be.equal(true);
                isSaveMethodCalled.restore();
                done();
            });
        });
        it('should return station object from station save', function (done) {
            var error = false;
            var newObj = {
                data: {
                    feature: [],
                    type: 'string'
                },
                createdAt: '2021-03-11T12:52:04.859Z',
                updatedAt: '2021-03-11T12:52:04.859Z'
            };
            var isSaveMethodCalled = sinon_1.default.stub(station_2.default.prototype, 'save').yields(error, newObj);
            station_1.generateStation(newObj)
                .then(function (res) {
                chai_2.expect(res).to.be.not.equal(undefined);
                chai_2.expect(res).to.be.not.equal(null);
                chai_2.expect(newObj.createdAt).to.be.an('string');
                chai_2.expect(newObj.data).to.be.equals(newObj.data);
                chai_2.expect(newObj.updatedAt).to.be.an('string');
                chai_2.expect(isSaveMethodCalled.calledOnce).to.be.equal(true);
                isSaveMethodCalled.restore();
                done();
            })
                .catch(function (error) {
                // never called
            });
        });
        return [2 /*return*/];
    });
}); });
describe('Issue jwt token by user id unit test case', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('should return success from verify jwt token check', function (done) {
            return __awaiter(this, void 0, void 0, function () {
                var token, result;
                return __generator(this, function (_a) {
                    token = authToken;
                    result = auth_1.default(token);
                    if (result.status == 200) {
                        chai_2.expect(result).to.be.not.equal(undefined);
                        chai_2.expect(result).to.be.not.equal(null);
                        chai_2.expect(result.data._id).to.be.an('string');
                        done();
                    }
                    else {
                        // never called
                    }
                    return [2 /*return*/];
                });
            });
        });
        it('should return unauthrorized from verify jwt token check failed unit', function (done) {
            return __awaiter(this, void 0, void 0, function () {
                var token, result;
                return __generator(this, function (_a) {
                    token = authToken;
                    result = auth_1.default(token);
                    if (result.status == 200) {
                        // never called
                    }
                    else {
                        chai_2.expect(result).to.be.not.equal(undefined);
                        chai_2.expect(result).to.be.not.equal(null);
                        chai_2.expect(result.data).to.be.equal(null);
                        chai_2.expect(result.status).to.be.equal(401);
                        chai_2.expect(result.error).to.be.equal('Unauthorized');
                        done();
                    }
                    return [2 /*return*/];
                });
            });
        });
        it('should return bad request from verify jwt token check failed unit', function (done) {
            return __awaiter(this, void 0, void 0, function () {
                var token, result;
                return __generator(this, function (_a) {
                    token = '';
                    result = auth_1.default(token);
                    if (result.status == 200) {
                        // never called
                    }
                    else {
                        chai_2.expect(result).to.be.not.equal(undefined);
                        chai_2.expect(result).to.be.not.equal(null);
                        chai_2.expect(result.data).to.be.equal(null);
                        chai_2.expect(result.status).to.be.equal(400);
                        chai_2.expect(result.error).to.be.equal('Bad Request');
                        done();
                    }
                    return [2 /*return*/];
                });
            });
        });
        return [2 /*return*/];
    });
}); });
describe('station get unit test case by date', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('should return error on getting station from database', function (done) {
            return __awaiter(this, void 0, void 0, function () {
                var at;
                return __generator(this, function (_a) {
                    at = '2021-03-11T12:52:04.859Z';
                    station_1.getStationAndWeatherData(at)
                        .then(function (res) {
                        // never called
                    })
                        .catch(function (error) {
                        chai_2.expect(error).to.be.not.equal(undefined);
                        chai_2.expect(error).to.be.equal(true);
                    });
                    done();
                    return [2 /*return*/];
                });
            });
        });
        it('should return station object on getting station from database', function (done) {
            return __awaiter(this, void 0, void 0, function () {
                var at;
                return __generator(this, function (_a) {
                    at = '2021-03-11T12:52:04.859Z';
                    station_1.getStationAndWeatherData(at)
                        .then(function (res) {
                        chai_2.expect(res).to.be.not.equal(undefined);
                        chai_2.expect(res).to.be.not.equal(null);
                        chai_2.expect(res.Obj).to.be.an('object');
                    })
                        .catch(function (error) {
                        // never called
                    });
                    done();
                    return [2 /*return*/];
                });
            });
        });
        return [2 /*return*/];
    });
}); });
describe('station get unit test case by date and Kiosk Id', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('should return error on getting station from database', function (done) {
            var at = '2021-03-11T12:52:04.859Z';
            var id = '6043ed5623dab91c48889090';
            station_1.getStationAndWeatherDataByKioskId(id, at)
                .then(function (res) {
                // never called
            })
                .catch(function (error) {
                chai_2.expect(error).to.be.not.equal(undefined);
                chai_2.expect(error).to.be.equal(true);
            });
            done();
        });
        it('should return station object on getting station from database', function (done) {
            var at = '2021-03-11T12:52:04.859Z';
            var id = '6043ed5623dab91c48889090';
            station_1.getStationAndWeatherDataByKioskId(id, at)
                .then(function (res) {
                chai_2.expect(res).to.be.not.equal(undefined);
                chai_2.expect(res).to.be.not.equal(null);
                chai_2.expect(res.Obj).to.be.an('object');
            })
                .catch(function (error) {
                // never called
            });
            done();
        });
        return [2 /*return*/];
    });
}); });
describe('API tests for all routes', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //routing to serverHostName/api/v1/indego-data-fetch-and-store-it-db'
        it("POST request and should return successfull with 200 response on " + serverHostName + "/api/v1/indego-data-fetch-and-store-it-db", function (done) {
            node_fetch_1.default(serverHostName + "/api/v1/indego-data-fetch-and-store-it-db", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "" + authToken
                }
            })
                .then(function (res) { return res.json(); })
                .then(function (response) {
                chai_2.expect(response).to.be.not.equal(undefined);
                chai_2.expect(response).to.be.not.equal(null);
                chai_2.expect(response.status).to.be.equal(200);
                done();
            })
                .catch(function (error) {
                // never called
            });
        });
        it("POST request and should return Unauthorized with 401 response on " + serverHostName + "/api/v1/stations?at=2021-03-11T12:52:04.859Z", function (done) {
            node_fetch_1.default(serverHostName + "/api/v1/indego-data-fetch-and-store-it-db", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: ""
                }
            })
                .then(function (res) { return res.json(); })
                .then(function (response) {
                chai_2.expect(response).to.be.not.equal(undefined);
                chai_2.expect(response).to.be.not.equal(null);
                chai_2.expect(response.status).to.be.equal(400);
                done();
            });
        });
        //routing to serverHostName/api/v1/stations?at=2021-03-10T10:01:03.865Z'
        it("GET request and should return successfull with 200 response on " + serverHostName + "/api/v1/stations?at=2021-03-11T12:52:04.859Z", function (done) {
            node_fetch_1.default(serverHostName + "/api/v1/stations/2021-03-11T12:52:04.859Z", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken
                }
            })
                .then(function (res) { return res.json(); })
                .then(function (response) {
                chai_2.expect(response).to.be.not.equal(undefined);
                chai_2.expect(response).to.be.not.equal(null);
                chai_2.expect(response.status).to.be.equal(200);
                done();
            });
        });
        it("GET request and should return Unauthorized with 401 response on " + serverHostName + "/api/v1/stations?at=2021-03-11T12:52:04.859Z", function (done) {
            node_fetch_1.default(serverHostName + "/api/v1/stations/2021-03-11T12:52:04.859Z", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: ""
                }
            })
                .then(function (res) { return res.json(); })
                .then(function (response) {
                chai_2.expect(response).to.be.not.equal(undefined);
                chai_2.expect(response).to.be.not.equal(null);
                chai_2.expect(response.status).to.be.equal(400);
                done();
            });
        });
        //routing to serverHostName/api/v1/stations/KIOSKID_GOES_HERE?at=2021-03-10T10:01:03.865Z'
        it("GET request and should return successfull with 200 response on " + serverHostName + "/api/v1/stations/KIOSKID_GOES_HERE?at=2021-03-11T12:52:04.859Z", function (done) {
            node_fetch_1.default(serverHostName + "/api/v1/stations/3005/2021-03-11T12:52:04.859Z", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "" + authToken
                }
            })
                .then(function (res) { return res.json(); })
                .then(function (response) {
                chai_2.expect(response).to.be.not.equal(undefined);
                chai_2.expect(response).to.be.not.equal(null);
                chai_2.expect(response.status).to.be.equal(200);
                done();
            });
        });
        it("GET request and should return Unauthorized with 401 response on " + serverHostName + "/api/v1/stations?at=2021-03-11T12:52:04.859Z", function (done) {
            node_fetch_1.default(serverHostName + "/api/v1/stations/3005/2021-03-11T12:52:04.859Z", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: ""
                }
            })
                .then(function (res) { return res.json(); })
                .then(function (response) {
                chai_2.expect(response).to.be.not.equal(undefined);
                chai_2.expect(response).to.be.not.equal(null);
                chai_2.expect(response.status).to.be.equal(400);
                done();
            });
        });
        return [2 /*return*/];
    });
}); });
