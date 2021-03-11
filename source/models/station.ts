/**
 * Station database model
 */

import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import Station from '../interfaces/station';

const StationSchema: Schema = new Schema(
    {
        data: { type: Object }
    },
    {
        timestamps: true
    }
);

StationSchema.post<Station>('save', function () {
    logging.info('Mongo', 'Stations saved: ', this);
});

export default mongoose.model<Station>('Station', StationSchema);
