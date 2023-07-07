import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link
                        to="/usuarios"
                        className={`nav-link ${location.pathname === '/usuarios' ? 'active' : ''}`}
                    >
                        Usuários
                    </Link>
                </li>
                <li >
                    <Link
                        to="/videos"
                        className={`nav-link ${location.pathname === '/videos' ? 'active' : ''}`}
                    >
                        Vídeos
                    </Link>
                </li>
                <li>
                    <Link
                        to="/logs"
                        className={`nav-link ${location.pathname === '/logs' ? 'active' : ''}`}
                    >
                        Logs
                    </Link>
                </li>
                <li>
                    <Link
                        to="/postagens"
                        className={`nav-link ${location.pathname === '/postagens' ? 'active' : ''}`}
                    >
                        Postagens
                    </Link>
                </li>
                <li >
                    <Link
                        to="/sair"
                        className={`nav-link ${location.pathname === '/sair' ? 'active' : ''}`}
                    >
                        Sair
                    </Link>
                </li>
            </ul>
        </div>
    );
};


export default Sidebar;
