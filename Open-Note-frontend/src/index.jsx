import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NoteState from './context/notes/NoteState';
import ThemeState from './context/theme/ThemeState';
import AuthState from './context/auth/AuthState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthState>
      <ThemeState>
        <NoteState>
          <App />
        </NoteState>
      </ThemeState>
    </AuthState>
  </React.StrictMode>
);
