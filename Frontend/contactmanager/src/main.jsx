import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Form from './components/Form.jsx';
import List from './components/List.jsx';
import Info from './components/Info.jsx';
import Search from './components/Search.jsx';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />} />
        <Route path="/home" element={<List />} />
        <Route path="/form" element={<Form />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:id" element={<Info />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
