import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import HelpOutline from "@material-ui/icons/Help";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { nziffShareUrl } from "./Constants";

const styles = {
  textField: {
    margin: "10px",
    minWidth: "300px"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  help: {
    marginTop: 10,
    color: "#000",
    backgroundColor: "inherit"
  }
};

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishListUrl: "",
      helpDialogOpen: false
    };

    this.validateUrl = this.validateUrl.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  handleClickOpen = () => {
    this.setState({ helpDialogOpen: true });
  };

  handleClose = () => {
    this.setState({ helpDialogOpen: false });
  };

  help() {
    return (
      <Dialog
        open={this.state.helpDialogOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"What is a wishlist url?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The wishlist url is the url that the NZIFF gives you to share with
            other people. e.g.<a href={"www.nziff.co.nz/s/18WI"}>
              www.nziff.co.nz/s/18WI
            </a>. To find it go to your wishlist on the{" "}
            <a href="https://www.nziff.co.nz/2018/auckland/wishlist">
              NZIFF website
            </a>.
          </DialogContentText>
          <DialogContentText>
            The times of the movies in your wishlist are ignored, just put the
            movies you want to see in there.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }

  render() {
    return (
      <div style={styles.container}>
        <TextField
          id="wishlistUrl"
          label="Enter Wishlist url"
          value={this.state.wishListUrl}
          style={styles.textField}
          error={this.props.wishListId === null}
          onChange={event => this.validateUrl(event.target.value)}
        />
        <Button style={styles.help} onClick={this.handleClickOpen}>
          <HelpOutline style={styles.help} />
        </Button>
        {this.help()}
      </div>
    );
  }
}

export default Input;
