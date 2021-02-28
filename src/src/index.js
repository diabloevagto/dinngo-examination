import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import ReactDOM from 'react-dom';

import Auth from 'src/page/Auth';

import App from './App';

function getLibrary(provider) {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Auth>
      <App />
    </Auth>
  </Web3ReactProvider>,
  document.getElementById('root'),
);
