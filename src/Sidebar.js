import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faVideo, faClipboardList, faNewspaper, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


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
                        <FontAwesomeIcon icon={faUsers} className="icon" />
                        <span>Usuários</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/videos"
                        className={`nav-link ${location.pathname === '/videos' ? 'active' : ''}`}
                    >
                        <FontAwesomeIcon icon={faVideo} className="icon" />
                        <span>Vídeos</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/logs"
                        className={`nav-link ${location.pathname === '/logs' ? 'active' : ''}`}
                    >
                        <FontAwesomeIcon icon={faClipboardList} className="icon" />
                        
                        <span>Logs</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/postagens"
                        className={`nav-link ${location.pathname === '/postagens' ? 'active' : ''}`}
                    >
                        <FontAwesomeIcon icon={faNewspaper} className="icon" />
                        <span>Postagens</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/sair"
                        className={`nav-link ${location.pathname === '/sair' ? 'active' : ''}`}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                        <span>Sair</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};


export default Sidebar;
