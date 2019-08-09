import React from 'react';
import './App.css';
import Register from "./components/Register"
import axios from 'axios';

export default class App extends React.Component {
  state = {
    information: [{}]
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/restricted/data`)
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
          <h2>Information from restricted Data</h2>

          {this.state.information.map(info =>
            <table>
              <tbody>
                <tr className="tablerow">
                  <td>Name: {info.name}</td>
                </tr>
                <tr className="tablerow">
                  <td>Course: {info.course}</td>
                </tr>
                <tr className="tablerow">
                  <td>Technique: {info.technique}</td>
                </tr>
                <tr className="tablerow">
                  <td>Ingredients: {info.ingredients}</td>
                </tr>

              </tbody>
            </table>
          )}

        </header>
      </div>

    )
  }
}