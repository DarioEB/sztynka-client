import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Components
import Home from './components/Home';
import Login from './components/Login';
import Admin from './components/Admin';

// States
import ServiceState from './context/services/serviceState';
import TimeState from './context/times/timeState';
import ShiftState from './context/shifts/shiftState';
import AlertState from './context/alerts/alertState';
import LoginState from './context/login/loginState';
import AdminState from './context/admin/adminState';
import DateState from './context/dates/dateState';

import PrivateRoute from './components/routes/privateRoute';

function App() {
  return (
    <ServiceState>
      <DateState>
        <TimeState>
          <ShiftState>
            <AlertState>
              <LoginState >
                <AdminState>
                  <Router>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/login" component={Login} />
                      <PrivateRoute exact path="/admin" component={Admin} />
                    </Switch>
                  </Router>
                </AdminState>
              </LoginState>
            </AlertState>
          </ShiftState>
        </TimeState>
      </DateState>
      
    </ServiceState>
  );
}

export default App;
