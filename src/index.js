import React, {setGlobal} from 'reactn';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

setGlobal({
    isLoggedIn: false,
    app_key: "GUZT66ZXQJX4AJELKJD5",
    api: "https://www.eventbriteapi.com/v3/",
    fb_key: "2257400374502466"
})

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
