import React from 'react';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Toaster position="top-right" />
      <Home />
    </div>
  );
}

export default App;