import React,{Component} from 'react';
import '../second.css';
import {connect} from 'react-redux';


class Bottom extends Component{
    constructor(props){
        super(props);
    }

    Send(e){
        e.preventDefault();
        var msg = this.refs.text.value;
        this.props.socket.emit('send message',msg);
        this.refs.text.value='';
    }

    render(){
        return(
            <form className="stickbottom">
                <textarea name="" id="" ref="text" cols="30" rows="2"></textarea>
                <input type="submit" value="Send" className="sub" onClick={this.Send.bind(this)}/>
            </form>
        )
    }
}

const mapStateToProps = (state) =>{
    if(state.socket){
        var sock = state.socket;
        return{socket:sock};
    }
    return {};
}

export default connect(mapStateToProps)(Bottom);