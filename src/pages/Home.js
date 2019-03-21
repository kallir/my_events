import React, {Component} from "reactn";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import axios from "axios";
import './Home.css';

export default class Home extends Component {

  constructor(){
    super();
    this.state = {
      events: [],
      categories: [],
      category : "",
      category_id: "",
      location: "",
      current_page: 1,
      events_per_page: 8,
      scroll: false
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.scrollBackTop);
}

  scrollBackTop = () => {
    if (window.pageYOffset > 0){
      this.setState({scroll: true});
    } else {
      this.setState({scroll: false});
    }
  }

  componentWillMount(){
    this.getCity();
    this.getCategories();
  }
  
  scrollTop = () => {
    document.documentElement.scrollTop = 0;
  }
  pageClick = (event) => {
    this.setState({
      current_page: Number(event.target.id)
    })  
  }
  getCategories = () => {
    var cats = []
    axios.get(this.global.api + "categories/?token="+this.global.app_key)
    .then((response) => {
      response["data"]["categories"].forEach(function(v, k){
        cats.push([v["id"], v["name"]])
      })
      this.setState({categories: cats})
    })
    .catch((error) => {
      console.log(error);
    })
  }
  handleChange = (event) => {
      if (event.target.id === "category"){
        this.setState({
          category_id: event.target[event.target.selectedIndex].id
        })
      }
      this.setState({
        [event.target.id]: event.target.value
      })
  }
  handleSubmit = (event) => {
    var events_list = [];
    event.preventDefault();
    axios.get(this.global.api + "events/search/?location.address="+this.state.location+"&categories="+this.state.category_id+"&token="+this.global.app_key)
    .then((response) => {
      response["data"]["events"].forEach(function(v,k){
        if(v["logo"]!==null){
          events_list.push([v["name"]["text"],v["description"]["text"] ,v["logo"]["url"], v["id"]]);
        }
      })
      this.setState({events: events_list});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getCity(){
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  showPosition = (position) => {
    var coords = [position.coords.latitude, position.coords.longitude];
    this.getEvents(coords);
  }

  getEvents = (coords) => {
    var events_list = []
    axios.get(this.global.api + "/events/search/?location.latitude="+coords[0]+"&location.longitude="+ coords[1]+"&token="+this.global.app_key)
    .then((response) => {
      response["data"]["events"].forEach(function(v,k){
        if(v["logo"]!==null){
            events_list.push([v["name"]["text"],v["description"]["text"] ,v["logo"]["url"], v["id"]]);
        }
      })
      this.setState({events: events_list});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const {current_page, events_per_page} = this.state;
    const indexOfLastEvent = current_page * events_per_page;
    const indexOfFirstEvent = indexOfLastEvent - events_per_page;
    const currentEvents = this.state.events.slice(indexOfFirstEvent, indexOfLastEvent);

    var cats = this.state.categories.map(function(cats, key){
      return <option id={cats[0]} key = {key}>{cats[1]}</option>
    })
    if (this.state.events.length > 0){
     var events = currentEvents.map(function(event, key){
        return <Card key={key} border="light">
          <Card.Body>
             <Card.Img variant="top" src={event[2]} />
             <Card.Title><Link to={`event/${event[3]}`}>{event[0]}</Link></Card.Title>
             <Card.Text>{event[1]}</Card.Text>
          </Card.Body>
        </Card>
      })
    }
    var numberOfPages = Math.ceil(this.state.events.length/events_per_page)-1;
    return (
      <div className="container">
        <div className="menu">
          <h4>Filtres</h4>
          <Form className="event_search" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Categories</Form.Label>
              <Form.Control as="select" id ="category" value={this.state.category} onChange={this.handleChange}>
                {cats}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control type="text" id ="location" value={this.state.location} onChange={this.handleChange}/>
            </Form.Group>
            <Button variant="light" type="submit">Search</Button>
          </Form>
          { current_page -1 >= 1 &&
          <p className="pag prev round" id={current_page - 1} onClick={this.pageClick}>&#8249; </p>
        }
        { current_page +1 <= numberOfPages &&
        <p className="pag next round" id={current_page +1} onClick={this.pageClick}>&#8250;</p>
        }
        { this.state.scroll &&
          <p onClick={this.scrollTop}>&#8593;</p>  
        }
        </div>
        <div className="body">
          <h4>Events à venir</h4>
          {events}
        </div>
      </div>
    );
  }
}