import './App.css';
import { HashRouter, Switch, Route } from "react-router-dom";
import TodoList from './Todo';
import Home from './Home';
import { EditTodo } from './EditTodo';
import { Giphy } from './Giphy';



function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/giphy"} component={Giphy} />
          <Route exact path={"/todo"} component={TodoList} />
          <Route exact path={"/todo/edit/:id"} component={EditTodo} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
