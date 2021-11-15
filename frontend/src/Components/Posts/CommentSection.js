import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';
import SendIcon from '@material-ui/icons/Send';

const CommentSection = ({ post }) => {
  // console.log('Comment Section', post);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleClick = async () => {
    const finalComment = {
      name: user.result.name,
      content: comment,
    };

    const newComment = await dispatch(commentPost(finalComment, post._id));

    setComments(newComment);
    setComment('');
  };
  return (
    <div>
      <div className={classes.commentOuterContainer}>
        <div>
          {user?.result?.name && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <TextField
                className={classes.commentField}
                fullWidth
                size='small'
                variant='outlined'
                label='Comment Here'
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                style={{
                  height: '100%',
                  flex: '10%',
                  marginTop: '5px',
                }}
                fullWidth
                disabled={!comment}
                variant='contained'
                onClick={handleClick}
                color='primary'
              >
                <SendIcon />
              </Button>
            </div>
          )}
        </div>

        <div className={classes.commentInnerContainer}>
          {comments.map((c, i) => {
            let currComment = comments[comments.length - i - 1];
            return (
              <Card className={classes.card}>
                <CardHeader
                  className={classes.header}
                  title={currComment.name}
                  subheader={moment(currComment.createdAt).fromNow()}
                />
                <CardContent
                  style={{
                    marginTop: '0px',
                    paddingTop: '0px',
                    overflowWrap: 'break-word',
                  }}
                >
                  <Typography
                    variant='h6'
                    color='textSecondary'
                    component='p'
                    style={{ paddingLeft: '0px', paddingBottom: '0px' }}
                  >
                    {currComment.content}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
