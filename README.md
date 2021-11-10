# Oracle examples with simple API call from offchain
* Oracle is the way to access the real world data or events. 
* This example is based on Rinkeby network.
* Don't forget to configure .env.example (Change to .env and put the right URL and private key)

### Download and Install
```shell
git clone https://github.com/wwarodom/simple_api.git
cd simple_api
npm i
```

### Simple API call example
```
npx hardhat run scripts/1_Deploy-simple-api-demo.ts --network rinkeby
```

### API Consumer by ChainLink example
```shell
npx hardhat run scripts/ChainLink-deploy-ApiConsumer.ts --network rinkeby
npx hardhat run scripts/ChainLink-volume-ApiConsumer.ts --network rinkeby
npx hardhat run scripts/ChainLink-withdraw-ApiConsumer.ts --network rinkeby
```
   