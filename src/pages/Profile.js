import React, {Component} from "reactn";
import FacebookLogin from 'react-facebook-login';

export default class Profile extends Component{
  state = {
    userId: '',
    name: '',
    email: '',
    picture: ''
  }
  responseFacebook = response => {
    if (response.status === "unknown"){
      return;
    } 
    this.setState({
      userId: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    })
    this.setGlobal({
      isLoggedIn: true
    })
  }
  
    render() {
      let fbContent;
    if(this.global.isLoggedIn){
      fbContent = (
        <div>
          <img src={this.state.picture} alt="FaceBook profile"/>
          <p>{this.state.name}</p>
          <p>{this.state.email}</p>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId= {this.global.fb_key}
          autoLoad={true}
          fields="name, picture, email"
          callback={this.responseFacebook} />
      );
    }
        return (
          <div className="container">  
            <br/><br/>
            <div>{fbContent}</div>
          </div>
        );
      }
}