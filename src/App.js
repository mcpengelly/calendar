import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // wraps the app component for access to material-ui components
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  render() {
    let posts = this.state.posts.map((post) => {
      return (<li id={post.id}>{post.body}</li>);
    });

    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">...</h1>
          </header>
          <p className="App-intro" />

          <input type="button" onClick={this.onTestClick.bind(this)} value="testAPI" />
          <RaisedButton label="material-ui Button example" onClick={this.onMaterialUiButtonClick.bind(this)} />
          <input type="textbox" />
          <br />
          <ul>
            {posts}
          </ul>
        </div>

      </MuiThemeProvider>
    );
  }

  onTestClick() {
    console.log('onTestClick() check console for results');
    this.fetchPosts();
  }

  async fetchPosts() {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await posts.json();
    console.log(data);
    this.setState({ posts: data });
  }

  onMaterialUiButtonClick(){
    console.log('onMaterialUiButtonClick()');

  }
}

export default App;
