import React,{Component} from 'react';
import './cat.css';

export default class Categories extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <ul className="menu">
                    <li className="ge selected"><a href="#" myvalue="general" onClick={this.props.sendData}><span>General</span></a></li>
                    <li className="sp"><a href="#" myvalue="sports" onClick={this.props.sendData}><span>Sports</span></a></li>
                    <li className="he"><a href="#" myvalue="health" onClick={this.props.sendData}><span>Health</span></a></li>
                    <li className="en"><a href="#" myvalue="entertainment" onClick={this.props.sendData}><span>Entertainment</span></a></li>
                    <li className="te"><a href="#" myvalue="technology" onClick={this.props.sendData}><span>Technology</span></a></li>
                    <li className="bu"><a href="#" myvalue="business" onClick={this.props.sendData}><span>Business</span></a></li>
                    <li className="sc"><a href="#" myvalue="science" onClick={this.props.sendData}><span>Science</span></a></li>
                </ul>
            </div>
        )
    }
}