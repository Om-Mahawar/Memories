import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';
import CommentSection from '../CommentSection';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Typography,
  Avatar,
  Divider,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import Collapse from '@material-ui/core/Collapse';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(post?.likes);
  const [expanded, setExpanded] = useState(false);

  const user = JSON.parse(localStorage.getItem('profile'));
  const userID = user?.result?.googleId || user?.result?._id;
  const hasLiked = likes.find((like) => like === userID);

  const handleClick = () => {
    if (hasLiked) {
      setLikes(likes.filter((id) => id !== userID));
    } else {
      setLikes([...likes, userID]);
    }
    dispatch(likePost(post._id));
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userID) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevetion={6}>
      <CardHeader
        avatar={
          <Avatar className={classes.purple}>
            {post.name.charAt(0) + post.name.split(' ')[1].charAt(0)}
          </Avatar>
        }
        title={post.name}
        subheader={moment(post.createdAt).fromNow()}
      />
      <Typography className={classes.title} variant='h5' gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.message}
        </Typography>
      </CardContent>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      {post.selectedFile ? (
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
      ) : (
        ''
      )}
      <Divider variant='middle' />
      {userID === post?.creator && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: 'white' }}
            size='small'
            onClick={() => {
              setCurrentId(post._id);
            }}
          >
            <MoreHorizIcon fontSize='default' />
          </Button>
        </div>
      )}
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          disabled={!user?.result}
          onClick={handleClick}
        >
          <Likes />
        </Button>
        <Button onClick={() => setExpanded(!expanded)} color='primary'>
          <CommentIcon />
          &nbsp;
          {post.comments.length}{' '}
          {post.comments.length <= 1 ? 'Comment' : 'Comments'}
        </Button>
        {userID === post?.creator && (
          <Button
            size='small'
            color='primary'
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}
      </CardActions>
      {(post.comments.length > 0 || user?.result?.name) && (
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <div>
            <CommentSection post={post} />
          </div>
        </Collapse>
      )}
    </Card>
  );
};

export default Post;
