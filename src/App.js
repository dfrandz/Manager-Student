import React from 'react';

import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import './App.css';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import Home from './components/Home';
import Navbar from './components/Navbar';





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <header className="App-header">
          <Navbar />
        </header>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
