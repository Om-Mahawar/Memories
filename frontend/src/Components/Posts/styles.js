import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderRadius: '15px',
    position: 'relative',
    margin: '5px',
  },
  header: {
    marginTop: '8px',
    marginLeft: '10px',
    padding: '8px',
    paddingBottom: '5px',
    '& .MuiCardHeader-title': {
      fontSize: '12px',
      fontWeight: 'bold',
    },
    '& .MuiCardHeader-subheader': {
      fontSize: '11px',
    },
  },
  commentOuterContainer: {
    backgroundColor: '#eee',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '8px 16px 8px 16px',
  },
  commentInnerContainer: {
    height: '200px',
    overflow: 'auto',
    marginRight: '30px',
  },
  commentField: {
    borderRadius: '5px',
    padding: '3px',
    marginBottom: '5px',
    flex: '70%',
  },
}));

export default useStyles;
