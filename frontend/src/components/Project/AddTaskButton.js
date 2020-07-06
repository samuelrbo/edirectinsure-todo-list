import React from 'react';
import { Link } from 'react-router-dom';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'react-admin';

const styles = {
  button: {
    marginTop: '1em'
  }
};

const AddTaskButton = ({ classes, record }) => (
  <Button
    className={classes.button}
    variant="raised"
    component={Link}
    to={`/task/create?project_id=${record.id}`}
    label="Add a task"
    title="Add a task"
  >
    <FormatListBulletedIcon />
  </Button>
);

export default withStyles(styles)(AddTaskButton);
