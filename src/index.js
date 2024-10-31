import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";
import store from './redux/store';
import AlertModal from './views/popups/AlertModal';
import ConfirmModal from './views/popups/ConfirmModal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

	<Provider store={store}>
		<CookiesProvider>
			<App />
			<AlertModal />
			<ConfirmModal />
		</CookiesProvider>
	</Provider>

)