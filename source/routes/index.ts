/**
 * Station routes
 */

import express from 'express';
import fetch from 'node-fetch';
import config from '../config/config';
import { generateStation, getStationAndWeatherData, getStationAndWeatherDataByKioskId } from '../controllers/station';
import authenticateToken from '../services/auth';
import { RIDEINDEGO_URL, GET_WEATHER_URL } from '../utils/enums';

const router = express.Router();

router.post('/indego-data-fetch-and-store-it-db', async (req, res) => {
    try {
        let verified = await authenticateToken(req.headers.authorization);
        // console.log('verified >>', verified);
        if (verified && verified.status === 200) {
            let response = await fetch(`${RIDEINDEGO_URL}`);
            let responseJSON = await response.json();
            let data = await generateStation(responseJSON);
            // console.log("data >>", data);
            if (data) {
                return res.status(200).json({
                    status: 200,
                    data: data,
                    error: null
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    data: null,
                    error: 'Could not create any station at the given time'
                });
            }
        } else {
            return res.status(401).json({
                status: 401,
                data: null,
                error: 'Unauthorized.'
            });
        }
    } catch (err) {
        // catches errors both in fetch and response.json
        return res.status(400).json({
            status: 400,
            data: null,
            error: err.message
        });
    }
});

router.get('/stations/:at', async (req, res) => {
    console.log('/stations/:at', req.params.at);
    try {
        let verified = await authenticateToken(req.headers.authorization);
        // console.log('verified >>', verified);
        if (verified && verified.status === 200) {
            let response = await fetch(`${GET_WEATHER_URL}=Philadelphia&appid=${config.auth.API_KEY}`);
            let responseJSON = await response.json();
            let data = await getStationAndWeatherData(req.params.at);
            if (data) {
                let obj = {
                    at: req.params.at,
                    weather: responseJSON,
                    station: data
                };
                return res.status(200).json({
                    status: 200,
                    data: obj,
                    error: null
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    data: null,
                    error: 'Bad request'
                });
            }
        } else {
            return res.status(401).json({
                status: 401,
                data: null,
                error: 'Unauthorized.'
            });
        }
    } catch (err) {
        // catches errors both in fetch and response.json
        console.log('error >', err);
        return res.status(400).json({
            status: 400,
            data: null,
            error: err
        });
    }
});

router.get('/stations/:kioskId/:at', async (req, res) => {
    try {
        let verified = await authenticateToken(req.headers.authorization);
        // console.log('verified >>', verified);
        if (verified && verified.status === 200) {
            let response = await fetch(`${GET_WEATHER_URL}=Philadelphia&appid=${config.auth.API_KEY}`);
            let responseJSON = await response.json();
            let data = await getStationAndWeatherDataByKioskId(req.params.kioskId, req.params.at);
            let obj = {
                at: req.params.at,
                weather: responseJSON,
                station: data
            };
            if (data) {
                return res.status(200).json({
                    status: 200,
                    data: obj,
                    error: null
                });
            }
            else {
             return res.status(400).json({
                 status: 400,
                 data: null,
                 error: 'Bad request.'
             });
         }
        } else {
            return res.status(401).json({
                status: 401,
                data: null,
                error: 'Unauthorized.'
            });
        }
    } catch (err) {
        // catches errors both in fetch and response.json
        return res.status(400).json({
            status: 400,
            data: null,
            error: err
        });
    }
});

export = router;
