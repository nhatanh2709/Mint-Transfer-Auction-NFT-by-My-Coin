require('dotenv').config();
const Web3 = require('web3');
const FloppyAbi = require('../artifacts/contracts/Floppy.sol/Floppy.json');
const VaultAbi = require('../artifacts/contracts/Vault.sol/Vault.json');
async function SmartContractDAO() {
    
    web3 = new Web3(process.env.URL);
    token_address = process.env.FloppyAddress;
    vault_address = process.env.VaultAddress;
    withdrawer_private_key = process.env.WITHDRAWER_PRIVATE_KEY;
    withdrawer_address = process.env.WITHDRAWER_ADDRESS;


    web3.accounts.wallet.add(withdrawer_private_key);
    const vault_contract = await web3.eth.Contract(VaultAbi,vault_address);
    var value = Web3.utils.toWei(amount.toString());
    var rs = await vault_contract.methods.withdraw(value,address).send({
        from :this.withdrawer_address,
        gas:3000000,
    })
    return rs.transactionsHash;
    
}
SmartContractDAO();