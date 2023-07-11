import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faVideo, faClipboardList, faNewspaper } from '@fortawesome/free-solid-svg-icons';


// cria um componente Sidebar
const Sidebar = () => {
    // obtém a localização atual da página (pathname)
    const location = useLocation();

    // retorna a barra lateral com os links para as páginas
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
                        to="/tags"
                        className={`nav-link ${location.pathname === '/tags' ? 'active' : ''}`}
                    >
                        <FontAwesomeIcon icon={faNewspaper} className="icon" />
                        <span>Tags</span>
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
               
            </ul>
        </div>
    );
};


export default Sidebar;
