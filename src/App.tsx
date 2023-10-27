import React, { useState, useEffect } from 'react';
import { ParticleNetwork } from '@particle-network/auth';
import { SmartAccount } from '@particle-network/aa';
import { ParticleProvider } from '@particle-network/provider';
import { ethers } from 'ethers';
import { Presets, Client } from 'userop';
import { notification } from 'antd';
import './App.css';

const config = {
  projectId: process.env.REACT_APP_PROJECT_ID,
  clientKey: process.env.REACT_APP_CLIENT_KEY,
  appId: process.env.REACT_APP_APP_ID,
};

const particle = new ParticleNetwork({
  ...config,
  chainName: 'ethereum',
  chainId: 5,
  wallet: { displayWalletEntry: true },
});

const provider = new ethers.providers.Web3Provider(new ParticleProvider(particle.auth));

const smartAccountBiconomy = new SmartAccount(new ParticleProvider(particle.auth), {
  ...config,
  aaOptions: {
    simple: [{ chainId: 5, version: '1.0.0' }],
  },
});

particle.setERC4337({
  name: 'SIMPLE',
  version: '1.0.0'
})

const initializePaymaster = () => {
  const paymasterContext = { type: 'payg' };
  return Presets.Middleware.verifyingPaymaster(
    process.env.REACT_APP_STACKUP_PAYMASTER,
    paymasterContext
  );
};

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [isDeployed, setIsDeployed] = useState(null);

  useEffect(() => {
    if (userInfo) fetchAccountInfo();
  }, [userInfo]);

  const fetchAccountInfo = async () => {
    const address = await smartAccountBiconomy.getAddress();
    const balance = ethers.utils.formatEther(await provider.getBalance(address));
    const isDeployed = await smartAccountBiconomy.isDeployed();

    setEthBalance(balance);
    setIsDeployed(isDeployed);
  };

  const deployAccount = async () => {
    if (!isDeployed) {
      await smartAccountBiconomy.deployWalletContract();
    }
  };

  const handleLogin = async (preferredAuthType) => {
    const user = await particle.auth.login({ preferredAuthType });
    setUserInfo(user);
  };

  const executeUserOp = async () => {
    const paymaster = initializePaymaster();
    const signer = provider.getSigner();
    const builder = await Presets.Builder.SimpleAccount.init(signer, process.env.REACT_APP_RPC_URL, { paymasterMiddleware: paymaster });
    const client = await Client.init(process.env.REACT_APP_RPC_URL);

    const address = builder.getSender();
    console.log(`Account address: ${address}`);

    const res = await client.sendUserOperation(builder.execute("0x000000000000000000000000000000000000dEaD", ethers.utils.parseUnits('0.001', 'ether'), "0x"), {
      onBuild: (op) => console.log("Signed UserOperation:", op),
    });

    notification.success({
      message: "User operation successful",
      description: `userOpHash: ${res.userOpHash}`
    });
  };


  return (
      <div className="App">
        <div className="logo-section">
          <img src="https://i.imgur.com/EerK7MS.png" alt="Logo 1" className="logo logo-big"/>
          <img src="https://i.imgur.com/9gGvvtO.png" alt="Logo 2" className="logo"/>
        </div>
        {!userInfo ? (
          <div className="login-section">
            <button className="sign-button" onClick={() => handleLogin('google')}>Sign in with Google</button>
            <button className="sign-button" onClick={() => handleLogin('twitter')}>Sign in with Twitter</button>
          </div>
        ) : (
          <div className="profile-card">
            <h2>{userInfo.name}</h2>
            <div className="balance-section">
              <small>{ethBalance} ETH</small>
              {isDeployed ? (
                <button className="sign-message-button" onClick={executeUserOp}>Execute User Operation</button>
              ) : (
                <button className="sign-message-button" onClick={deployAccount}>Deploy Account</button>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default App;