import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import Monitor from './Monitor/Monitor';
import KartodromoList from './Kartodromo/KartodromoList';
import KartodromoForm from './Kartodromo/KartodromoForm';

export const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={ Monitor } />
      <Route exact path="/kartodromos" component={ KartodromoList } />
      <Route path="/kartodromos/:id" component={ KartodromoForm } />
    </Switch>
  </Layout>
);

export default App;
