import {GET_STATION} from '../constants/getStation'
import {Action} from '../../types/actionsInterface'

const getStationInitialState = {
    data: null,
    isLoading:false,
    err: null,
}

export const getStationReducer = (state=getStationInitialState,action:Action) =>{
    switch (action.type) {
        case GET_STATION.LOADING:
            return{
                ...state,
                isLoading: true
            }
        case GET_STATION.SUCCESS:
            return{
                ...state,
                data: action.payLoad,
                isLoading: false,
                err: null
            }
        case GET_STATION.FAILURE:
            return{
                ...state ,
                isLoading: false ,
                err: action.err
            }
        default: return state
    }
}
