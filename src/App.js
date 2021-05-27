import logo from './logo.svg';
import './App.css';
import Routes from './Routes';
import { makeStyles, Toolbar } from '@material-ui/core';
import Header from './components/header/Header.component';

const useStyles = makeStyles((theme) => ({
  root:{
    display: 'flex',
    textAlign: 'center'
  },
  content: {
    padding: "1rem",
    minHeight: 'calc(100vh-64px)'
  },
  container: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  }
}))
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.container}>
        <Toolbar />
        <div className={classes.content}>
          <Routes />
        </div>
      </main>
    </div>
  );
}

export default App;
