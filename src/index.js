import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from './pages/Home';
import { Level1 } from './pages/Level1';
import { Level2 } from './pages/Level2';
import { Level3 } from './pages/Level3';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/steiner-tree' element={<Home />} />
          <Route path='/steiner-tree/level-1' element={<Level1 />} />
          <Route path='/steiner-tree/level-2' element={<Level2 />} />
          <Route path='/steiner-tree/level-3' element={<Level3 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
