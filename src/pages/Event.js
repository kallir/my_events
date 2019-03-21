import React, {Component} from "reactn";
import axios from "axios";

export default class Event extends Component{
    constructor(){
        super();
        this.state = {
            event_id: "",
            title: "",
            description: "",
            logo_url: "",
            venue_id: "",
            venue_name: "",
            address: "",
            postal_code: "",
            city: ""
        }
    }

    componentDidMount = () => {
        this.getEventId();
    }
    getEventId = () => {
        this.getEventInfo(window.location.href.slice(28))
    }

    getEventInfo(id){
        axios.get(this.global.api + "events/"+id+"/?token="+this.global.app_key)
        .then((response) => {
            this.setState({
                title: response["data"]["name"]["text"],
                description: response["data"]["description"]["text"],
                logo_url: response["data"]["logo"]["url"]
            })
            this.getVenue(response["data"]["venue_id"]);
        })
        .catch((error) => {
        console.log(error)
        })
    }
    getVenue = (id) => {
        axios.get(this.global.api + "venues/"+id+"/?token="+this.global.app_key)
        .then((response) => {
            this.setState({
                venue_name: response["data"]["name"],
                address: response["data"]["address"]["address_1"],
                postal_code: response["data"]["address"]["postal_code"],
                city: response["data"]["address"]["city"]
            })
        })
        .catch((error) => {
        console.log(error)
        })
    }
    render() {
        return (
          <div className="container">
          <br/>
              <img src={this.state.logo_url} alt="Event logo"/>
              <h4>{this.state.title}</h4>
              <h6>{this.state.venue_name} - {this.state.address}, {this.state.postal_code} {this.state.city}</h6>
              <p>{this.state.description}</p>
          </div>
        );
      }
}