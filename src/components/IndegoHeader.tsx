import React from 'react'
import styled from 'styled-components'
import { getStation } from '../reudx/actions/getStation'
import {connect, RootStateOrAny} from 'react-redux'




const IndegoHeader = (props:any) =>{
    React.useEffect(()=>{
        props.getStation()
    },[])

    return(
        <div>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:150, backgroundColor:'#000'}}>
                <h2 style={{color:'#fff'}}>Welcome To Indego</h2>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'100%', backgroundColor:'#E1E1E1'}}>
                <p>Date-Time:  </p><input></input>
                
            </div>
            <div>
                
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch:any) =>{
    return{
        getStation: () => dispatch(getStation())
    }
}

export default connect(null,mapDispatchToProps)(IndegoHeader)