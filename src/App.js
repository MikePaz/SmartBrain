import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import React, { Component } from 'react';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey:'8b4cf86076f742de90e0121a6b772abc'
});

const particleOptions = {
  particles : {
   number: {
      value:300,
      density:{
        eanble:true,
        value_area:800
      }
   } 
}
}


class App extends Component 
  {
  constructor() {
    super();
    this.state = {
      input : '' ,
      imageUrl:''
    }
  }

    onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input})

    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
        this.state.input
    )
    .then(function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        })
}
  
  render() {
    return (
    
    <div className="App">
      <Particles className='particles' params={particleOptions} />
      <Navigation/>
       <Logo/>
       <Rank/>
       <ImageLinkForm onInputChange={this.onInputChange}
                      onButtonSubmit={this.onButtonSubmit}/>
       <FaceRecognition imageUrl={this.state.imageUrl}/> 
    </div>
  );
}
  }
export default App;
