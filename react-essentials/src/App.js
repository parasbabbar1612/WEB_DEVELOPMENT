import { useEffect, useState } from 'react';
import './App.css';
import Mood from './mood';
import Image from './Image'
import {Routes,Route} from "react-router-dom";
import {Home,About,Error404} from "./pages";
import {Link} from 'react-router-dom';

function Header(props) {
  return (
    <header>
    <h1>FIRST {props.name} APP</h1>
    </header>
  );
}

function Main(props){
  return (
    <section>
    <p>{props.name} is FUN!</p>
    <p>Top languages</p>
    <ul style={{textAlign:'left'}}>
      {props.languages.map((language)=>(<li key={language.id}>{language.language}</li>))}
    </ul>
    </section>
  );
}

function Footer(props) {
  return(
    <footer>
      <p>Copyright {props.year}</p>
    </footer>
  );
}

const Languages=["C++","Java","Javascript"];
const lang_object=Languages.map((lang,i)=>({id:i,language:lang}));

function Setdata(props){
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [err,setError]=useState(null);
  useEffect(()=>{
    if(!props.username) return;
    setLoading(true)
    fetch(`https://api.github.com/users/${props.username}`).then((response)=>response.json()).then(setData).then(setLoading(false)).catch(setError);
  },[])
  if(loading){
    return(<h1>LOADING!!.....</h1>);
  }
  if(err){
    return(<pre>{JSON.stringify(err,null,2)}</pre>)
  }
  if(data){
    return(<div>
      <h2>{data.name}</h2>
      <h3>{data.location}</h3>
      </div>)
  }
  else{
    return(<div>No such User Exists!</div>)
  }
}

function Cpp(props){
  return (
    <div className="App">
      <h1>{props.status}</h1>
      <Header name="C++"/>
      <Main name="C++" languages={lang_object}/>
      <Setdata username={props.username}/>
      <Mood />
      <Image alt_text="IMAGE LOGO"/>
      <Link to="home">Home</Link>
      <Link to="about">About</Link>
      <Footer year={new Date().getFullYear()} />
    </div>
  );
}

function App(props) {
  return (
    <div className="App">
      <h1>{props.status}</h1>
      <Header name="REACT"/>
      <Main name="REACT" languages={lang_object}/>
      <Setdata username={props.username}/>
      <Mood />
      <Image alt_text="IMAGE LOGO"/>
      <Link to="home">Home</Link>
      <Link to="about">About</Link>
      <Footer year={new Date().getFullYear()} />
    </div>
  );
}

function OptionalRender(props){
  return (
    props.cpp?<Cpp status="Hustlin!" username={props.username}/>:<App status="Hustlin!" username={props.username} />  
  )
}

function View(props){
  return (
    <div>
      <Routes>
        <Route path='/' element={<OptionalRender cpp={props.cpp} />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='*' element={<Error404 />}/>
      </Routes>
    </div>
    )
}

export default View;
