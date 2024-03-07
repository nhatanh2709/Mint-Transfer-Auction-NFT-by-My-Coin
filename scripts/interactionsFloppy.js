require('dotenv').config();
const { Web3 } = require('web3');
const FloppyAbi = require('../artifacts/contracts/Floppy.sol/Floppy.json');
const floppyAddress = "0xe0D3A61d88F0D4B1cfe239F5B94978a4701979b7";
myPrivateKey = process.env.PRIV_KEY;
myAddress = "0xB3701D5D1fCa73263c6C5B1328E248A6d1Ce2AAF"
receiverAddress = "0x993E3B67a1A24a91349F63CfB7ebAA1ba09456E9"
async function interact(){
    web3 = await new Web3('https://data-seed-prebsc-2-s2.binance.org:8545');
    flobbyContract = await new web3.eth.Contract(floppyAbi,floppyAddress);
    myBlance = await flobbyContract.methods.balanceOf(myAddress).call();
    console.log(myBlance);

    await web3.eth.accounts.wallet.add(myPrivateKey);
    receiverBalanceBefore = await flobbyContract.methods.balanceOf(receiverAddress).call();
    rs = await flobbyContract.methods.transfer(receiverAddress,100000).send({
        from : myAddress,
        gas: 3000000

    })
    receiverBalanceAfter = await flobbyContract.methods.balanceOf(receiverAddress).call();
    console.log(rs,receiverBalanceBefore,receiverBalanceAfter);
}
interact();