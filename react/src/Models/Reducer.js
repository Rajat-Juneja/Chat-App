export const Reducer = (state={},action) =>{
    // if(action.type=="ADD"){
    //     let result = parseInt(action.payLoad.first) + parseInt(action.payLoad.second);
    //     state = {...state,result:result};
    //     return state;
    // }
    if(action.type=='SOCKET'){
        state={...state,socket:action.payLoad.socket};
        return state;
    }
    else
    if(action.type=='COUNT'){
        state={...state,users:action.payLoad.users};
        return state;
    }

    return state;
}