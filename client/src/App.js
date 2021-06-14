import './App.scss';
import { Route } from 'react-router-dom';

import NavigationPage from './Components/Header/Navigation';
import RegisterPage from './Components/Register/Register';
import LoginPage from './Components/Login/Login';

function App() {
   return (
      <div className="app">
         <Route path="/" component={NavigationPage} />
         <Route path="/register" component={RegisterPage} />
         <Route path="/login" component={LoginPage} />
      </div>
   );
}

export default App;
