import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/user-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import Favorites from '../Favorites/Favorites';
import Typefaces from '../Typefaces/Typefaces'
import NavBar from '../../components/NavBar/NavBar';


export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      { user ? 
        <>
          <NavBar user={user} setUser={setUser} />
          <Switch>
            <Route path="/typefaces/favorites">
              <Favorites />
            </Route>
            <Route path="/typefaces">
              <Typefaces />
            </Route>
            <Redirect to="/typefaces" />
          </Switch>
        </>
      :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

