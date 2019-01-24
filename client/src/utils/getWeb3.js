import Web3 from 'web3'

const getWeb3 = new Promise(function(resolve, reject) {
    var web3js = window.web3
    if (typeof web3js === 'undefined') {
        // If it is undefined - we need to tell the user
        // to install or metamask or put blockchain in some how
        console.log('NO BLOCKCHAIN')
        // Will have to reject here because the app can't work 
        // without blockchain
        reject(new Error('Cannot connect to blockchain.  Please get blockchain injected into your app.'))
    } else {
        // Window does have blockchain - means that the user can
        // use our app properly
        console.log('YES BLOCKCHAIN')
        // console.log('Check 1:', web3js)
        // console.log('Check 2:', web3js.currentProvider)
        var web3 = new Web3(web3js.currentProvider)
        // console.log('Check 3', web3)
        resolve({
            web3() {
                return web3
            },
            injectedWeb3: web3.eth.net.isListening ()  
        }) 
    }
})

getWeb3
.then(result => {
    console.log('Here is what our function helped load:', result)

})
.catch(error => {
    console.log('Here is an error if blockchain isn not loaded properly:', error)
})

export default getWeb3;




















// Explain promises: 
// let getWeb3 = new Promise(function (resolve, reject) {
//     var web3js = window.web3
//     if (typeof web3js !== 'undefined') {
//         var web3 = new Web3(web3js.currentProvider)
//         // console.log('Entire web3 library:', web3);
//         resolve ({
//             injectedWeb3: web3.eth.net.isListening (),
//             web3 () {
//                 return web3
//             }
//         })
//     } else {
//         reject (new Error ('Unable to connect to Metamask'))
//     }
// })
// .then(result => {
    /* SAMPLE CODE 1: 
        return new Promise(function (resolve, reject) {
            let networkId = result.web3().givenProvider.networkVersion ? result.web3().givenProvider.networkVersion : 'Please provide a network id'
            result = Object.assign({}, result, {networkId})
            resolve(result)
         })
    */ 
    /* SAMPLE CODE 2: 
        return new Promise(function (resolve, reject) {
            result.web3().eth.getBalance(result.coinbase, (err, balance) => {
                if (err) {
                reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
                } else {
                result = Object.assign({}, result, { balance })
                resolve(result)
                }
            })
        })
    */    
    /*
        Need to figure out what things we want to pass down from the entire web3 library:
        Each one below will be a block:
        1. Need a network id (to pass into the contract function)
        2. Need the account that is logged in / selected
        3. Need to get the balance? if you want; may not be relevant to this application but for others...
        4. Need functions that are specific to transactions (like signing, encrypting, etc.)
        5. Need the contract function so that we can get to our contracts
    */
// })

// export default getWeb3