import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/app";
import configureStore from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";

import ApiService from "./service/API";
import { ApiServiceProvider } from "./components/api-service-context";
import ErrorBoundry from "./components/error-boundry";

const store = configureStore();
const apiService = new ApiService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ApiServiceProvider value={apiService}>
        <Router>
          <App />
        </Router>
      </ApiServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
