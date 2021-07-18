import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgb(0,183,255,1)',
  },
  image: {
    marginLeft: '15px',
  },
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse',
    },
    heading: {
      fontSize: '45px',
      padding: '3px',
    },
    image: {
      marginLeft: '10px',
      marginRight: '5px',
      height: '50px',
    },
  },
}));

export default useStyles;
