import {constantInterface} from '../types/constantInterface'

export const actions = {
    loading: (actionTtype:constantInterface) =>{
      return{
          type: actionTtype.LOADING ,
      }
    },
    
    success: (actionType:constantInterface,data:any) =>{
      return{
          type: actionType.SUCCESS ,
          payLoad: data
      }
    },
    
    failure: (actionType:constantInterface,err:any) =>{
      return{
          type: actionType.FAILURE ,
          err: err
      }
    },
  
  }