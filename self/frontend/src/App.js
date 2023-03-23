import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import store from "./store";
import Alert from "./components/layout/Alert";

function App() {
  return (
    <Provider store={store}>
      <Alert />
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
