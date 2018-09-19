import React,{Component} from 'react';
import {Count} from './Count/count';
import Bottom from './Botttom/bottom';
import Chat from './MainChat/chat';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class SecondChat extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Count users={this.props.users}></Count>
                <Chat></Chat>
                <Bottom></Bottom>
            </div>
        )
    }
    componentDidMount(){
        if(!this.props.socket){
            this.props.history.push('/chatauth');
            return;
        }
    }
}

const mapStateToProps=(state)=>{
    if(state.socket && state.users){
        var socks = state.socket;
        return {users:state.users,socket:socks};
    }
    return {}
}

export default withRouter(connect(mapStateToProps)(SecondChat));