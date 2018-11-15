import React,{Component} from 'react';
import './news.css';
import Comments from './comments';

export default class News extends Component{
    constructor(props){
        super(props);
        this.state={data:{}};
        this.got=false;
        this.callAjax.bind(this);
    }
    sendRec(cat,id){
        fetch('http://localhost:5000/api/news/'+cat+'/'+id,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
              }
        }).then(response=>response.json().then(data=>console.log(data)).catch(err=>console.log(err))).catch(err=>console.log(err));
    }
    callAjax(category){
        this.got=false;
        this.setState({data:{}});
        if(category=='general'){
            this.componentDidMount();
            return;
        }
        fetch('http://localhost:5000/api/news/'+category,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
              }
        }).then(response=>{
            response.json().then(datas=>{
                this.got=true;
                this.setState({data:datas});
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    }
    addComment(object){
        var comm = this.refs.comment.value;
        this.refs.comment.value='';
        var obj = {
            id:object.id,
            comment:comm,
            category:object.category
        }
        //  Send category, and article id,comment
        fetch('http://localhost:5000/api/news/addComment',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response=>{response.json().then(data=>this.setState({})).catch(err=>console.log(err))}).catch(err=>console.log(err));
        // this.setState({});
    }
    render(){
        
        if(!this.got){
            return(
                <div className="midd">
                <img src={require('../../../Images/load.gif')} alt="Loading..."/>
                </div>
            )
        }
        else{
            return(
            <div>
                {this.state.data.map(Obj=>{
                    return(
                        <div>
                        <a className="full col-sm-12 col-12"  key={Obj.publishedAt} href={Obj.url} onClick={()=>{
                            if(Obj.category){
                            this.sendRec(Obj.category,Obj._id);
                        }
                        }} target='_blank'>
                            <img src={Obj.urlToImage} alt={Obj.category} className="col-12 col-sm-12"/>
                            <br/><br/>
                            <h4>{Obj.title}</h4>
                            <p>{Obj.description+'...'} </p>
                            <p>Source : {Obj.source.name}</p>
                        </a>
                            <input type="text" placeholder="Enter comment" ref="comment" onSubmit={this.addComment.bind(this,Obj)}/>
                            {  
                                this.state.data.comments.map(com=>{
                                    <Comments text={com.text} key={com._id}/>
                
                                })
                            }
                            </div>
                    )
                })}
            
            </div>
        )
    }
    }
    componentDidMount(){
        fetch('https://newsapi.org/v2/everything?pageSize=15&language=en&q=s',{
            method:'GET',
            headers:{
                'X-Api-Key':'41328392a1424640ae7813c460f22a58'
              }
        }).then(response=>{
            response.json().then(data=>{
                // console.log("Got Data");
                this.got=true;
                this.setState({data:data.articles});
                this.setState({});
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    }
}