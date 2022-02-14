import chai from "chai";
import { ethers, waffle } from "hardhat";

const { deployContract } = waffle
const { expect } = chai

import GreeterArtifact from '../artifacts/contracts/Greeter.sol/Greeter.json'
import { Greeter } from '../artifacts/types'

describe("Greeter", function () {
  let greeter: Greeter;
  
  it("Should return the new greeting once it's changed", async function () {
 
    const signers = await ethers.getSigners()
    greeter = (await deployContract(signers[0], GreeterArtifact, ["Hello, world!"])) as Greeter

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
