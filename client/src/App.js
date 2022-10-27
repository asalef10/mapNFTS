import "leaflet/dist/leaflet.css";
import "./App.css";
import AppRouter from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./component/fetchers/layOut";
export default function App() {
  return (
    <>
      <Router>
        <div id="container">
          <Layout />
          &nbsp;
          <AppRouter />
        </div>
      </Router>
    </>
  );
}
