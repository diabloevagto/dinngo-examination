import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';

export default function Auth(props) {
  const context = useWeb3React();
  const injected = new InjectedConnector({
    supportedChainIds: [3],
  });

  const { account, activate, deactivate, active, error } = context;

  return (
    <>
      {active ? (
        <>
          <p style={{ wordBreak: 'break-all' }}>{account}</p>
          <button
            onClick={() => {
              deactivate();
            }}
          >
            disconnect wallet
          </button>
          {props.children}
        </>
      ) : (
        <>
          <button
            onClick={() => {
              activate(injected);
            }}
          >
            connect wallet
          </button>
          {error && <p>{error.message}</p>}
        </>
      )}
    </>
  );
}
