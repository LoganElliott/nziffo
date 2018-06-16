import React, { Component } from "react";
import qs from "qs";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import FilterIcon from "@material-ui/icons/FilterList";
import Hidden from "@material-ui/core/Hidden";

import "./App.css";
import Input from "./Input";
import { fetchMovies } from "./actions";

import Movies from "./Movies";
import Filter from "./Filtering";

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
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishListId: "",
      movies: [],
      mobileOpen: false
    };

    this.onUpdateWishListId = this.onUpdateWishListId.bind(this);
    this.onDrawerToggle = this.onDrawerToggle.bind(this);
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

  async fetchMovies() {
    const movies = await fetchMovies(this.state.wishListId);
    this.setState({ movies: movies.movieList });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Filter
          mobileOpen={this.state.mobileOpen}
          onDrawerToggle={this.onDrawerToggle}
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
            <Button
              variant="contained"
              color="primary"
              style={styles.button}
              label={"Get Movies!"}
              onClick={() => this.fetchMovies(this.state.wishListId)}
            >
              Get Movies!
            </Button>
            <Hidden mdUp>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onDrawerToggle}
                className={styles.filterButton}
              >
                <FilterIcon />
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
