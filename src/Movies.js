import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { nziffBaseUrl } from "./Constants";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  },
  card: {
    margin: "10px",
    flexGrow: 1,
    maxWidth: "500px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

const Movie = ({ movie }) => (
  <Card style={styles.card}>
    <CardMedia
      style={styles.media}
      image={movie.thumbnailUrl}
      title={movie.title}
    />
    <CardContent>
      <Typography gutterBottom variant="headline">
        <a href={new URL(movie.websiteUrl, nziffBaseUrl)}>{movie.title}</a>
      </Typography>
      <Typography gutterBottom variant="subheading">
        {new Date(movie.startTime).toLocaleString()}
      </Typography>
    </CardContent>
  </Card>
);

const Movies = props => {
  if (props.movies.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      {props.movies.map(movie => <Movie key={movie.title} movie={movie} />)}
    </div>
  );
};

Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      websiteUrl: PropTypes.string.isRequired
    })
  )
};

export default Movies;
