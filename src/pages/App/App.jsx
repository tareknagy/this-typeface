import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/user-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import Favorites from '../Favorites/Favorites';
import Typefaces from '../Typefaces/Typefaces'
import NavBar from '../../components/NavBar/NavBar';
import logo from '../../images/logo_white.png';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [inputPangram, setInputPangram] = useState([]);

  // track input changes
  async function handleInputChange(e) {
    setInputPangram(e.target.value);
  }

  // toggle header on scroll
  const [y, setY] = useState(window.scrollY);
  const handleNavigation = useCallback(
    e => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        console.log("scrolling up");
      } else if (y < window.scrollY) {
        console.log("scrolling down");
      }
      setY(window.scrollY);
    }, [y]
  );

useEffect(() => {
  setY(window.scrollY);
  window.addEventListener("scroll", handleNavigation);

  return () => {
    window.removeEventListener("scroll", handleNavigation);
  };
}, [handleNavigation]);

  return (
    <main className="App">
      { user ? 
        <>
          <NavBar user={user} setUser={setUser} />
          <div style={{height:'140px'}}></div>
          <header>
            <img className="logo" src={logo} alt="This Typeface Icon" />
            <div className="user-pangram">
              <input 
                type="userPangram"
                onChange={handleInputChange}
                value={inputPangram}
                placeholder="What Ever You Want!"
              />
              <button>FILTERS</button>
            </div>
          </header>
          <Switch>
            <Route path="/typefaces/favorites">
              <Favorites inputPangram={inputPangram} />
            </Route>
            <Route path="/typefaces">
              <Typefaces inputPangram={inputPangram} />
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

