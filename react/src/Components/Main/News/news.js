import React,{Component} from 'react';
import './news.css';

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