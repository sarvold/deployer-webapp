import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthContextProvider } from './store/auth-context';

// Compatible with React 18. See https://github.com/reactwg/react-18/discussions/5
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOMClient.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>
);
