import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import store from "./store";
import Alert from "./components/layout/Alert";
import Tasks from "./components/Tasks";
import Protected from "./components/Protected";

function App() {
  return (
    <Provider store={store}>
      <Alert />
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/tasks"
            element={<Protected Component={Tasks} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
