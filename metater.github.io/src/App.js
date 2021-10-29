import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './css/App.css';
import {BitcoinPrice} from './components/API';
import Navbar from "./components/Navbar";

function App() {
return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            Hello, World! <br/>
            Hola!
          </Route>
          <Route exact path="/bitcoin">
            <BitcoinPrice />
          </Route>
        </Switch>
      </Router>
      <div className='Background'/>
    </div>
  );
}

export default App;
