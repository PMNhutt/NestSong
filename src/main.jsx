import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        autoClose={1000} />
      <App />
    </Provider>
  </React.StrictMode>
)
