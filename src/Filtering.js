import React, { Component, Fragment } from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Switch from "@material-ui/core/Switch";

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
  dayEnabledContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dayTitle: {
    margin: "0 10px",
    fontWeight: 700,
    fontSize: "22px"
  },
  filterContainerDesktop: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    margin: "9px 0"
  },
  filterContainerMobile: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1
  },
  dayContainer: {
    flex: 1,
    padding: "10px",
    borderBottom: "1px solid #ccc"
  },
  from: {
    display: "flex",
    fontSize: "14px"
  },
  to: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "14px"
  },
  slider: {
    margin: "6px 0"
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
        included: event.target.checked
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
        <div key={day.day} style={styles().dayContainer}>
          <div style={styles().dayEnabledContainer}>
            <div style={styles().dayTitle}>{day.day}</div>
            <Switch
              checked={day.included}
              onChange={this.handleSwitchChange(day.day)}
              value={day.day}
            />
          </div>
          <div style={styles().rangeContainer}>
            <div style={styles().from}>{day.from.format("LT")}</div>
            <Range
              allowCross={false}
              defaultValue={[0, 96]}
              onChange={this.handleTimeRangeChange(day.day)}
              pushable={4}
              style={styles().slider}
              trackStyle={[{ backgroundColor: "#3f51b5" }]}
              handleStyle={[
                { borderColor: "#3f51b5" },
                { borderColor: "#3f51b5" }
              ]}
              max={96}
            />
            <div style={styles().to}>{day.to.format("LT")}</div>
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
          <div style={styles().filterContainerMobile}>
            {this.renderDrawerContent()}
          </div>
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
          <div style={styles().filterContainerDesktop}>
            {this.renderDrawerContent()}
          </div>
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
