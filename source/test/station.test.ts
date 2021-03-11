import chai from 'chai';
import chaifs from 'chai-fs';
import { expect } from 'chai';
import sinon from 'sinon';
import { generateStation, getStationAndWeatherData, getStationAndWeatherDataByKioskId } from '../controllers/station';
import authenticateToken from '../services/auth';
import Station from '../models/station';
import fetch from 'node-fetch';

chai.use(require('chai-fs'));
chai.use(chaifs);

// Env Variables
const authToken = `${process.env.STATIC_JWT}`;
const serverHostName = process.env.SERVER_HOSTNAME || 'localhost';

describe('station insertion unit test case', async () => {
    it('should return error from station save', function (done) {
        let error = true;
        let obj = {};
        const isSaveMethodCalled = sinon.stub(Station.prototype, 'save').yields(error, null);
        generateStation(obj)
            .then((res) => {
                // never called
            })
            .catch((error) => {
                expect(error).to.be.not.equal(undefined);
                expect(error).to.be.equal(true);
                expect(isSaveMethodCalled.calledOnce).to.be.equal(true);
                isSaveMethodCalled.restore();
                done();
            });
    });
    it('should return station object from station save', function (done) {
        let error = false;
        let newObj = {
            data: {
                feature: [],
                type: 'string'
            },
            createdAt: '2021-03-11T12:52:04.859Z',
            updatedAt: '2021-03-11T12:52:04.859Z'
        };
        const isSaveMethodCalled = sinon.stub(Station.prototype, 'save').yields(error, newObj);
        generateStation(newObj)
            .then((res) => {
                expect(res).to.be.not.equal(undefined);
                expect(res).to.be.not.equal(null);
                expect(newObj.createdAt).to.be.an('string');
                expect(newObj.data).to.be.equals(newObj.data);
                expect(newObj.updatedAt).to.be.an('string');
                expect(isSaveMethodCalled.calledOnce).to.be.equal(true);
                isSaveMethodCalled.restore();
                done();
            })
            .catch((error) => {
                // never called
            });
    });
});

describe('Issue jwt token by user id unit test case', async () => {
    it('should return success from verify jwt token check', async function (done) {
        let token: string = authToken;
        let result: any = authenticateToken(token);
        if (result.status == 200) {
            expect(result).to.be.not.equal(undefined);
            expect(result).to.be.not.equal(null);
            expect(result.data._id).to.be.an('string');
            done();
        } else {
            // never called
        }
    });

    it('should return unauthrorized from verify jwt token check failed unit', async function (done) {
        let token: string = authToken;
        let result: any = authenticateToken(token);
        if (result.status == 200) {
            // never called
        } else {
            expect(result).to.be.not.equal(undefined);
            expect(result).to.be.not.equal(null);
            expect(result.data).to.be.equal(null);
            expect(result.status).to.be.equal(401);
            expect(result.error).to.be.equal('Unauthorized');
            done();
        }
    });

    it('should return bad request from verify jwt token check failed unit', async function (done) {
        let token: string = '';
        let result: any = authenticateToken(token);
        if (result.status == 200) {
            // never called
        } else {
            expect(result).to.be.not.equal(undefined);
            expect(result).to.be.not.equal(null);
            expect(result.data).to.be.equal(null);
            expect(result.status).to.be.equal(400);
            expect(result.error).to.be.equal('Bad Request');
            done();
        }
    });
});

describe('station get unit test case by date', async () => {
    it('should return error on getting station from database', async function (done) {
        let at = '2021-03-11T12:52:04.859Z';
        getStationAndWeatherData(at)
            .then((res: any) => {
                // never called
            })
            .catch((error: any) => {
                expect(error).to.be.not.equal(undefined);
                expect(error).to.be.equal(true);
            });
        done();
    });
    it('should return station object on getting station from database', async function (done) {
        let at = '2021-03-11T12:52:04.859Z';
        getStationAndWeatherData(at)
            .then((res: any) => {
                expect(res).to.be.not.equal(undefined);
                expect(res).to.be.not.equal(null);
                expect(res.Obj).to.be.an('object');
            })
            .catch((error: any) => {
                // never called
            });
        done();
    });
});

describe('station get unit test case by date and Kiosk Id', async () => {
    it('should return error on getting station from database', function (done) {
        let at = '2021-03-11T12:52:04.859Z';
        let id = '6043ed5623dab91c48889090';
        getStationAndWeatherDataByKioskId(id, at)
            .then((res: any) => {
                // never called
            })
            .catch((error: any) => {
                expect(error).to.be.not.equal(undefined);
                expect(error).to.be.equal(true);
            });
        done();
    });
    it('should return station object on getting station from database', function (done) {
        let at = '2021-03-11T12:52:04.859Z';
        let id = '6043ed5623dab91c48889090';
        getStationAndWeatherDataByKioskId(id, at)
            .then((res: any) => {
                expect(res).to.be.not.equal(undefined);
                expect(res).to.be.not.equal(null);
                expect(res.Obj).to.be.an('object');
            })
            .catch((error: any) => {
                // never called
            });
        done();
    });
});

describe('API tests for all routes', async () => {
    //routing to serverHostName/api/v1/indego-data-fetch-and-store-it-db'
    it(`POST request and should return successfull with 200 response on ${serverHostName}/api/v1/indego-data-fetch-and-store-it-db`, function (done) {
        fetch(`${serverHostName}/api/v1/indego-data-fetch-and-store-it-db`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${authToken}`
            }
        })
            .then((res) => res.json())
            .then(function (response) {
                expect(response).to.be.not.equal(undefined);
                expect(response).to.be.not.equal(null);
                expect(response.status).to.be.equal(200);
                done();
            })
            .catch((error: any) => {
                // never called
            });
    });
    it(`POST request and should return Unauthorized with 401 response on ${serverHostName}/api/v1/stations?at=2021-03-11T12:52:04.859Z`, function (done) {
        fetch(`${serverHostName}/api/v1/indego-data-fetch-and-store-it-db`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ``
            }
        })
            .then((res) => res.json())
            .then(function (response) {
                expect(response).to.be.not.equal(undefined);
                expect(response).to.be.not.equal(null);
                expect(response.status).to.be.equal(400);
                done();
            });
    });

    //routing to serverHostName/api/v1/stations?at=2021-03-10T10:01:03.865Z'
    it(`GET request and should return successfull with 200 response on ${serverHostName}/api/v1/stations?at=2021-03-11T12:52:04.859Z`, function (done) {
        fetch(`${serverHostName}/api/v1/stations/2021-03-11T12:52:04.859Z`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            }
        })
            .then((res) => res.json())
            .then(function (response) {
                expect(response).to.be.not.equal(undefined);
                expect(response).to.be.not.equal(null);
                expect(response.status).to.be.equal(200);
                done();
            });
    });
    it(`GET request and should return Unauthorized with 401 response on ${serverHostName}/api/v1/stations?at=2021-03-11T12:52:04.859Z`, function (done) {
        fetch(`${serverHostName}/api/v1/stations/2021-03-11T12:52:04.859Z`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ``
            }
        })
            .then((res) => res.json())
            .then(function (response) {
                expect(response).to.be.not.equal(undefined);
                expect(response).to.be.not.equal(null);
                expect(response.status).to.be.equal(400);
                done();
            });
    });

    //routing to serverHostName/api/v1/stations/KIOSKID_GOES_HERE?at=2021-03-10T10:01:03.865Z'
    it(`GET request and should return successfull with 200 response on ${serverHostName}/api/v1/stations/KIOSKID_GOES_HERE?at=2021-03-11T12:52:04.859Z`, function (done) {
        fetch(`${serverHostName}/api/v1/stations/3005/2021-03-11T12:52:04.859Z`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${authToken}`
            }
        })
            .then((res) => res.json())
            .then(function (response) {
                expect(response).to.be.not.equal(undefined);
                expect(response).to.be.not.equal(null);
                expect(response.status).to.be.equal(200);
                done();
            });
    });
    it(`GET request and should return Unauthorized with 401 response on ${serverHostName}/api/v1/stations?at=2021-03-11T12:52:04.859Z`, function (done) {
        fetch(`${serverHostName}/api/v1/stations/3005/2021-03-11T12:52:04.859Z`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ``
            }
        })
            .then((res) => res.json())
            .then(function (response) {
                expect(response).to.be.not.equal(undefined);
                expect(response).to.be.not.equal(null);
                expect(response.status).to.be.equal(400);
                done();
            });
    });
});
