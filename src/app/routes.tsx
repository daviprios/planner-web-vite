import '@styles/_global.sass'
import { HashRouter, Routes as Switch, Route } from 'react-router-dom'
import GlobalProviders from '@provider/GlobalProviders'

import Layout from './components/Layout'
import Agenda from './views/Agenda'
import Planner from './views/Planner'

const routePaths = {
  home: '/',
  agenda: 'agenda'
}

const Routes = () => {
	return (
    <HashRouter>
      <GlobalProviders>
        <Layout>
          <Switch>
            <Route path={routePaths.home}>
              <Route index element={<Planner/>}/>
              <Route path={routePaths.agenda} element={<Agenda/>}/>
            </Route>
          </Switch>
        </Layout>
      </GlobalProviders>
    </HashRouter>
  )
}

export {routePaths}
export default Routes
