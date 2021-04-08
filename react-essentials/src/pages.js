import React from "react";
import { useLocation } from "react-router";

export function Home(){
    return(
        <div>
            <h1>HOME PAGE!</h1>
        </div>
    )
}

export function About(){
    return(
        <div>
            <h1>ABOUT</h1>
        </div>
    )
}

export function Error404(){
    let location=useLocation()
    return(<h1>Resource Doesn't Exists at{location.pathname}!</h1>)
}