import {CREATE_STATION} from '../constants/createStation'
import {actions} from '../../utils/helperFunctions'
import {axiosConfig} from '../../config/axiosConfig'

export const createStation  = () => async (dispatch: (arg0: { type: string; payLoad?: any; err?: any; }) => void)  =>{
    dispatch(actions.loading(CREATE_STATION))
    try {
        let apiCall = await axiosConfig.post('/api/v1/indego-data-fetch-and-store-it-db',{
            heaader:{
                authorization: `${process.env.REACT_APP_TOKEN}`
            }
        })
        dispatch(actions.success(CREATE_STATION,apiCall.data.data))
    } catch (err) {
        dispatch(actions.failure(CREATE_STATION,err))        
    }
}