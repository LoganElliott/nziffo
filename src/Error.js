import React, { Component, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center"
  },
  card: {
    margin: "10px",
    flexGrow: 1,
    minWidth: "320px",
    maxWidth: "500px",
    backgroundColor: "rgb(66, 192, 251, .6)"
  },
  message: {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

const Error = ({ message }) => (
  <div style={styles.container}>
    <Card style={styles.card}>
      <CardContent>
        <div style={styles.message}>
          <Typography gutterBottom variant="title">
            {message}
          </Typography>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Error;
