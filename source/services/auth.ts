/**
 * Helper function to verify token
 */
 import { NextFunction, Request, Response } from 'express';
 import { verify } from 'jsonwebtoken';
 import config from '../config/config';
 
 /**
  * authenticateToken - Verify user token from header.
  * @param token - request from parameters
  * @returns {Promise<void>}
  */
 const authenticateToken = function (token: any) {
     try {
         let verified: any = verify(token, config.auth.SECRET_KEY);
         if (verified._id == config.auth.ID) {
             return {
                 status: 200,
                 data: verified,
                 error: null
             };
         } else {
             return {
                 status: 401,
                 data: null,
                 error: 'Unauthorized'
             };
         }
     } catch (error) {
         return {
             status: 400,
             data: null,
             error: 'Bad Request'
         };
     }
 };
 
 export default authenticateToken;
 