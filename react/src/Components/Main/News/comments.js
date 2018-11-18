import React from 'react';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css'

const Comments = (props)=>{
    var smiley = <i className="fa fa-frown-o" style={{color:'red',fontSize:'24px',fontWeight:'900'}} aria-hidden="true"></i>
    if(props.sentiment==1){
        smiley = <i className="fa fa-smile-o" style={{ color: 'yellow' }} aria-hidden="true"></i>
    }
    return(
        <div>
            <p>{props.text}&nbsp;&nbsp;&nbsp;{smiley}</p>
            
        </div>
    )

}

export default Comments;