import React,{Component} from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router-dom';
import {Store} from '../../../Models/Store';
import {connect} from 'react-redux';
import '../../../../node_modules/socket.io/lib/socket';
import io from 'socket.io-client';
import loader from '../../../Images/load.gif';
import './firstchat.css';

class FirstChat extends Component{
    constructor(props){
        super(props);
        this.state={name:''};
        this.load=false;
        this.socket = io.connect('http://localhost:5000/');
        const payLoad = {socket:this.socket};
        Store.dispatch({type:'SOCKET',payLoad:payLoad});
    }
    submit(e){
        e.preventDefault();
        if(!this.refs.name.value){
            alert("Please enter your name");
            return;
        }
        this.setState({...this.state,name:this.refs.name.value},()=>{
            localStorage.setItem('user',this.state.name);
            this.props.socket.emit('new user',this.state.name,(data)=>{
                if(data){
                    this.load=true;
                    this.setState({...this.state});
                    setTimeout(()=>{this.props.history.push('/chat');},500);
   
                }
            });
            this.refs.name.value='';

            this.props.socket.on('get users',function(data){
                const pay = {users:data.length}
                localStorage.setItem('online',data.length);
                Store.dispatch({type:'COUNT',payLoad:pay});
            })
            this.props.socket.on('disconnected',function(data){
                const pay = {users:data.length}
                Store.dispatch({type:'COUNT',payLoad:pay});
            })


        });
    }
    render(){
        if(!this.load){
        return(
            <div>
               <h3>Enter your name</h3>
               <form>
               <input type="text" ref="name" placeholder="Enter your name" />
               <input type="submit" onClick={this.submit.bind(this)} value="Submit"/>
               </form>
            </div>
        )
        }
        else{
            return(
                <div className="container center">
                    <img src={loader} alt="Loading.."/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state)=>{
    if(state.socket){
        let sockets=state.socket;
        return {socket:sockets};
    }
    return {};
}

export default withRouter(connect(mapStateToProps)(FirstChat));