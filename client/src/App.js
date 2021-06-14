import './App.scss';
import { Route } from 'react-router-dom';

import NavigationPage from './Components/Header/Navigation';
import RegisterPage from './Components/Register/Register';
import LoginPage from './Components/Login/Login';
import ProfilePage from './Components/Profile/Profile';
import isAuth from './hoc/isAuth';

function App(props) {
   const user = localStorage.getItem('token');

   return (
      <div className="app">
         <Route path="/"  component={NavigationPage} />
         <Route path="/profile" component={isAuth(ProfilePage)} />
         {user
            ? <>
               <Route path="/register" exact component={isAuth(RegisterPage)} />
               <Route path="/login" exact component={isAuth(LoginPage)} />
            </>
            : <>
               <Route path="/register" exact component={RegisterPage} />
               <Route path="/login" exact component={LoginPage} />
            </>
         }
      </div>
   );
}

export default App;
