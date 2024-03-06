import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from './components/RegisterPage';
import { PageNotFound } from "./components/PageNotFound";
import { DashboardPage } from "./components/DashboardPage";
import { MoviePage } from "./components/MoviePage";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
          <Route path="/loginpage"  element={<LoginPage />} />
          <Route path="/registerpage" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/moviepage" element={<MoviePage/>} />
          <Route path="*" element={<PageNotFound />} />
       
      </Routes>
    </BrowserRouter>

  );
}


export default App;
