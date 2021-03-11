import React from 'react'
import {connect, RootStateOrAny} from 'react-redux'
import styled from 'styled-components'
import IndegoHeader from '../components/IndegoHeader'


const LandingPage : React.FC = () =>{
    return(
        <div>
            <IndegoHeader />
        </div>
    )
}

const mapStateToProps = (state:RootStateOrAny) =>{
    return{
        createStationReducer: state.createStationReducer
    }
}

export default connect(mapStateToProps,null)(LandingPage)
