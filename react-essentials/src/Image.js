import React,{Component} from 'react';

class Image extends Component{
    constructor(){
        super();
        this.state={
            src:"https://miro.medium.com/max/3840/1*yjH3SiDaVWtpBX0g_2q68g.png"
        }
    }
    change_to_cpp(){
        this.setState({
            src:"https://engineering.fb.com/wp-content/uploads/2015/06/1522635669452_11.jpg"
        })
    }
    change_to_react(){
        this.setState({
            src:"https://miro.medium.com/max/3840/1*yjH3SiDaVWtpBX0g_2q68g.png"
        })
    }
    render(){
        return(
            <div>
            <img src={this.state.src} height={200}  alt={this.props.alt_text}/>
            <p></p>
            <button onClick={()=>this.change_to_cpp()}>CPP</button>
            <button onClick={()=>this.change_to_react()}>REACT</button>
            </div>
            )
    }
}

export default Image;