import React, { Component } from "react";
import qs from "qs";
import Button from "@material-ui/core/Button";

import "./App.css";
import Input from "./Input";
import { fetchMovies } from "./actions";

import Movies from "./Movies";

const styles = {
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  button: {
    margin: "10px"
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishListId: "",
      movies: []
    };

    this.onUpdateWishListId = this.onUpdateWishListId.bind(this);
  }

  componentDidMount() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });
    if (query["wishlistid"]) {
      this.setState({ wishListId: query["wishlistid"] });
    }
  }

  onUpdateWishListId(wishListId) {
    this.setState({ wishListId });
    if (!wishListId) {
      this.props.history.push({
        search: ""
      });
    } else {
      this.props.history.push({
        search: `?wishlistid=${wishListId}`
      });
    }
  }

  async fetchMovies() {
    const movies = await fetchMovies(this.state.wishListId);
    this.setState({ movies: movies.movieList });
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">New Zealand Film Festival Organiser</h1>
        <div style={styles.inputContainer}>
          <Input
            onUpdate={this.onUpdateWishListId}
            wishListId={this.state.wishListId}
          />
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
            label={"Get Movies!"}
            onClick={() => this.fetchMovies(this.state.wishListId)}
          >
            Get Movies!
          </Button>
        </div>
        <Movies movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
