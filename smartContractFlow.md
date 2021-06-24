# Uniswap smart contracts

This document covers uniswap smart contract types and flow.
모든 내용은 uniswap document의 [smart contract](https://uniswap.org/docs/v2/smart-contracts)를 참고하였습니다.
## Types and structure
1. Factory 
2. Pair
3. Pair(erc20)
4. Library
5. Router01 => uniswap 버전 1이라 depricated 되었습니다.
6. Router02

문자 그대로 Router02 컨트렉트가 1~4번 컨트렉트를 interface로서 감싸고 있는 구조이며, stateless 컨트렉트입니다.
사용할 수 있는 method를 보시려면 Router02를 통해 해당 method랑 mapping 되는 1~4번의 컨트렉트를 method를 보시면 됩니다.
실제로 개발하실때 사용할 주소는 Router02 주소 밖에 없을 것이고, 만약 풀 구성을 하실 때에는 Factory contract의 create pair method를 사용하셔야하기 때문에 이 method에 관해서만 Factory contract 주소를 이용하시면 될 것 같습니다.

[uniswap smart contract](https://uniswap.org/docs/v2/smart-contracts)에 각 컨트렉트의 method 및 deploy된 주소, interface들이 상세히 설명되어 있습니다.


