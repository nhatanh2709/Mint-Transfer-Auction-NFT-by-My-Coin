const { expect } = require("chai");
const { ethers } = require("hardhat");
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { keccak256 } = require ("ethers");
function praseEther(amount) {
  return ethers.parseUnits(amount.toString(), 18);
}

describe("Vault", function () {
  let owner,alice,bob,carol;
  beforeEach(async function() {
    [owner, alice, bob, carol] = await ethers.getSigners();

    const Vault = await ethers.getContractFactory("Vault", owner);
    this.vault = await Vault.deploy();
    const Token = await ethers.getContractFactory("Floppy", owner);
    this.token = await Token.deploy();
    await this.vault.setToken(this.token.getAddress());  
    
  });
  describe("Testing", function () {
      it("Should deposit into the Vault", async function () {
        await this.token.transfer(alice.address, ethers.parseEther("1000000"));
        await this.token.connect(alice).approve(this.vault.getAddress(),this.token.balanceOf(alice.address));
        await this.vault.connect(alice).deposit(ethers.parseEther("500000"));
        expect(await this.token.balanceOf(this.vault.getAddress())).equal(ethers.parseEther("500000"));
      });
      it("Should withdraw", async function ()  {
        //grant withdrawer role to Bob
        let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
        await this.vault.grantRole(WITHDRAWER_ROLE, bob.address);
    
        // setter vault functions
    
        await this.vault.setWithdrawEnable(true);
        await this.vault.setMaxWithdrawAmount(ethers.parseEther("1000000"));
    
        // alice deposit into the vault
        await this.token.transfer(alice.address,ethers.parseEther("1000000"));
        await this.token.connect(alice).approve(this.vault.getAddress(),this.token.balanceOf(alice.address));
        await this.vault.connect(alice).deposit(ethers.parseEther("500000"));
    
        // bob withdraw into alice address
        await this.vault.connect(bob).withdraw(ethers.parseEther("300000"),alice.address);
        
        expect(await this.token.balanceOf(this.vault.getAddress())).equal(ethers.parseEther("200000"));
        expect(await this.token.balanceOf(alice.address)).equal(ethers.parseEther("800000"));
      });
      it("Should not deposit, Insufficient account balance", async function ()  {
        await this.token.transfer(alice.address,ethers.parseEther("1000000"));
        await this.token.connect(alice).approve(this.vault.getAddress(),this.token.balanceOf(alice.address));
        await expect (this.vault.connect(alice).deposit(ethers.parseEther("2000000"))).revertedWith('Insufficient account balance');
      });
      it("Should not withdraw, Withdraw is not available ", async function()  {
    //grant withdrawer role to Bob
      let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
      await this.vault.grantRole(WITHDRAWER_ROLE, bob.address);

      // setter vault functions

      await this.vault.setWithdrawEnable(false);
      await this.vault.setMaxWithdrawAmount(ethers.parseEther("1000000"));

      // alice deposit into the vault
      await this.token.transfer(alice.address,ethers.parseEther("1000000"));
      await this.token.connect(alice).approve(this.vault.getAddress(),this.token.balanceOf(alice.address));
      await this.vault.connect(alice).deposit(ethers.parseEther("500000"));

      // bob withdraw into alice address
      await expect (this.vault.connect(bob).withdraw(ethers.parseEther("300000"),alice.address)).revertedWith('Withdraw is not available');
    
      });
      it("Should not withdraw, Exceed maximum amount ", async function()  {
      //grant withdrawer role to Bob
      let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
      await this.vault.grantRole(WITHDRAWER_ROLE, bob.address);
  
      // setter vault functions
  
      await this.vault.setWithdrawEnable(true);
      await this.vault.setMaxWithdrawAmount(ethers.parseEther("1000"));
  
      // alice deposit into the vault
      await this.token.transfer(alice.address,ethers.parseEther("1000000"));
      await this.token.connect(alice).approve(this.vault.getAddress(),this.token.balanceOf(alice.address));
      await this.vault.connect(alice).deposit(ethers.parseEther("500000"));
  
      // bob withdraw into alice address
      await expect (this.vault.connect(bob).withdraw(ethers.parseEther("2000"),alice.address)).revertedWith('Exceed maximum amount');
         
      });
      it("Should not withdraw, Caller is not a withdrawer", async function()  {
      //grant withdrawer role to Bob
      let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
      await this.vault.grantRole(WITHDRAWER_ROLE, bob.address);

      // setter vault functions

      await this.vault.setWithdrawEnable(true);
      await this.vault.setMaxWithdrawAmount(ethers.parseEther("1000"));

      // alice deposit into the vault
      await this.token.transfer(alice.address,ethers.parseEther("1000000"));
      await this.token.connect(alice).approve(this.vault.getAddress(),this.token.balanceOf(alice.address));
      await this.vault.connect(alice).deposit(ethers.parseEther("500000"));

      // bob withdraw into alice address
      await expect (this.vault.connect(carol).withdraw(ethers.parseEther("1000"),alice.address)).revertedWith('Caller is not a withdrawer');  
    })
    it("Should not withdraw, ERC20: transfer amount exceeds balance", async function()  {
      //grant withdrawer role to Bob
      let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
      await this.vault.grantRole(WITHDRAWER_ROLE, bob.address);

      // setter vault functions

      await this.vault.setWithdrawEnable(true);
      await this.vault.setMaxWithdrawAmount(ethers.parseEther("5000"));

      // alice deposit into the vault
      await this.token.transfer(alice.address,ethers.parseEther("1000000"));
      await this.token.connect(alice).approve(this.vault.getAddress(),this.token.balanceOf(alice.address));
      await this.vault.connect(alice).deposit(ethers.parseEther("2000"));

      // bob withdraw into alice address
      await expect (this.vault.connect(bob).withdraw(ethers.parseEther("3000"),alice.address)).revertedWith('ERC20: transfer amount exceeds balance');
    
  })

  })  


  
});
