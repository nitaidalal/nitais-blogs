import { createRoot } from 'react-dom/client'
import './index.css'
// make highlight.js globally available before any Quill or rendered HTML needs it
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
// attach to window so Quill's syntax module and view-time highlighting can use it
if (typeof window !== 'undefined') window.hljs = hljs;
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
)
