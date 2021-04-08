import React,{useState,useEffect,useReducer} from 'react';

function Mood(){
    const [started,toggle]=useReducer(
        (started)=>!started,
        false
    );
    useEffect(()=>{
        console.log({currmood},[currmood]);
    });
    const [currmood,setmood]=useState("HAPPY");
    return(
        <>
        <h1>I am feeling {currmood} today!</h1>
        <button onClick={()=>setmood("SAD")}>SAD</button>
        <button onClick={()=>setmood("LOST")}>LOST</button>
        <button onClick={()=>setmood("HAPPY")}>HAPPY</button>
        <p><h1>HAVE YOU STARTED HUSTLIN!</h1></p>
        <input type="checkbox" value={started} onChange={toggle}></input>
        <p>{started? "SUCESSFUL FUTURE" : "START HUSTLIN" }</p> 
        </>
        
    )
}

export default Mood;