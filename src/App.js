import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import UsersPage from './usuario/UsersPage';
import VideosPage from './videos/VideosPage';
import LogsPage from './LogsPage';
import PostagensPage from './PostagensPage';
import './styles/Global.scss'; // Importe o arquivo de estilos SCSS
import TagsPage from 'tags/TagsPage';


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
                        <Route path="/tags" element={<TagsPage />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}


export default App;
