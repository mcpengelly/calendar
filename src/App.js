import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">...</h1>
        </header>
        <p className="App-intro">
        </p>
        <input
          type="button"
          onClick={this.onTestClick.bind(this)}
          value="testAPI"
        />
      </div>
    );
  }
  onTestClick() {
    console.log("clicked!");
    this.fetchPosts();
  }

  async fetchPosts() {
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await posts.json();
    console.log(data);
    // this.setState({ posts: data });
  }
}

export default App;
