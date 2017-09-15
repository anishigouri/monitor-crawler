import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import Monitor from './Monitor/Monitor';

export const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Monitor} />
    </Switch>
  </Layout>
);

export default App;
