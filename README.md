# Developer's Guide with CoinXSwap

This document covers structure and its each component's description of CoinXSwap, ethereum based decentralized exchange.
## Components
1. Wallet

    - Wallet imported : Metamask
    - Library : @web3-react/core
    - Reference: [how to import wallet in react framework](https://consensys.net/blog/developers/how-to-fetch-and-update-data-from-ethereum-with-react-and-swr/)
    - Description : As Metamask wallet is installed and account is created inside user's wallet, wallet component will catch the signal from metamask and will initialize connector. From the provided connector, you can fetch and call transactions. Other wallets can be imported in same manner. Please see more at above reference documents([how to import wallet in react freamework](https://consensys.net/blog/developers/how-to-fetch-and-update-data-from-ethereum-with-react-and-swr/)).

2. Swap

    - Current configurations are set to [Uniswap V2 protocol](https://uniswap.org/docs/v2/smart-contracts/factory/). 
    - Types of swap transaction
        - Eth <-> erc20 token:
            
            Such amount of Eth can be directly converted to targeted ecr20 tokens if uniswap pool exists.
        - erc20 token <-> Eth:
            
            If such amount of erc20 token is approved which means authorized to uniswap contract, ecr20 token can be converted.
        - erc20 token <-> erc20 token:
            
            If such amount of erc20 token is approved which means authorized to uniswap contract, ecr20 token can be converted.
    - token info:

        all informations or configs are written in data/tokenContract.json.
3. Methods regarding blockhain parts
    
    - Initialize Web3 Object
        
        **const web3 = new Web3(window.ethereum)**
        
        This object is always used for handling web3 library.
    - How to initialize smart contract
        
        This project deals only with two types of smart contract: uniswap contract and erc20 contract. As smart contract is deployed to ethereum network, smart contract interface and logic are connected via its address. Therefore, to access the smart contract, address and ABI(interface) of the deployed smart contract is necessary.
        Below is the two examples for initializing uniswap and erc20 smart contract. 
        
        **uniSwapContract = new web3.eth.Contract(routerABI.abi, tokenInfo.FACTORY.MainNet)**

        **tokenContract = new web3.eth.Contract(tokenERC20ABI.abi, tokenInfo.USDT.MainNet)**

        As you can see in Contract Object, 1st arguement is ABI of the smart contract and 2st arg is the ethereum address of the smart contract deployed

    - How to Write transactions(Txs)
        
        To create transaction and pass to the ethreum network, there are a few steps to handle.
        
        1. Select address and method deployed in address
        2. Set appropriate arguments that matches the metho
        3. Call Metamask to sign transaction
        4. Get transaciton ID via callback

        Below is the example of Eth <-> ecr20 token swap:

        **uniSwapContract = new web3.eth.Contract(routerABI.abi, tokenInfo.FACTORY.MainNet)**

        - Initialize smart contract passing abi and address
        
        **uniSwapContract.methods
        .swapExactETHForTokens(amountOutMin, path, to, deadline)
        .send({from: account, value: amountIn})
        .then(receipt => {
          setTx(receipt.transactionHash)
          console.log('https://etherscan.io/tx/' + receipt.transactionHash)
        });**

        - UniswapContract is initiazlied methods in abi can be accessed
        - Filling in appropriate arguements
        - Since this method is about sending Eth and getting return for ERC20 token, it is obvious to send some amounts of Eth to uniswap smart contract. .send method is about this part.
        - After signing and publishing transaction to the ethereum network via metamask, receipt is called back. In this sample code, transactionHash is parsed and can be queried in etherscan.

    - How to Read Ethereum block data

        Any data that is written in ethereum blockchain or ram data can be accessed freely. The most frequently used cases is getting balance of erc20 token. Others like reading smart contract tables requires same approach.

        Below is the steps to read blockchain data:
        
        1. Select address and method deployed in address
        2. Set appropriate arguments that matches the method
        3. Request(call) method to ethereum network
        4. Get call back from ethereum network.

        Below is the example of ecr20 token balance:
        
        **tokenContract = new web3.eth.Contract(tokenERC20ABI.abi,tokenInfo.USDT.MainNet)**
        
        - Initialize token contract via abi and address

        **tokenContract.methods.balanceOf(account).call()
      .then( balance => {console.log(balance);});**

        - Since balanceOf method is inside ABI file and address, you can access balanceOf method via token address. Argument of balanceOf requires only one address. Therefore, quering balanceOf with account gives the targetting erc20 balance.

        - GetAmounts in uniswap function is also used in this project. You can see more on this [document](https://uniswap.org/docs/v2/smart-contracts/router02/). The steps to get amounts returned is same as above example.

4. Util
    
    - Big number library is used in this project to handle number related calculations. Ethereum tokens have at most 18 decimals. This makes overflow and underflow to variables. Please be careful handling numbers and always use big number library which is imported under web3.js.

5. CSS
    You can freely divide or manage css file to adopt in components.

6. Data folder
    - data.json : Project descriptions
    - tokenContract.json : Information of tokens and uniswap factory address and decimals.
    - uniswapV2ABI.json :  ABI file of uniswap Factory smart contract
    - uniswapV2ERC20ABI.json : ABI file of erc20 smart contract

## Build & Run

    This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

    In the project directory, you can run:

### `yarn start`

    Runs the app in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

    The page will reload if you make edits.\
    You will also see any lint errors in the console.

### `yarn build`

    Builds the app for production to the `build` folder.\
    It correctly bundles React in production mode and optimizes the build for the best performance.

    The build is minified and the filenames include the hashes.\
    Your app is ready to be deployed!