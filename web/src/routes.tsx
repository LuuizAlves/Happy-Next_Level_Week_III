import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Orphanages from './pages/OrphanagesMap';
import OrphanegeCreate from './pages/CreateOrphanage';
import OrphanageProfile from './pages/Orphanage';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={Orphanages} />
                <Route path="/orphanages/create" component={OrphanegeCreate} />
                <Route path="/orphanages/:id" component={OrphanageProfile} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

