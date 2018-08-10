import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, IconButton } from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

const PostPreview = props => {
  const { classes, title, author, numComments, upvotes, downvotes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant='headline' component='h3'>
          {title}
        </Typography>
        <Typography variant='subheading' component='p'>
          {author} Comments: {numComments}
        </Typography>
        {upvotes}<ThumbUp /> {downvotes}<ThumbDown />
      </Paper>
    </div>
  );
};

PostPreview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostPreview);
