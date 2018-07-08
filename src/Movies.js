import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import randomMC from "random-material-color";
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
    minWidth: "320px",
    maxWidth: "500px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  movieDetailsContainer: {
    display: "flex"
  },
  movieDetails: {
    display: "flex",
    alignItems: "center",
    marginRight: "34px"
  }
};

const Movie = ({ movie, index }) => (
  <Card style={styles.card}>
    <CardMedia
      style={styles.media}
      image={new URL(movie.thumbnailUrl, nziffBaseUrl).href}
      title={movie.title}
    />
    <CardContent>
      <div style={styles.movieDetailsContainer}>
        <div style={styles.movieDetails}>
          <Avatar
            style={{
              margin: 10,
              background: randomMC.getColor({ text: movie.title })
            }}
          >
            {index + 1}
          </Avatar>
        </div>
        <div>
          <Typography gutterBottom variant="headline">
            <a href={new URL(movie.websiteUrl, nziffBaseUrl).href}>
              {movie.title}
            </a>
          </Typography>
          <Typography gutterBottom variant="subheading">
            {moment(movie.endTime).diff(moment(movie.startTime), "minutes")}{" "}
            minutes
          </Typography>
          <Typography gutterBottom variant="subheading">
            {moment(movie.startTime).format("ddd h:mm A DD/MM/YY")}
          </Typography>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Movies = props => {
  if (props.movies.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      {props.movies.map((movie, index) => (
        <Movie key={movie.title} movie={movie} index={index} />
      ))}
    </div>
  );
};

Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      websiteUrl: PropTypes.string.isRequired
    })
  )
};

export default Movies;
