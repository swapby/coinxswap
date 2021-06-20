import { useState, useEffect, useRef } from 'react'

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
import coinImage9 from '../../images/swap/coin_09.png'
import coinImage10 from '../../images/swap/coin_10.png'

import arrowImage from '../../images/swap/image_crossed_arrow.png'



export const Swap = () => {
  const [sendPair, setSendPair] = useState('UNI')
  const [sendAmount, setSendAmount] = useState('0.000010')
  const [sendBalance, setSendBalance] = useState('0.00000')
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
    console.log('set sendPair changed to '+ e.target.value)
    setSendPair(e.target.value)
    //getTokenBalance()
    getAmountsOut()
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
  
  useEffect(() => {
    console.log('sendPair: ' + sendPair + ', chainId: ' + chainId)
    
    if(!sendPair && !chainId){
      console.log('start get token balance')
      console.log(sendPair)
      console.log(chainId)
      //getTokenBalance()
      
    }
  }, [sendPair, chainId])

  /*
  const prevSendBalanceRef = useRef();
  useEffect(() => {
    prevSendBalanceRef.current = sendBalance;
  });
  const prevSendBalance = prevSendBalanceRef.current;
  useEffect(() => {
    console.log('send balance: ' + sendBalance)
  }, [sendBalance])
  */
  const getTokenBalance = () => {
    if(sendPair !== 'ETH'){
      const web3 = new Web3(window.ethereum)
      window.ethereum.enable()
      let tokenContract;

      if(chainId === 1){
        // main net
        if(sendPair === 'USDT'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.USDT.MainNet);
        }else if(sendPair === 'LINK'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.LINK.MainNet);
        }else if(sendPair === 'UNI'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.UNI.MainNet);
        }else if(sendPair === 'PAX'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.PAX.MainNet);
        }else if(sendPair === 'MKR'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.MKR.MainNet);
        }else if(sendPair === 'DAI'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.DAI.MainNet);
        }else if(sendPair === 'CSX'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.CSX.MainNet);
        }

      }else if(chainId === 3){
        //ropsten
        if(sendPair === 'USDT'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.USDT.Ropsten);
        }else if(sendPair === 'LINK'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.LINK.Ropsten);
        }else if(sendPair === 'UNI'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.UNI.Ropsten);
        }else if(sendPair === 'PAX'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.PAX.Ropsten);
        }else if(sendPair === 'MKR'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.MKR.Ropsten);
        }else if(sendPair === 'DAI'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.DAI.Ropsten);
        }else if(sendPair === 'CSX'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.CSX.Ropsten);
        }
      }
      console.log('chainId: ' + chainId)
      console.log('sendPair: ' + sendPair)
      console.log(tokenContract)
      //console.log(tokenContract.methods)
      let testAccount = '0x41A058980e0AC42e16Fe942061744eC286333Af0'
      tokenContract.methods.balanceOf(testAccount).call()
      .then( balance => {
        console.log('account: ' + account)
        console.log(sendPair, balance);
          
        setSendBalance(balance);
        
      });
    }

  }

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
      }else if(sendPair === 'CSX'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.CSX.MainNet)
        decimals = tokenInfo.CSX.Decimals
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
      }else if(sendPair === 'CSX'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.CSX.Ropsten)
        decimals = tokenInfo.CSX.Decimals
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

  const getAmountsOut = () => {
    const web3 = new Web3(window.ethereum)
    window.ethereum.enable()
    var BN = web3.utils.BN;

    console.log(tokenInfo.FACTORY.MainNet)
    let uniSwapContract = new web3.eth.Contract(routerABI.abi, tokenInfo.FACTORY.MainNet)
    console.log('factory methods')
    console.log(uniSwapContract.methods)

    let path = []
    path.push(tokenInfo.ETH.MainNet)
    path.push(tokenInfo.DAI.MainNet)
    let amountIn = new BN(String(1 * 10 ** tokenInfo.ETH.Decimals))

    uniSwapContract.methods.getAmountsOut(amountIn, path)
    .call().then( result => {
      console.log('get amounts Out ouput : ')
      console.log(result)
    })
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
        }else if(recievePair === 'CSX'){
          path.push(tokenInfo.CSX.MainNet);
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
        }else if(sendPair === 'CSX'){
          path.push(tokenInfo.CSX.MainNet);
          decimals = tokenInfo.CSX.Decimals
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
          }else if(recievePair === 'CSX'){
            path.push(tokenInfo.CSX.MainNet);
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
        }else if(recievePair === 'CSX'){
          path.push(tokenInfo.CSX.Ropsten);
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
        }else if(sendPair === 'CSX'){
          path.push(tokenInfo.CSX.Ropsten);
          decimals = tokenInfo.CSX.Decimals
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
          }else if(recievePair === 'CSX'){
            path.push(tokenInfo.CSX.Ropsten);
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
              {/*<p>{prevSendBalance} {sendPair}</p>*/}
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
                  <label htmlFor="opt7" className="option"><img src={coinImage9} alt=''/>DAI</label>
                  {sendPair === "CSX"?
                    <input className="selectopt" name="test" type="radio" id="opt15" value="CSX" checked readOnly/>
                    :<input className="selectopt" name="test" type="radio" id="opt15" value="CSX"/>}
                  <label htmlFor="opt15" className="option"><img src={coinImage10} alt=''/>CSX</label>
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
                  <label htmlFor="opt14" className="option"><img src={coinImage9} alt=''/>DAI</label>
                  {sendPair === "CSX"?
                    <input className="selectopt2" name="test" type="radio" id="opt16" value="CSX" checked readOnly/>
                    :<input className="selectopt2" name="test" type="radio" id="opt16" value="CSX"/>}
                  <label htmlFor="opt16" className="option"><img src={coinImage10} alt=''/>CSX</label>
                </form>
              </div>
              <div className="inputbox">
                <input type="text" id="fname" name="fname" placeholder={recieveAmount} value={recieveAmount} onChange={recieveAmountHandler}/>
              </div>
                        
              <div className="wallt_address">
                {tx?
                  <span>
                    Tx
                    <a href={txUrl} target="_blank" rel="noreferrer">{tx.substring(0, 10)}...{tx.substring(25, 35)}</a>
                  </span>
                  :
                  <span>
                    Tx
                    <a href={txUrl} target="_blank" rel="noreferrer">1234567890...1234567890</a>
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
                    <li> </li>
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
