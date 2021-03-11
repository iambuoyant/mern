import {GET_STATION_BY_ID} from '../constants/getStationById'
import {actions} from '../../utils/helperFunctions'
import {axiosConfig} from '../../config/axiosConfig'

export const getStationById  = (id:string,time:string) => async (dispatch: (arg0: { type: string; payLoad?: any; err?: any; }) => void)  =>{
    dispatch(actions.loading(GET_STATION_BY_ID))
    try {
        let apiCall = await axiosConfig.get(`/api/v1/stations/${id}/${time}`,{
            headers:{
                authorization: `${process.env.REACT_APP_TOKEN}`
            }
        })
        dispatch(actions.success(GET_STATION_BY_ID,apiCall.data.data))
    } catch (err) {
        dispatch(actions.failure(GET_STATION_BY_ID,err))        
    }
}