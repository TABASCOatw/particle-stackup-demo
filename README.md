<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
    Particle Stackup Demo
  </h3>
</div>

⚡️ ERC-4337 demo application showcasing utilization of [Particle Auth](https://docs.particle.network/developers/auth-service) (Smart WaaS) for account management (MPC-TSS social logins facilitating EOA creation as well as Smart Account deployment, SimpleAccount in this case), alongside **Stackup** (via userop.js).

Built using **Particle Auth**, **TypeScript**, **Ethers**, and **userop.js**

## 🔑 Particle Auth
Particle Auth, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc.

##

👉 Try the demo: https://web-demo.particle.network

👉 Learn more about Particle Network: https://particle.network

![Particle Auth Example](https://i.imgur.com/JA4nJMH.png)

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/TABASCOatw/particle-stackup-demo.git
```

### Install dependencies
```
yarn install
```
OR
```
npm install
```

### Set environment variables
This project requires a number of keys from Particle Network and WalletConnect to be defined in `.env`. The following should be defined:
- `REACT_APP_APP_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_PROJECT_ID`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_CLIENT_KEY`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_STACKUP_PAYMASTER`, the Stackup paymaster URL retrieved from the [Stackup dashboard](https://app.stackup.sh/).
-  `REACT_APP_RPC_URL`, an Ethereum Goerli RPC URL.

### Start the project
```
npm run dev
```
OR
```
yarn dev
```
