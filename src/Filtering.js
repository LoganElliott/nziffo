import React, { Component, Fragment } from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";

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
    const daysInWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    const days = daysInWeek.reduce((accumulator, day) => {
      accumulator[day] = {
        key: day,
        disabled: false,
        startTime: moment().startOf("day"),
        endTime: moment().endOf("day")
      };

      return accumulator;
    }, {});

    this.state = {
      days
    };

    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
  }

  handleSwitchChange = name => event => {
    this.setState({
      days: {
        ...this.state.days,
        [name]: {
          ...this.state.days[name],
          disabled: event.target.checked
        }
      }
    });
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

    this.setState({
      days: {
        ...this.state.days,
        [name]: {
          ...this.state.days[name],
          startTime,
          endTime
        }
      }
    });
  };

  renderDrawerContent() {
    return Object.keys(this.state.days).map(val => {
      const day = this.state.days[val];
      return (
        <div key={day.key}>
          <div style={styles.dayContainer}>
            <div style={styles.dayTitle}>{day.key}</div>
            <FormControlLabel
              control={
                <Switch
                  checked={day.disabled}
                  onChange={this.handleSwitchChange(day.key)}
                  value={day.key}
                />
              }
              label={day.disabled ? "disabled" : "disable?"}
            />
          </div>
          <div style={styles.rangeContainer}>
            {day.startTime.format("LT")}
            <Range
              allowCross={false}
              defaultValue={[0, 96]}
              onChange={this.handleTimeRangeChange(day.key)}
              pushable={4}
            />
            {day.endTime.format("LT")}
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

export default withStyles(styles)(Filtering);
