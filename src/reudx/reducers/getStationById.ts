import {GET_STATION_BY_ID} from '../constants/getStationById'
import {Action} from '../../types/actionsInterface'

const getStationByIdInitialState = {
    data: null,
    isLoading:false,
    err: null,
}

export const getStationByIdReducer = (state=getStationByIdInitialState,action:Action) =>{
    switch (action.type) {
        case GET_STATION_BY_ID.LOADING:
            return{
                ...state,
                isLoading: true
            }
        case GET_STATION_BY_ID.SUCCESS:
            return{
                ...state,
                data: action.payLoad,
                isLoading: false,
                err: null
            }
        case GET_STATION_BY_ID.FAILURE:
            return{
                ...state ,
                isLoading: false ,
                err: action.err
            }
        default: return state
    }
}
