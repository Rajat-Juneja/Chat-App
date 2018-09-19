import React from 'react';
import {connect} from 'react-redux';
import '../second.css';
import {Redirect} from 'react-router-dom';

export const Count = (props) =>{
    // if(!props.users){
    //     var code =  <Redirect to="/chatauth"/>
    //     }
    //     else{
    //         var code = <h2 className="center">Total Users Online : {props.users || 'N.A.'}</h2>
    //     }
    return(
        // <div>
        // {code}
        // </div>
        <h2 className="center">Total Users Online : {props.users || localStorage.getItem('online')}</h2>
    )
}

// const mapStateToProps = (state)=>{
//     if(state.socket && state.users){
//         var socks = state.socket;
//         return {users:state.users,socket:socks};
//     }
//     return {}
// }

// export default connect(mapStateToProps)(Count);