import { ContextProvider } from './Store';
import { useContext } from 'react';
import Navbar from './components/nav/Navbar';
import './App.css';

import HomePage from './pages/Home';

function App() {
  return (
    <main>
      <Navbar />
      <HomePage />
    </main>
  );
}

export default App;
