import React,{Component} from 'react';
import News from './News/news';
import Categories from './Categories/categories';

export default class Main extends Component{
    
    constructor(){
        super();
        this.cat='';
    }
    getData(event){
        // console.log(event.target.getAttribute('myvalue')); // For getting heading for data call
        // console.log(event.target.childNodes[0].innerText); // For InnerText
        for(let i=0;i<event.target.parentNode.parentNode.children.length;i++){
            event.target.parentNode.parentNode.children[i].classList.remove('selected');
        }
        event.target.parentNode.classList.add('selected');
        // this.callAjax(event.target.getAttribute('myvalue'));
        this.cat=event.target.getAttribute('myvalue');
        this.refs.news.callAjax(this.cat);
    }
    // callAjax(category){
    //     fetch('http://localhost:5000/api/news/'+category,{
    //         method:'GET',
    //         headers:{
    //             'Content-Type': 'application/json'
    //           }
    //     }).then(response=>{
    //         response.json().then(data=>{
    //             console.log(data);
    //         }).catch(err=>console.log(err));
    //     }).catch(err=>console.log(err));
    // }
    render(){
        return(
            <div>
                <Categories sendData={this.getData.bind(this)}></Categories>
                <News ref="news"></News>
            </div>
        )
    }
}