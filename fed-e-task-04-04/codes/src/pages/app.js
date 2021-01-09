import React from 'react';
import { Router } from '@reach/router';
import Setting from '../components/Setting';
import PrivateRoute from '../components/PrivateRoute';
const App = () => {
    return (
        <Router>
            <PrivateRoute component={Setting} path="/app/settings"></PrivateRoute>
            {/* <Setting path="/app/settings" /> */}
        </Router>
    );
}

export default App;
