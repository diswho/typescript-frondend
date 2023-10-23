import './App.css';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import LogInForm from "./components/auth/LogInForm";
import Resource from "./components/resource/Resource";
import { useContext } from 'react';
import AuthContext from "./store/auth/AuthContextProvider";
import RegisterForm from './components/auth/RegisterForm';

function App() {
  const { authState } = useContext(AuthContext);
  const location = useLocation();
  return (
    <div className="App">
      <Routes>
        <Route
          path='/'
          element={
            <Navigate to={authState.isLoggedIn ? location.pathname : "/login"} />
          }
        />
        {!authState.isLoggedIn && (
          <Route path='user'>
            <Route path='register' element={<RegisterForm />} />
            <Route path='login' element={<LogInForm />} />
          </Route>
        )}
        {authState.isLoggedIn && (<Route path='/resource' element={<Resource />} />)}

      </Routes>
    </div>
  );
}

export default App;
