/**
 * station controllers
 */

import mongoose from 'mongoose';
import Station from '../models/station';

/**
 * generateStation - insert station in database.
 * @param object - object that needs to be saved
 * @returns {Promise<void>}
 */
const generateStation = async (object: object) => {
    try {
        const station = new Station({
            _id: new mongoose.Types.ObjectId(),
            data: object
        });
        await station.save();
        return station;
    } catch (error) {
        return error;
    }
};

/**
 * getStationAndWeatherData - Get weather and station data from API.
 * @param at - string that needs to be compared
 * @returns {Promise}
 */
const getStationAndWeatherData = async (at: String) => {
    try {
        let station = await Station.findOne({ $or: [{ createdAt: at }, { createdAt: { $gt: at } }] });
        return station;
    } catch (error) {
        console.log('err >>', error);
        return error;
    }
};

/**
 * getStationAndWeatherDataByKioskId - Get weather and station data by its kioski id.
 * @param at - string that needs to be compared
 * @returns {Promise}
 */
const getStationAndWeatherDataByKioskId = async (id: any, at: String ) => {
    try {
        let stations = await Station.findOne({ $or: [{ createdAt: at }, { createdAt: { $gt: at } }] });
        let check: Number = 0;
        let specficStation: object = {};
        for (let i = 0; i < stations?.data.features.length; i++) {
            if (stations?.data.features[i].properties.kioskId == id) {
                specficStation = stations?.data.features[i];
                check = 1;
                break;
            }
        }
        if (check === 1) {
            return specficStation;
        } else {
            return { error: 'Cannot find data' };
        }       
    } catch (err) {
        return err;
    }
};

export { generateStation, getStationAndWeatherData, getStationAndWeatherDataByKioskId };
