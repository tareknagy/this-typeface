import { useState, useEffect, useCallback, useRef } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/user-service';
import * as userService from '../../utilities/user-service';
import * as userAPI from '../../utilities/user-api';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import Favorites from '../Favorites/Favorites';
import Typefaces from '../Typefaces/Typefaces'
import NavBar from '../../components/NavBar/NavBar';
import DownloadExtension from '../../components/DownloadExtension/DownloadExtension';
import logo from '../../images/logo_white.png';


export default function App() {
  const [thisTypeList, setThisTypeList] = useState(userService.getTypefaceList());
  const [user, setUser] = useState(getUser());
  const [inputPangram, setInputPangram] = useState([]);

  // track input changes
  async function handleInputChange(e) {
    setInputPangram(e.target.value);
  }

  // Favorites Functions
  const [favorites, setFavorites] = useState([]);
  useEffect(function() {
      async function fetchFavorites() {
          const favorites = await userAPI.getFavorites();
          setFavorites(favorites);
      }
      fetchFavorites();
  }, []);
  async function handleAddToFavorites(type) {
    const favorites = await userAPI.manageFavorites(type);
    setFavorites(favorites)
  }
  function checkFavorites(type) {
      const fav = favorites.filter(t => t.indexOf(type) > -1);
      return fav.length > 0 ? true : false
  }

  // toggle header on scroll
  const headerRef = useRef(null);
  const [y, setY] = useState(window.scrollY);
  const handleHeader = useCallback(e => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        headerRef.current.classList.remove('header-scroll');
      } else if (y < window.scrollY) {
        headerRef.current.classList.add('header-scroll');
      }
      setY(window.scrollY);
    }, [y]
  );
  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleHeader);

    return () => {
      window.removeEventListener("scroll", handleHeader);
    };
  }, [handleHeader]);

  return (
    <main className="App">
      { user ? 
        <>
          { thisTypeList ?
            <>
              <NavBar user={user} setUser={setUser} />
              <div style={{height:'140px'}}></div>
              <header ref={headerRef}>
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
                  <Favorites 
                    inputPangram={inputPangram} 
                    thisTypeList={thisTypeList}
                    favorites={favorites} 
                    setFavorites={setFavorites}
                    handleAddToFavorites={handleAddToFavorites}
                    checkFavorites={checkFavorites}
                  />
                </Route>
                <Route path="/typefaces">
                  <Typefaces 
                    inputPangram={inputPangram} 
                    thisTypeList={thisTypeList}
                    favorites={favorites} 
                    setFavorites={setFavorites}
                    handleAddToFavorites={handleAddToFavorites}
                    checkFavorites={checkFavorites}
                  />
                </Route>
                <Redirect to="/typefaces" />
              </Switch>
            </>
          : 
            <DownloadExtension />
          }
        </>
      :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

