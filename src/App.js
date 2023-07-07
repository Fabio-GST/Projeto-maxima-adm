import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import UsersPage from './UsersPage';
import VideosPage from './VideosPage';
import LogsPage from './LogsPage';
import PostagensPage from './PostagensPage';
import SairPage from './SairPage';
import './styles/Global.scss'; // Importe o arquivo de estilos SCSS


function App() {
    return (
        <div className="app">
            <Router>
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/usuarios" element={<UsersPage />} />
                        <Route path="/videos" element={<VideosPage />} />
                        <Route path="/logs" element={<LogsPage />} />
                        <Route path="/postagens" element={<PostagensPage />} />
                        <Route path="/sair" element={<SairPage />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}


export default App;
