import React from 'react';
import ReactDOM from 'react-dom';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
	<LocaleProvider locale={zh_CN}>
		<App />
	</LocaleProvider>, document.getElementById('root'));
registerServiceWorker();
