import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  useEffect(() => {}, [posts]);

  if (!posts.length && !isLoading) {
    return 'No posts';
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map((post) => {
        return (
          <Grid key={post._id} item xs={12} sm={12}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;
