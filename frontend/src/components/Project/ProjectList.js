import React from 'react';
import { List, SimpleList, Datagrid, TextField, Responsive, ShowButton } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  title: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export const ProjectList = withStyles(styles)(({ classes, ...props }) => (
  <List {...props} sort={{ field: 'published_at', order: 'DESC' }}>
    <Responsive
      small={
        <SimpleList linkType="show" primaryText={record => record.title} />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="title" cellClassName={classes.title} />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
));
