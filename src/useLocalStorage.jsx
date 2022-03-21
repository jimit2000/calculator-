import React,{useState} from "react";

const setIntialValue = (name,initialState) =>{

   try{ const check  = localStorage.getItem(name);
    let reValue = check ? JSON.parse(check) : initialState;
    
    if(reValue instanceof Function){
        return reValue();
    }
    return reValue;
    }catch(err){
        console.log(err);
    }
}

const useLocalStorage = (name,initialState) =>{

    const [value,setValue] = useState(()=>{
        return setIntialValue(name,initialState);
    });

    localStorage.setItem(name,JSON.stringify(value));

    

    return [value,setValue] 

}

export default useLocalStorage;