import Web3 from 'web3'

// Explain promises: 
let getWeb3 = new Promise(function (resolve, reject) {
    var web3js = window.web3
    if (typeof web3js !== 'undefined') {
        var web3 = new Web3(web3js.currentProvider)
        console.log('Entire web3 library:', web3);
        resolve ({
            injectedWeb3: web3.eth.net.isListening (),
            web3 () {
                return web3
            }
        })
    } else {
        reject (new Error ('Unable to connect to Metamask'))
    }
})
.then(result => {
    /*
        Need to figure out what things we want to pass down from the entire web3 library:
        Each one below will be a block:
        1. Need a network id (to pass into the contract function)
        2. Need the account that is logged in / selected
        3. Need to get the balance? if you want; may not be relevant to this application but for others...
        4. Need functions that are specific to transactions (like signing, encrypting, etc.)
        5. Need the contract function so that we can get to our contracts
    */
})

export default getWeb3