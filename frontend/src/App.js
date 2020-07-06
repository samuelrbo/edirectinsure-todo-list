import * as React from 'react';
import { Admin, Resource } from 'react-admin';

// Pages / Resources;
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/Error/NotFound';
import LoginPage from './pages/Login/LoginPage';
import CustomLoginPage from './pages/Login/CustomLoginPage';

import { ProjectList, ProjectCreate, ProjectShow } from './components/Project';
import { TaskCreate, TaskEdit, TaskShow } from './components/Task';

// Providers
import authProvider from './providers/auth.provider';
import dataProvider from './providers/data.provider';

function App() {
  return (
    <Admin
      title="TODO List"
      dashboard={ Dashboard }
      loginPage={ CustomLoginPage }
      authProvider={ authProvider }
      dataProvider={ dataProvider }
      catchAll={ NotFound }
    >
      <Resource name="project" list={ ProjectList } show={ ProjectShow } create={ ProjectCreate } />
      <Resource name="task" create={ TaskCreate } show={ TaskShow } edit={ TaskEdit } />
    </Admin>
  );

}
export default App;
