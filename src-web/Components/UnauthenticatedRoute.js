import React from 'react';
import {
    Route,
    Redirect,
} from "react-router-dom"

export default ({ component: C, appProps, ...rest }) =>
    <Route
        {...rest}
        render={props => <C {...props} {...appProps} />}
    />;