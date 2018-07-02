import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = {
  button: {
    margin: "10px"
  }
};

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutDialogOpen: false
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ aboutDialogOpen: true });
  };

  handleClose = () => {
    this.setState({ aboutDialogOpen: false });
  };

  render() {
    return (
      <Fragment>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}
          style={styles.button}
        >
          About
        </Button>
        <Dialog
          open={this.state.aboutDialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"What does this website do?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This website helps you to plan your NZIFF schedule! We often see
              ~15 films together and scheduling to see them around work was a
              pain so we made this tool to help.
            </DialogContentText>
            <DialogContentText>
              Logan Elliott created the website you see here and Asher James
              created the thing that schedules your movies.
            </DialogContentText>
            <DialogContentText>
              {`If you have any problems with this site you can tweet `}
              <a href="https://twitter.com/L0gyb">Logan</a>
              {` or make an issue on either `}
              <a href="https://github.com/LoganElliott/nziffo">
                the frontend GitHub
              </a>
              {` or `}
              <a href="https://github.com/asherjames/nzff-organiser">
                the backend GitHub
              </a>
            </DialogContentText>
            <DialogContentText>
              If you find this tool helpful it would be great to hear about it!
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default About;
