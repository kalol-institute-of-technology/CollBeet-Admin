import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import HelpIcon from "@material-ui/icons/Help";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import { Meteor } from "meteor/meteor";

const useStyles = theme => ({
  root: {
    flex: 1
  },
  grid: {
    flex: 1,
    alignItems: "center"
  },
  form: {
    margin: theme.spacing(1),
    fontFamily: "Sniglet",
    color: "#e65100"
  },
  title: {
    margin: theme.spacing(1),
    fontFamily: "Sniglet",
    color: "#000"
  },
  submit: {
    margin: theme.spacing(1),
    fontFamily: "Sniglet",
    color: "#e65100"
  },
  helpbutton: {
    color: "#e65100"
  }
});

class MessForm extends Component {
  state = {
    fooditems: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const { day, dayid, type } = this.props;
    const fooditems = this.state.fooditems;

    console.log(this.props);
    Meteor.call("mess.insert", day, dayid, type, fooditems);
  };

  changeFoodItems = (input, day, dayid, type) => e => {
    this.setState({
      [input]: e.target.value,
      dayid: dayid,
      day: day,
      type: type
    });
  };

  render() {
    const { day, dayid, type } = this.props;
    return (
      <div className={this.props.classes.root}>
        <Grid container className={this.props.classes.grid}>
          <Grid item>
            <Typography className={this.props.classes.title}>
              Please Add Food Items Here: {day} {dayid}
            </Typography>
          </Grid>

          <Grid item>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Separate Every Food Item with a Comma(,)"
            >
              <IconButton
                aria-label="delete"
                className={this.props.classes.helpbutton}
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <TextField
          id={type}
          className={this.props.classes.form}
          label="Food Items"
          variant="outlined"
          fullWidth
          // /defaultValue={type}
          onChange={this.changeFoodItems("fooditems")}
        />

        {this.state.fooditems ? (
          <Button
            variant="outlined"
            className={this.props.classes.submit}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="outlined"
            className={this.props.classes.submit}
            disabled
          >
            Submit
          </Button>
        )}
      </div>
    );
  }
}

export default compose(withStyles(useStyles))(MessForm);