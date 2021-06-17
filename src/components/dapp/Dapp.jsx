import { useEffect } from 'react'
import {
  Web3ReactProvider
} from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Wallet } from './wallet'
import { Swap } from './swap'

const Dapp = () => {
  
  useEffect(() => {
    document.body.style.backgroundColor = '#f5f5f5';
  })
 const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
 }

  return (
    <div>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Wallet />
        <Swap />
      </Web3ReactProvider>
    </div>
  )
}

export default Dapp
