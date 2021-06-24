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

  /*
   * 이더리움 관련 라이브러리, native 이더리움 관련 기능(block number, eth balance 등) 제공
   * 이더리움 체인, 주소, 메타마스크 enable 여부 등을 알 수 있음
   */
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
  /*
   * 이더리움 블록넘버 읽어오는 부분
   */
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

  /*
   * 이더리움 balance 가져오는 부분
   */  
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
  
  /*
   * sender의 input 태그에서 pair가 바뀔 시 해당 토큰의 balance를 업데이트를 모니터링하는 부분
   */
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

  /*
   * erc20 토큰의 balance를 읽는 함수
   */
  const getTokenBalance = () => {
    if(sendPair !== 'ETH'){
      const web3 = new Web3(window.ethereum)  //web3 객체 선언
      window.ethereum.enable()
      let tokenContract;

      if(chainId === 1){
        // main net
        if(sendPair === 'USDT'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.USDT.MainNet);  //컨트렉트 객체 선언
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
        }else if(sendPair === 'CXS'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.CXS.MainNet);
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
        }else if(sendPair === 'CXS'){
          tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.CXS.Ropsten);
        }
      }
      console.log('chainId: ' + chainId)
      console.log('sendPair: ' + sendPair)
      console.log(tokenContract)
      //console.log(tokenContract.methods)
      let testAccount = '0x41A058980e0AC42e16Fe942061744eC286333Af0'

      /*
       * 알고자 하는 Account의 balance 정보를 이더리움 블록체인에 읽어오는 부분
       * testAccount의 주소를 수정하면 해당 account의 balance를 읽어오게 됨
       */
      tokenContract.methods.balanceOf(testAccount).call() 
      .then( balance => {
        console.log('account: ' + account)
        console.log(sendPair, balance);
          
        setSendBalance(balance);
        
      });
    }

  }

  const handleApprove = () => {
    const web3 = new Web3(window.ethereum)  //web3 객체 선언
    window.ethereum.enable()
    
    let tokenContract = null
    let decimals = 0
    if(chainId === 1){
      if(sendPair === 'USDT'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.USDT.MainNet)  //토큰 컨트렉트 객체 선언
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
      }else if(sendPair === 'CXS'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.CXS.MainNet)
        decimals = tokenInfo.CXS.Decimals
      } 

      /* Big numbr 라이브러리를 통해 숫자의 사칙연산을 할 것이기 때문에 선언 후 사용
       * 모든 블록체인에서 (정수, 소수점 자리수)로 숫자를 다루는데 이는 스마트컨트렉트 안에서의 연산량을 최대한 줄이기 위한 것
       * 연산량은 이더리움 수수료의 증감에 영향을 미침.
       * 예를 들어, 1.1 ETH * 1.03 ETH 라는 계산을 한다고 하면,
       * 1.1 ETH 라는 숫자는 (1100000000000000000, 18) 표현되고
       * 1.03 ETH 라는 숫자는 (1030000000000000000, 18) 표협됩니다.
       * 1.1 ETH * 1.03 ETH는 고로 1100000000000000000 * 1030000000000000000를 한 뒤 10^18을 두번 나누는 작업을 합니다.
       * 앞의 숫자가 너무 크기 떄문에 변수에 안들어가는 경우(overflow)가 생기기때문에 제대로 된 곱셈 결과를 기대할 수 없습니다.
       * 이런 경우 말고도 underflow도 생길 수 있으며 원인은 동일합니다.
       * 이런 경우를 피하기 위해 아래 line 297과 같이 숫자를 big number 객체에 넣어 계산을 합니다.
       */
      var BN = web3.utils.BN; 
      var approveAmount = new BN(String(sendAmount)).mul(new BN(String(1 * 10 ** decimals)))

      /*
       * erc20 토큰의 경우 본인이 아닌 다른 주소가 본인의 토큰 발란스를 이용하려면 위임을 해주어야 합니다.
       * approve는 바로 위임해주는 method이며, 본 코드에서 uniswap의 factory contract가 사용자의 token을 위임받아 swap해주어야 하는 부분 때문에 필요합니다.
       */

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
      }else if(sendPair === 'CXS'){
        tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.CXS.Ropsten)
        decimals = tokenInfo.CXS.Decimals
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

    /*
     * Sender의 입장에서 sending 토큰이 몇개의 receiving 토큰으로 바뀔지에 대해 uniswap contract에 물어보는 기능입니다.
     */
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
    
    // 컨트렉트 객체를 선언할 때 다음과 같이 gas option으로 gas fee를 설정할 수 있습니다.
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
        }else if(recievePair === 'CXS'){
          path.push(tokenInfo.CXS.MainNet);
        }
        console.log('amountOutMin: ' + amountOutMin)
        console.log('path: ' + path)
        console.log('to: ' + to)
        console.log('deadline: ' + deadline)
        console.log('from: ' + account)
        console.log('value: ' + amountIn)

        // uniswap contract의 swapExactETHForTokens method를 이용하여 Eth <-> erc20를 swap할 수 있습니다.
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
        }else if(sendPair === 'CXS'){
          path.push(tokenInfo.CXS.MainNet);
          decimals = tokenInfo.CXS.Decimals
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
          // uniswap contract의 swapExactETHForTokens method를 이용하여 erc20 <-> ETH를 swap할 수 있습니다.
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
          }else if(recievePair === 'CXS'){
            path.push(tokenInfo.CXS.MainNet);
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
        }else if(recievePair === 'CXS'){
          path.push(tokenInfo.CXS.Ropsten);
        }
        console.log('amountOutMin: ' + amountOutMin)
        console.log('path: ' + path)
        console.log('to: ' + to)
        console.log('deadline: ' + deadline)
        console.log('from: ' + account)
        console.log('value: ' + amountIn)
        // uniswap contract의 swapExactETHForTokens method를 이용하여 erc20 <-> erc20 swap할 수 있습니다.
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
        }else if(sendPair === 'CXS'){
          path.push(tokenInfo.CXS.Ropsten);
          decimals = tokenInfo.CXS.Decimals
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
          }else if(recievePair === 'CXS'){
            path.push(tokenInfo.CXS.Ropsten);
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
                  {sendPair === "CXS"?
                    <input className="selectopt" name="test" type="radio" id="opt15" value="CXS" checked readOnly/>
                    :<input className="selectopt" name="test" type="radio" id="opt15" value="CXS"/>}
                  <label htmlFor="opt15" className="option"><img src={coinImage10} alt=''/>CXS</label>
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
                  {recievePair === "CXS"?
                    <input className="selectopt2" name="test" type="radio" id="opt16" value="CXS" checked readOnly/>
                    :<input className="selectopt2" name="test" type="radio" id="opt16" value="CXS"/>}
                  <label htmlFor="opt16" className="option"><img src={coinImage10} alt=''/>CXS</label>
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