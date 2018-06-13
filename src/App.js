import React, { Component } from "react";
import qs from "qs";
import Button from "@material-ui/core/Button";

import "./App.css";
import Input from "./input";
import { fetchMovies } from "./actions";

const styles = {
  button: {
    margin: "10px"
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishListId: ""
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
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">New Zealand Film Festival Organiser</h1>
        <Input
          onUpdate={this.onUpdateWishListId}
          wishListId={this.state.wishListId}
        />
        <Button
          variant="contained"
          color="primary"
          style={styles.button}
          label={"Get Movies!"}
          onClick={() => fetchMovies(this.state.wishListId)}
        >
          Get Movies!
        </Button>
      </div>
    );
  }
}

export default App;
