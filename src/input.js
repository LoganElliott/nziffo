import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = {
  textField: {
    margin: "10px",
    width: "400px"
  },
  button: {
    margin: "10px"
  }
};

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishList: ""
    };

    this.validateUrl = this.validateUrl.bind(this);
  }

  validateUrl(newUrl) {
    console.log("newUrl", newUrl);
    const urlRegex = new RegExp(
      "(?:https?://)?(?:www.)?nziff.co.nz/(?:[0-9]{4}/[a-z]+/wishlist|s)/([A-Za-z0-9]+)"
    ); // eslint-disable-line
    const isValidUrl = urlRegex.test(newUrl);
    if (isValidUrl) {
      const wishList = urlRegex.exec(newUrl);
      console.log("valid", wishList[1]);
      this.setState({ wishList: wishList[1] });
    } else if (newUrl === "") {
      this.setState({ wishList: "" });
    } else {
      this.setState({ wishList: null });
    }
  }

  render() {
    return (
      <div>
        <TextField
          id="wishlistUrl"
          label="Enter Wishlist url"
          style={styles.textField}
          error={this.state.wishList === null}
          onChange={event => this.validateUrl(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={styles.button}
          label={"Get Movies!"}
        >
          Get Movies!
        </Button>
      </div>
    );
  }
}

export default Input;
