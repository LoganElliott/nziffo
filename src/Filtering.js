import React, { Component, Fragment } from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = () => ({
  drawerPaper: {
    position: "relative",
    width: "240px"
  },
  rangeContainer: {
    width: 200,
    margin: 5
  },
  range: {
    height: "14px"
  },
  dayContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  dayTitle: {
    margin: "0 10px"
  }
});

class Filtering extends Component {
  constructor(props) {
    super(props);

    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
  }

  handleSwitchChange = name => event => {
    const updatedFilters = {
      ...this.props.filters,
      [name]: {
        ...this.props.filters[name],
        excluded: event.target.checked
      }
    };
    this.props.updateFilters(updatedFilters);
  };

  handleTimeRangeChange = name => range => {
    let endTimeMinutes = (96 - range[1]) * 15;

    if (range[1] < 96) {
      endTimeMinutes--;
    }

    const startTime = moment()
      .startOf("day")
      .add(range[0] * 15, "minutes");
    const endTime = moment()
      .endOf("day")
      .subtract(endTimeMinutes, "minutes");

    this.props.updateFilters({
      ...this.props.filters,
      [name]: {
        ...this.props.filters[name],
        from: startTime,
        to: endTime
      }
    });
  };

  renderDrawerContent() {
    return Object.keys(this.props.filters).map(val => {
      const day = this.props.filters[val];
      return (
        <div key={day.day}>
          <div style={styles.dayContainer}>
            <div style={styles.dayTitle}>{day.day}</div>
            <FormControlLabel
              control={
                <Switch
                  checked={day.excluded}
                  onChange={this.handleSwitchChange(day.day)}
                  value={day.day}
                />
              }
              label={day.excluded ? "disabled" : "disable?"}
            />
          </div>
          <div style={styles.rangeContainer}>
            {day.from.format("LT")}
            <Range
              allowCross={false}
              defaultValue={[0, 96]}
              onChange={this.handleTimeRangeChange(day.day)}
              pushable={4}
            />
            {day.to.format("LT")}
          </div>
        </div>
      );
    });
  }

  renderMobileDrawer() {
    return (
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={this.props.mobileOpen}
          onClose={this.props.onDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {this.renderDrawerContent()}
        </Drawer>
      </Hidden>
    );
  }

  renderDesktopDrawer() {
    const { classes } = this.props;

    return (
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{ paper: classes.drawerPaper }}
        >
          {this.renderDrawerContent()}
        </Drawer>
      </Hidden>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderMobileDrawer()}
        {this.renderDesktopDrawer()}
      </Fragment>
    );
  }
}

Filtering.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool.isRequired
};

export default withStyles(styles)(Filtering);
