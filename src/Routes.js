import React from 'reactn';
import {Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Event from './pages/Event';
import Member from './pages/Member';

export default () =>
    <Switch>
        <Route path ="/" exact component={Home}/>
        <Route path ="/profile" exact component={Profile}/>
        <Route path="/event/:eventId" component={Event}/>
        <Route path ="/member" exact component={Member}/>
    </Switch>;