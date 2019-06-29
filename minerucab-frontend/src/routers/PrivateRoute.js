import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  user,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      user.user !== undefined ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
