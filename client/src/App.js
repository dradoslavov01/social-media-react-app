import './App.scss';
import { Route } from 'react-router-dom';

import NavigationPage from './Components/Header/Navigation';
import RegisterPage from './Components/Register/Register';

function App() {
   return (
      <div className="app">
         <Route path="/" component={NavigationPage} />
         <Route path="register" component={RegisterPage} />
      </div>
   );
}

export default App;
