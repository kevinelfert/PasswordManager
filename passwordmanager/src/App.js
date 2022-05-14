import MainPage from "./MainPage";
import Login from "./Login";
import Register from "./Register";
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"></link>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <header className="App-header">
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="/users/:id">
              <MainPage></MainPage>
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
    
  );
}

export default App;
