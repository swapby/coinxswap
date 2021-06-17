import { useState, useEffect } from 'react'

import {
  useWeb3React,
} from "@web3-react/core";


import Web3 from 'web3'
import Router02ABI from '../../data/uniswapV2ABI.json'
import ERC20ABI from '../../data/uniswapV2ERC20ABI.json'
import tokenContractInfo from '../../data/tokenContract.json'

import coinImage1 from '../../images/swap/coin_01.png'
import coinImage2 from '../../images/swap/coin_02.png'
import coinImage3 from '../../images/swap/coin_03.png'
import coinImage4 from '../../images/swap/coin_04.png'
import coinImage5 from '../../images/swap/coin_05.png'
import coinImage8 from '../../images/swap/coin_08.png'
import arrowImage from '../../images/swap/image_crossed_arrow.png'



export const Swap = () => {
  const [sendPair, setSendPair] = useState('UNI')
  const [sendAmount, setSendAmount] = useState('0.000010')
  const [recievePair, setRecievePair] = useState('PAX')
  const [recieveAmount, setRecieveAmount] = useState('0.000010')
  const [isApproved, setIsApproved] = useState(false)
  const [tx, setTx] = useState('')
  const [txUrl, setTxUrl] = useState('https://etherscan.io/tx/')
  const [routerABI, setRouterABI] = useState({})
  const [tokenERC20ABI, setTokenERC20ABI] = useState({})
  const [tokenInfo, setTokenInfo] = useState({})
  
  useEffect(() => {
    setRouterABI(Router02ABI)
    setTokenInfo(tokenContractInfo)
    setTokenERC20ABI(ERC20ABI)
    //console.log(tokenERC20ABI)
  }, [routerABI, tokenERC20ABI, tokenInfo])

  const sendPairHandler = (e) => {
    setSendPair(e.target.value)
  }
 
  const receivePairHandler = (e) => {
    setRecievePair(e.target.value)
  }

  const sendAmountHandler = (e) => {
    setSendAmount(e.target.value)
  }

  const recieveAmountHandler = (e) => {
    setRecieveAmount(e.target.value)
  }

  const switchHandler = (e) => {
    let pair = sendPair
    let amount = sendAmount
    setSendPair(recievePair)
    setSendAmount(recieveAmount)
    setRecievePair(pair)
    setRecieveAmount(amount)
  }

  const approvedHandler = () => {
    setIsApproved(!isApproved)
  }

  
  const context = useWeb3React();
  const {
    //connector,
    library,
    chainId,
    account,
    //activate,
    //deactivate,
    //active,
    //error
  } = context;

  // set up block listener
  const [blockNumber, setBlockNumber] = useState();
  useEffect(() => {
    console.log('running')
    if (library) {
      let stale = false;

      console.log('fetching block number!!')
      library
        .getBlockNumber()
        .then(blockNumber => {
          if (!stale) {
            setBlockNumber(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        });

      const updateBlockNumber = blockNumber => {
        setBlockNumber(blockNumber);
      };
      library.on("block", updateBlockNumber);

      return () => {
        library.removeListener("block", updateBlockNumber);
        stale = true;
        setBlockNumber(undefined);
      };
    }
  }, [library, chainId]);

  const [ethBalance, setEthBalance] = useState();
  useEffect(() => {
    console.log('running')
    if (library && account) {
      let stale = false;

      library
        .getBalance(account)
        .then(balance => {
          if (!stale) {
            setEthBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setEthBalance(null);
          }
        });

      return () => {
        stale = true;
        setEthBalance(undefined);
      };
    }
  }, [library, account, chainId]);
  
  const handleApprove = () => {
    const web3 = new Web3(window.ethereum)
    window.ethereum.enable()
    
    let tokenContract = null
    let decimals = 0
    if(chainId === 1){
      if(sendPair === 'USDT'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.USDT.MainNet)
        decimals = tokenInfo.USDT.Decimals
      }else if(sendPair === 'LINK'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.LINK.MainNet)
        decimals = tokenInfo.LINK.Decimals
      }else if(sendPair === 'UNI'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.UNI.MainNet)
        decimals = tokenInfo.UNI.Decimals
      }else if(sendPair === 'PAX'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.PAX.MainNet)
        decimals = tokenInfo.PAX.Decimals
      }else if(sendPair === 'MKR'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.MKR.MainNet)
        decimals = tokenInfo.MKR.Decimals
      }else if(sendPair === 'DAI'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.DAI.MainNet)
        decimals = tokenInfo.DAI.Decimals
      } 

      var BN = web3.utils.BN;
      var approveAmount = new BN(String(sendAmount)).mul(new BN(String(1 * 10 ** decimals)))

      tokenContract.methods.approve(tokenInfo.FACTORY.MainNet, approveAmount)
      .send({from: account})
      .then(receipt => {
        setTx(receipt.transactionHash)
        setTxUrl('https://etherscan.io/tx/' + receipt.transactionHash)
      });
    }else if(chainId === 3){
      if(sendPair === 'USDT'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.USDT.Ropsten)
        decimals = tokenInfo.USDT.Decimals
      }else if(sendPair === 'LINK'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.LINK.Ropsten)
        decimals = tokenInfo.LINK.Decimals
      }else if(sendPair === 'UNI'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.UNI.Ropsten)
        decimals = tokenInfo.UNI.Decimals
      }else if(sendPair === 'PAX'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.PAX.Ropsten)
        decimals = tokenInfo.PAX.Decimals
      }else if(sendPair === 'MKR'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.MKR.Ropsten)
        decimals = tokenInfo.MKR.Decimals
      }else if(sendPair === 'DAI'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.DAI.Ropsten)
        decimals = tokenInfo.DAI.Decimals
      }

      /* *********************************************************************************** */
      // sendAmount * 10 ** decimals big num handling
      var BN = web3.utils.BN;
      
      var approveAmount = new BN(String(sendAmount)).mul(new BN(String(1 * 10 ** decimals)))
      
      tokenContract.methods.approve(tokenInfo.FACTORY.Ropsten, approveAmount)
      .send({from: account})
      .then(receipt => {
        setTx(receipt.transactionHash)
        setTxUrl('https://ropsten.etherscan.io/tx/' + receipt.transactionHash)
      });
    }
  }

  const handleSwap = () => {
    const web3 = new Web3(window.ethereum)
    window.ethereum.enable()
    var BN = web3.utils.BN;

    let uniSwapContract = null
    let ContractOptions = {
      gas: '298785',
      gasPrice: web3.utils.toWei('44', 'gwei')
    }
    
    if(chainId === 1){
      console.log('MainNet in')
      uniSwapContract = new web3.eth.Contract(routerABI.abi, tokenInfo.FACTORY.MainNet, ContractOptions)
      if(sendPair === 'ETH'){
        let amountIn
        if(sendAmount < 1){
          amountIn = new web3.utils.toBN(String(sendAmount * 10 ** tokenInfo.ETH.Decimals));  
          console.log('amountIn < 1 : ' + amountIn)
        }else{
          amountIn = new BN(String(sendAmount)).mul(new BN(String(1 * 10 ** tokenInfo.ETH.Decimals)))
          console.log('amountIn > 1 : ' + amountIn)
        }

        let amountOutMin = new BN(String(1 * 10 ** 0));
        let path = []
        //let to = tokenInfo.FACTORY.MainNet;
        let to = account;
        let deadline = Date.now() + 1000 * 60 * 10;

        path.push(tokenInfo.ETH.MainNet)
        if(recievePair === 'USDT'){
          path.push(tokenInfo.USDT.MainNet);
        }else if(recievePair === 'LINK'){
          path.push(tokenInfo.LINK.MainNet);
        }else if(recievePair === 'UNI'){
          path.push(tokenInfo.UNI.MainNet);
        }else if(recievePair === 'PAX'){
          path.push(tokenInfo.PAX.MainNet);
        }else if(recievePair === 'MKR'){
          path.push(tokenInfo.MKR.MainNet);
        }else if(recievePair === 'DAI'){
          path.push(tokenInfo.DAI.MainNet);
        }
        console.log('amountOutMin: ' + amountOutMin)
        console.log('path: ' + path)
        console.log('to: ' + to)
        console.log('deadline: ' + deadline)
        console.log('from: ' + account)
        console.log('value: ' + amountIn)
        uniSwapContract.methods
        .swapExactETHForTokens(amountOutMin, path, to, deadline)
        .send({from: account, value: amountIn})
        .then(receipt => {
          setTx(receipt.transactionHash)
          setTxUrl('https://etherscan.io/tx/' + receipt.transactionHash)
        });
      }else {
        console.log('send pair is token')
        let amountIn;
        let amountOutMin = new BN(String(1 * 10 ** 0));
        let path = [];
        let to = tokenInfo.FACTORY.Ropsten;
        let deadline = Date.now() + 1000 * 60 * 10
        let decimals;
        if(sendPair === 'USDT'){
          path.push(tokenInfo.USDT.MainNet);
          decimals = tokenInfo.USDT.Decimals
        }else if(sendPair === 'LINK'){
          path.push(tokenInfo.LINK.MainNet);
          decimals = tokenInfo.LINK.Decimals
        }else if(sendPair === 'UNI'){
          path.push(tokenInfo.UNI.MainNet);
          decimals = tokenInfo.UNI.Decimals
        }else if(sendPair === 'PAX'){
          path.push(tokenInfo.PAX.MainNet);
          decimals = tokenInfo.PAX.Decimals
        }else if(sendPair === 'MKR'){
          path.push(tokenInfo.MKR.MainNet);
          decimals = tokenInfo.MKR.Decimals
        }else if(sendPair === 'DAI'){
          path.push(tokenInfo.DAI.MainNet);
          decimals = tokenInfo.DAI.Decimals
        }

        if(sendAmount < 1){
          amountIn = new web3.utils.toBN(String(sendAmount * 10 ** decimals));  
          console.log('amountIn < 1 : ' + amountIn)
        }else{
          amountIn = new BN(String(sendAmount)).mul(new BN(String(1 * 10 ** decimals)))
          console.log('amountIn > 1 : ' + amountIn)
        }
        
        if(recievePair === 'ETH'){
          path.push(tokenInfo.ETH.MainNet);

          console.log('amountIn: ' + amountIn)
          console.log('amountOutMin: ' + amountOutMin)
          console.log('path: ' + path)
          console.log('to: ' + to)
          console.log('deadline: ' + deadline)
          console.log('from: ' + account)
          uniSwapContract.methods
          .swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline)
          .send({from: account})
          .then(receipt => {
            setTx(receipt.transactionHash)
            setTxUrl('https://etherscan.io/tx/' + receipt.transactionHash)
          });
        }else{
          if(recievePair === 'ETH'){
            path.push(tokenInfo.ETH.MainNet);
          }else if(recievePair === 'USDT'){
            path.push(tokenInfo.USDT.MainNet);
          }else if(recievePair === 'LINK'){
            path.push(tokenInfo.LINK.MainNet);
          }else if(recievePair === 'UNI'){
            path.push(tokenInfo.UNI.MainNet);
          }else if(recievePair === 'PAX'){
            path.push(tokenInfo.PAX.MainNet);
          }else if(recievePair === 'MKR'){
            path.push(tokenInfo.MKR.MainNet);
          }else if(recievePair === 'DAI'){
            path.push(tokenInfo.DAI.MainNet);
          }
           
          console.log('amountIn: ' + amountIn)
          console.log('amountOutMin: ' + amountOutMin)
          console.log('path: ' + path)
          console.log('to: ' + to)
          console.log('deadline: ' + deadline)
          console.log('from: ' + account)
          uniSwapContract.methods
          .swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline)
          .send({from: account})
          .then(receipt => {
            setTx(receipt.transactionHash)
            setTxUrl('https://etherscan.io/tx/' + receipt.transactionHash)
          });
        }
      }  
    }else if(chainId === 3){
      console.log('ropsten in')
      uniSwapContract = new web3.eth.Contract(routerABI.abi, tokenInfo.FACTORY.Ropsten, ContractOptions)
      //uniSwapContract = new web3.eth.Contract(routerABI.abi, tokenInfo.FACTORY.Ropsten)
      if(sendPair === 'ETH'){
        console.log('sendPair : ' + sendPair)
        let amountIn;
        
        if(sendAmount < 1){
          amountIn = new web3.utils.toBN(String(sendAmount * 10 ** tokenInfo.ETH.Decimals));  
          console.log('amountIn < 1 : ' + amountIn)
        }else{
          amountIn = new BN(String(sendAmount)).mul(new BN(String(1 * 10 ** tokenInfo.ETH.Decimals)))
          console.log('amountIn > 1 : ' + amountIn)
        }
        
        let amountOutMin = new BN(String(1 * 10 ** 0));
        let path = []
        let to = account;
        let deadline = Date.now() + 1000 * 60 * 10;

        path.push(tokenInfo.ETH.Ropsten)
        if(recievePair === 'USDT'){
          path.push(tokenInfo.USDT.Ropsten);
        }else if(recievePair === 'LINK'){
          path.push(tokenInfo.LINK.Ropsten);
        }else if(recievePair === 'UNI'){
          path.push(tokenInfo.UNI.Ropsten);
        }else if(recievePair === 'PAX'){
          path.push(tokenInfo.PAX.Ropsten);
        }else if(recievePair === 'MKR'){
          path.push(tokenInfo.MKR.Ropsten);
        }else if(recievePair === 'DAI'){
          path.push(tokenInfo.DAI.Ropsten);
        }
        console.log('amountOutMin: ' + amountOutMin)
        console.log('path: ' + path)
        console.log('to: ' + to)
        console.log('deadline: ' + deadline)
        console.log('from: ' + account)
        console.log('value: ' + amountIn)
        uniSwapContract.methods
        .swapExactETHForTokens(amountOutMin, path, to, deadline)
        .send({from: account, value: amountIn})
        .then(receipt => {
          setTx(receipt.transactionHash)
          setTxUrl('https://ropsten.etherscan.io/tx/' + receipt.transactionHash)
        });
      }else {
        console.log('send pair is token')
        let amountIn;
        let amountOutMin = web3.utils.toBN(String(1 * 10 ** 0));
        let path = [];
        let to = tokenInfo.FACTORY.Ropsten;
        let deadline = Date.now() + 1000 * 60 * 10
        let decimals;
        if(sendPair === 'USDT'){
          path.push(tokenInfo.USDT.Ropsten);
          decimals = tokenInfo.USDT.Decimals
        }else if(sendPair === 'LINK'){
          path.push(tokenInfo.LINK.Ropsten);
          decimals = tokenInfo.LINK.Decimals
        }else if(sendPair === 'UNI'){
          path.push(tokenInfo.UNI.Ropsten);
          decimals = tokenInfo.UNI.Decimals
        }else if(sendPair === 'PAX'){
          path.push(tokenInfo.PAX.Ropsten);
          decimals = tokenInfo.PAX.Decimals
        }else if(sendPair === 'MKR'){
          path.push(tokenInfo.MKR.Ropsten);
          decimals = tokenInfo.MKR.Decimals
        }else if(sendPair === 'DAI'){
          path.push(tokenInfo.DAI.Ropsten);
          decimals = tokenInfo.DAI.Decimals
        }

        if(sendAmount < 1){
          amountIn = new web3.utils.toBN(String(sendAmount * 10 ** decimals));  
        }else{
          amountIn = new BN(String(sendAmount)).mul(new BN(String(1 * 10 ** decimals)))
        }
              
        console.log('amountIn3: ' + amountIn)
        
        if(recievePair === 'ETH'){
          path.push(tokenInfo.ETH.Ropsten);

          console.log('amountIn: ' + amountIn)
          console.log('amountOutMin: ' + amountOutMin)
          console.log('path: ' + path)
          console.log('to: ' + to)
          console.log('deadline: ' + deadline)
          console.log('from: ' + account)
          uniSwapContract.methods
          .swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline)
          .send({from: account})
          .then(receipt => {
            setTx(receipt.transactionHash)
            setTxUrl('https://ropsten.etherscan.io/tx/' + receipt.transactionHash)
          });
        }else{
          if(recievePair === 'ETH'){
            path.push(tokenInfo.ETH.Ropsten);
          }else if(recievePair === 'USDT'){
            path.push(tokenInfo.USDT.Ropsten);
          }else if(recievePair === 'LINK'){
            path.push(tokenInfo.LINK.Ropsten);
          }else if(recievePair === 'UNI'){
            path.push(tokenInfo.UNI.Ropsten);
          }else if(recievePair === 'PAX'){
            path.push(tokenInfo.PAX.Ropsten);
          }else if(recievePair === 'MKR'){
            path.push(tokenInfo.MKR.Ropsten);
          }else if(recievePair === 'DAI'){
            path.push(tokenInfo.DAI.Ropsten);
          }
            
          console.log('amountIn: ' + amountIn)
          console.log('amountOutMin: ' + amountOutMin)
          console.log('path: ' + path)
          console.log('to: ' + to)
          console.log('deadline: ' + deadline)
          console.log('from: ' + account)
          uniSwapContract.methods
          .swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline)
          .send({from: account})
          .then(receipt => {
            setTx(receipt.transactionHash)
            setTxUrl('https://ropsten.etherscan.io/tx/' + receipt.transactionHash)
          });
        }
      } 
    }
  }
  
  return (   
    <div className="container">
      <div className="hero-title">
        <div className="title">
          <div className="wallet_container">
            <img src={arrowImage} alt='' className="crossedarrow" onClick={switchHandler}/>
            <div className="wallet_box">
              <h1>SEND</h1>
              <div className="select" tabIndex="1"  style={{zIndex: 1010}}>
                <form className="selectopt" onChange={sendPairHandler}>
                  {sendPair === "USDT"?
                    <input className="selectopt" name="test" type="radio" id="opt1" value="USDT" defaultChecked readOnly/>
                    :<input className="selectopt" name="test" type="radio" id="opt1" value="USDT" defaultChecked/>}
                  <label htmlFor="opt1" className="option"><img src={coinImage1} alt=''/>USDT</label>
                  {sendPair === "LINK"?
                    <input className="selectopt" name="test" type="radio" id="opt2" value="LINK" checked readOnly/>
                    :<input className="selectopt" name="test" type="radio" id="opt2" value="LINK"/>}
                  <label htmlFor="opt2" className="option"><img src={coinImage2} alt=''/>LINK</label>
                  {sendPair === "UNI"?
                    <input className="selectopt" name="test" type="radio" id="opt3" value="UNI" checked readOnly/>
                    :<input className="selectopt" name="test" type="radio" id="opt3" value="UNI"/>}
                  <label htmlFor="opt3" className="option"><img src={coinImage3} alt=''/>UNI</label>
                  {sendPair === "PAX"?
                    <input className="selectopt" name="test" type="radio" id="opt4" value="PAX" checked readOnly/>
                    :<input className="selectopt" name="test" type="radio" id="opt4" value="PAX"/>}
                  <label htmlFor="opt4" className="option"><img src={coinImage4} alt=''/>PAX</label>
                  {sendPair === "MKR"?
                    <input className="selectopt" name="test" type="radio" id="opt5" value="MKR" checked readOnly/>
                    :<input className="selectopt" name="test" type="radio" id="opt5" value="MKR"/>}
                  <label htmlFor="opt5" className="option"><img src={coinImage5} alt=''/>MKR</label>
                  {sendPair === "ETH"?
                    <input className="selectopt" name="test" type="radio" id="opt6" value="ETH" checked readOnly/>
                    :<input className="selectopt" name="test" type="radio" id="opt6" value="ETH"/>}
                  <label htmlFor="opt6" className="option"><img src={coinImage8} alt=''/>ETH</label>
                  {sendPair === "DAI"?
                    <input className="selectopt" name="test" type="radio" id="opt7" value="DAI" checked readOnly/>
                    :<input className="selectopt" name="test" type="radio" id="opt7" value="DAI"/>}
                  <label htmlFor="opt7" className="option"><img src={coinImage8} alt=''/>DAI</label>
                </form>
              </div>
              <div className="inputbox">
                  <input type="text" id="fname" name="fname" placeholder={sendAmount} value={sendAmount} onChange={sendAmountHandler}/>
              </div>
            </div>

            <div className="wallet_box box2">
              <h1>RECIEVE</h1>
              <div className="select" tabIndex="2">
                <form onChange={receivePairHandler}>
                  {recievePair === "USDT"?
                    <input className="selectopt2" name="test2" type="radio" id="opt8" value="USDT" checked readOnly/>
                    :<input className="selectopt2" name="test2" type="radio" id="opt8" value="USDT" />}
                  <label htmlFor="opt8" className="option"><img src={coinImage1} alt=''/>USDT</label>
                  {recievePair === "LINK"?
                    <input className="selectopt2" name="test2" type="radio" id="opt9" value="LINK" checked readOnly/>
                    :<input className="selectopt2" name="test2" type="radio" id="opt9" value="LINK"/>}
                  <label htmlFor="opt9" className="option"><img src={coinImage2} alt=''/>LINK</label>
                  {recievePair === "UNI"?
                    <input className="selectopt2" name="test2" type="radio" id="opt10" value="UNI" checked readOnly/>
                    :<input className="selectopt2" name="test2" type="radio" id="opt10" value="UNI"/>}
                  <label htmlFor="opt10" className="option"><img src={coinImage3} alt=''/>UNI</label>
                  {recievePair === "PAX"?
                    <input className="selectopt2" name="test2" type="radio" id="opt11" value="PAX" defaultChecked readOnly/>
                    :<input className="selectopt2" name="test2" type="radio" id="opt11" value="PAX"/>}
                  <label htmlFor="opt11" className="option"><img src={coinImage4} alt=''/>PAX</label>
                  {recievePair === "MKR"?
                    <input className="selectopt2" name="test2" type="radio" id="opt12" value="MKR" checked readOnly/>
                    :<input className="selectopt2" name="test2" type="radio" id="opt12" value="MKR"/>}
                  <label htmlFor="opt12" className="option"><img src={coinImage5} alt=''/>MKR</label>
                  {recievePair === "ETH"?
                    <input className="selectopt2" name="test2" type="radio" id="opt13" value="ETH" checked readOnly/>
                    :<input className="selectopt2" name="test2" type="radio" id="opt13" value="ETH"/>}
                  <label htmlFor="opt13" className="option"><img src={coinImage8} alt=''/>ETH</label>
                  {recievePair === "DAI"?
                    <input className="selectopt2" name="test2" type="radio" id="opt14" value="DAI" checked readOnly/>
                    :<input className="selectopt2" name="test2" type="radio" id="opt14" value="DAI"/>}
                  <label htmlFor="opt14" className="option"><img src={coinImage8} alt=''/>DAI</label>
                </form>
              </div>
              <div className="inputbox">
                <input type="text" id="fname" name="fname" placeholder={recieveAmount} value={recieveAmount} onChange={recieveAmountHandler}/>
              </div>
                        
              <div className="wallt_address">
                Tx
                {tx? 
                  <span>
                    <a href={txUrl} target="_blank" rel="noreferrer">{tx.substring(0, 10)}...{tx.substring(25, 35)}</a>
                  </span>
                  :
                  <span>
                  </span>
                }
                
              </div>
            </div>
                        
            <div className="wallet_btn_wrap">
              <ul>
                {sendPair === 'ETH'?
                  <li><a href='#!' className="wallet_btn" onClick={handleSwap}>Swap</a></li>
                  :isApproved?
                  <div>
                    <li><a href='#!' className="wallet_btn_2" onClick={approvedHandler}>Approve</a></li>
                    <li><a href='#!' className="wallet_btn_2" onClick={handleSwap}>Swap</a></li>
                  </div>
                  :
                  <div>
                    <li><a href='#!' className="wallet_btn_2 wallet_approve" onClick={handleApprove}>Approve</a></li>
                    <li><a href='#!' className="wallet_btn_2" onClick={handleSwap}>Swap</a></li>
                  </div>
                }                        
              </ul>
            </div>                            
          </div>
        </div>
      </div>
    </div>
  )
}
