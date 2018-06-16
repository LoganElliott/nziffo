import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { nziffShareUrl } from "./Constants";

const styles = {
  textField: {
    margin: "10px",
    minWidth: "300px"
  }
};

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishListUrl: ""
    };

    this.validateUrl = this.validateUrl.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.wishListId &&
      this.props.wishListId !== prevProps.wishListId
    ) {
      this.setState({ wishListUrl: nziffShareUrl + this.props.wishListId });
    } else if (this.props.wishListId !== prevProps.wishListId) {
      this.setState({ wishListUrl: "" });
    }
  }

  validateUrl(newUrl) {
    const urlRegex = new RegExp(
      "(?:https?://)?(?:www.)?nziff.co.nz/(?:[0-9]{4}/[a-z]+/wishlist|s)/([A-Za-z0-9]+)"
    );
    const isValidUrl = urlRegex.test(newUrl);
    if (isValidUrl) {
      const wishList = urlRegex.exec(newUrl);
      this.props.onUpdate(wishList[1]);
    } else if (newUrl === "" || newUrl === nziffShareUrl) {
      this.props.onUpdate("");
    } else {
      this.props.onUpdate(null);
    }
  }

  render() {
    return (
      <TextField
        id="wishlistUrl"
        label="Enter Wishlist url"
        value={this.state.wishListUrl}
        style={styles.textField}
        error={this.props.wishListId === null}
        onChange={event => this.validateUrl(event.target.value)}
      />
    );
  }
}

export default Input;
