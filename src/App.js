import React, { Component } from "react";
import qs from "qs";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import FilterIcon from "@material-ui/icons/FilterList";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";

import "./App.css";
import Input from "./Input";
import { fetchMovies } from "./actions";

import Movies from "./Movies";
import Filter from "./Filtering";
import moment from "moment/moment";
import deepEqual from "fast-deep-equal";

const drawerWidth = 240;

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentLeft: {
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  contentShiftLeft: {
    marginLeft: 0
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  button: {
    margin: "10px"
  },
  filterButton: {
    padding: "0px 16px",
    color: "yellow"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  }
});

const daysInWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const filtersInit = daysInWeek.reduce((accumulator, day) => {
  accumulator[day] = {
    day: day,
    excluded: false,
    from: moment().startOf("day"),
    to: moment().endOf("day")
  };
  return accumulator;
}, {});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishListId: "",
      movies: [],
      mobileOpen: false,
      filters: filtersInit,
      loading: false,
      success: false
    };

    this.onUpdateWishListId = this.onUpdateWishListId.bind(this);
    this.onDrawerToggle = this.onDrawerToggle.bind(this);
    this.onUpdateFilters = this.onUpdateFilters.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
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

  onDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  onUpdateFilters(filters) {
    this.setState({ filters });
  }

  excludeDefaultFilters(filters) {
    return Object.values(filters).filter(
      filter => !deepEqual(filtersInit[filter.day], filter)
    );
  }

  async fetchMovies() {
    const movies = await fetchMovies(
      this.state.wishListId,
      this.excludeDefaultFilters(this.state.filters)
    );
    if (movies) {
      this.setState({ movies: movies.movieList });
    }
  }

  render() {
    const { classes, success } = this.props;

    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });
    return (
      <div className="App">
        <Filter
          mobileOpen={this.state.mobileOpen}
          onDrawerToggle={this.onDrawerToggle}
          updateFilters={this.onUpdateFilters}
          filters={this.state.filters}
        />
        <main
          className={classNames(classes.content, classes.contentLeft, {
            [classes.contentShift]: true,
            [classes.contentShiftLeft]: true
          })}
        >
          <h1 className="App-title">New Zealand Film Festival Organiser</h1>
          <div style={styles.inputContainer}>
            <Input
              onUpdate={this.onUpdateWishListId}
              wishListId={this.state.wishListId}
            />
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                style={styles.button}
                label={"Get Movies!"}
                className={buttonClassname}
                disabled={this.state.loading}
                onClick={this.fetchMovies}
              >
                Get Movies!
              </Button>
              {this.state.loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>

            <Hidden mdUp>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onDrawerToggle}
                className={styles.filterButton}
              >
                <FilterIcon style={{ fontSize: 20 }} />
                Filter Times
              </Button>
            </Hidden>
          </div>
          <Movies movies={this.state.movies} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
