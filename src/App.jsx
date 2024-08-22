import { Routes, Route } from 'react-router-dom';

import './global.css';
import Home from './pages/Home/Home.jsx';
import Workspace from './pages/Workspace/Workspace.jsx';
import NewWorkspace from './pages/NewWorkspace/NewWorkspace.jsx';
import NotFound from './pages/404NotFound/404NotFound.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workspace/new" element={<NewWorkspace />} />
            <Route path="/workspace/:id_workspace/:id_channel" element={<Workspace />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
