import { expect } from 'chai';
const { ethers } = require("hardhat");
describe("Token Contract", function() {
    it("Deployment should asign the total supply of tokens to the owner", async function() {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Floppy");
        const hardhatToken = await Token.deploy();
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    })
})
