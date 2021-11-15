import React, { useState, useEffect } from 'react';
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  // const query = useQuery();
  const history = useHistory();
  // const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPosts();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDel) =>
    setTags(tags.filter((tag) => tag !== tagToDel));

  const searchPosts = () => {
    if (search.trim() || tags.length > 0) {
      console.log(search.trim(), tags);
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
      );
    } else {
      dispatch(getPosts());
      history.push('/posts');
    }
  };

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          className={classes.gridContainer}
          justify='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                name='search'
                variant='outlined'
                label='search posts'
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='search tags'
                variant='outlined'
              />
              <Button
                onClick={searchPosts}
                className={classes.searchButton}
                color='primary'
                variant='contained'
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
