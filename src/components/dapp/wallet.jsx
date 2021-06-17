import {
  useWeb3React,
  UnsupportedChainIdError
} from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";

import { injected } from "./connectors";
import { useEagerConnect, useInactiveListener } from "./hooks";


import { useState, useEffect } from 'react'

import logoImage from '../../images/ic_logo_dark.png'

const connectorsByName = {
  Injected: injected,
};

export const Wallet = () => {
  
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    console.log('running')
    console.log(connector)
    if (activatingConnector && activatingConnector === connector) {
      console.log('set undefined')
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <header className="app">
      <div className="inner_header">
        <h1>
          <a href='/'><img src={logoImage} alt='logo'/></a>
        </h1>
        
        {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name];
          const activating = currentConnector === activatingConnector;
          const connected = currentConnector === connector;
          const disabled = !triedEager || !!activatingConnector || connected || !!error;
          console.log('connected:' + connected )
          console.log('active:' + active )
          console.log('disabled:' + disabled )
          console.log('connector:' + connector)
          console.log('activatingConnector:' + activatingConnector)
          return (
            
            <ul key={name}>
              <li>
              {active?
                <a className="header_btn wallet" onClick={ () => {deactivate()} }>
                  {account.substring(0, 6)}...{account.substring(account.length - 4)}
                </a>
                :
                <a className="header_btn wallet" disabled={disabled} onClick={ () => {
                    console.log('--------------')
                    console.log(currentConnector)
                    console.log(connectorsByName[name])
                    setActivatingConnector(currentConnector);
                    activate(connectorsByName[name]);
                    
                  }}>
                    Connect Wallet
                </a>
              }    
            </li>
          </ul>
          )      
        }
        )}    
    </div>
  </header>
  )
}
