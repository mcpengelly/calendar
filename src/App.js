import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // wraps the app component for access to material-ui components
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

import TimesheetForm from './components/TimesheetForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  render() {
    //example list
    let posts = this.state.posts.map(post => {
      return <li id={post.id}>{post.body}</li>;
    });

    return (
      <MuiThemeProvider>
        <div className="App">
          <p className="App-intro" />

          <input
            type="button"
            onClick={this.onTestClick.bind(this)}
            value="testAPI"
          />
          <RaisedButton
            label="Raised Button example"
            onClick={this.onMaterialUiButtonClick.bind(this)}
          />
          <input type="textbox" />
          <br />
          <ul>{posts}</ul>

          <TimesheetForm />
        </div>
      </MuiThemeProvider>
    );
  }

  onTestClick() {
    console.log('onTestClick() click handler, check console for results');
    this.fetchPosts();
  }

  // example fetch
  async fetchPosts() {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await posts.json();
    console.log(data);
    this.setState({ posts: data });
  }

  onMaterialUiButtonClick() {
    console.log('onMaterialUiButtonClick()');
  }
}

export default App;
