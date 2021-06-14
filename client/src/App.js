import './App.scss';
import { Route } from 'react-router-dom';

import NavigationPage from './Components/Header/Navigation';

function App() {
   return (
      <div className="app">
         <Route path="/" component={NavigationPage} />
      </div>
   );
}

export default App;
