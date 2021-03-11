import {GET_STATION} from '../constants/getStation'
import {actions} from '../../utils/helperFunctions'
import {axiosConfig} from '../../config/axiosConfig'

export const getStation  = () => async (dispatch: (arg0: { type: string; payLoad?: any; err?: any; }) => void)  =>{
    dispatch(actions.loading(GET_STATION))
    let myDate = new Date().toISOString()
    console.log('My Date > ' , myDate)
    let time = '2021-03-10T10:01:03.865Z'
    try {
        let apiCall = await axiosConfig.get(`/api/v1/stations/${time}`,{
            headers:{
                authorization: `${process.env.REACT_APP_TOKEN}`
            }
        })
        dispatch(actions.success(GET_STATION,apiCall.data.data))
    } catch (err) {
        dispatch(actions.failure(GET_STATION,err))        
    }
}