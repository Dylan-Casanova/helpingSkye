import React from "react";
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";

//MENUS AND ADMIN
// Components
import { Navigation } from "@ac";
// Pages
import Chapters from "pages/Chapters/Chapters";
import ComponentTest from "pages/ComponentTest";
import Courses from "pages/Courses/courses";
import Home from "pages/Home/Home";
import Lessons from "pages/Lessons/Lessons";
import Menu from "pages/Menus/Menu";
import Registration from "pages/Admin/Registration";
import Sections from "pages/Sections/Sections";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
      <Route path="/" exact render={(props) => <Home />} />
      <Route path="/chapters" exact render={(prop) => <Chapters />} />
      <Route path="/courses" exact render={(prop) => <Courses />} />
      <Route path="/lessons" exact render={(prop) => <Lessons />} />
      <Route path="/menu" exact render={(props) => <Menu />} />
      <Route path="/registration" exact render={(props) => <Registration />} />
      <Route path="/sections" exact render={(prop) => <Sections />} />
      <Route path="/test" exact render={(prop) => <ComponentTest />} />
      </Switch>
    </Router>
  );
}

export default App;
