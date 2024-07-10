// This file is automatically compiled by Webpack, along with any other files
// present in this directory. 

var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);

// Import statements for React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';
// Import the App component
import App from 'components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from '../pages/User';

// If you need to use Bootstrap's JavaScript features, also import the JS
import 'bootstrap';
import { User } from 'lucide-react';

document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('react-app');
    if (rootElement) {
      const root = ReactDOM.createRoot(rootElement); // Adjusted to use ReactDOM.createRoot
      root.render(
      <UserProvider>
        <App />
      </UserProvider>);
    }
});