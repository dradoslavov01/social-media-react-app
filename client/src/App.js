import './App.scss';
import { Route, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react'
import NavigationPage from './Components/Header/Navigation';
import RegisterPage from './Components/Register/Register';
import LoginPage from './Components/Login/Login';
import ProfilePage from './Components/Profile/Profile';
import isAuth from './hoc/isAuth';
import axios from 'axios'
function App(props) {
   const user = localStorage.getItem('token');
   const history = useHistory();

   if (user === null) {
      history.push('/login');
   };

   useEffect(() => {

      axios.get('/file/:filename').then(res => console.log(res.data));

      axios
         .get("user")
         .then((res) => {
            /* props.setCurrentUser(res.data); */
         })
         .catch((err) => console.log(err));

   }, []);

   return (
      <div className="app">
         <Route path="/" component={NavigationPage} />
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
