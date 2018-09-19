import React,{Component} from 'react';
import {connect} from 'react-redux';
import '../second.css';

class Chat extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
            Welcome the Chat
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    if(state.socket){
        var sock = state.socket;
        return {socket:sock};
    }
    return {};
}

export default connect(mapStateToProps)(Chat);