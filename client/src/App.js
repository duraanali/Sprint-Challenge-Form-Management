import React from 'react';
import './App.css';
import Register from "./components/Register"
import axios from 'axios';

export default class App extends React.Component {
  state = {
    information: [{}]
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/restricted/users`)
      .then(res => {
        console.log(res);
        const information = res.data;
        this.setState({ information });
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Register />
          <h2>User Information</h2>

          {this.state.information.map(info =>


            <li>Username: {info.username}</li>


          )}

        </header>
      </div>

    )
  }
}