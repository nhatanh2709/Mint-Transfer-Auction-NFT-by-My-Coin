const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    //const Token = await ethers.getContractFactory("Floppy")
    //const hardhatToken = await Token.deploy();
  
    //console.log("Token address:", await hardhatToken.getAddress());

    // const Vault = await ethers.getContractFactory("Vault");
    // const hardhatVault = await Vault.deploy();

    // console.log("Vault address",await hardhatVault.getAddress());

    // const USDT = await ethers.getContractFactory("USDT");
    // const hardhatUSDT = await USDT.deploy();

    //  console.log("USDT address",await hardhatUSDT.getAddress());

    // const USDT = await ethers.getContractFactory("USDT");
    // const hardhatUSDT = await USDT.deploy();

    //  console.log("USDT address",await hardhatUSDT.getAddress());

    // const ICO = await ethers.getContractFactory("FLPCrowdSale");
    // const ico = await ICO.deploy(1000, 1000, '0x91C630f30d7B163775C259a0029D0f46897b639e', '0x8305878EC18fA6102a059D38E3ED884191cb0D20')
    // console.log("ICO address",await ico.getAddress());

    // const Hero = await ethers.getContractFactory("Hero");
    // const hero = await Hero.deploy();
    // console.log("Hero address",await hero.getAddress());

    // const HeroMarketPlace = await ethers.getContractFactory("HeroMarketplace");
    // const heroMarketPlace = await HeroMarketPlace.deploy("0x6131d36258365c7B804865ce577Be9D9f3449067","0x8305878EC18fA6102a059D38E3ED884191cb0D20");
    // console.log("HeroMarketPlace address",await heroMarketPlace.getAddress());

    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.deploy("0x8305878EC18fA6102a059D38E3ED884191cb0D20","0x6131d36258365c7B804865ce577Be9D9f3449067");
    console.log("Auction address",await auction.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });