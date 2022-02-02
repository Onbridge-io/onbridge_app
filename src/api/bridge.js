import axios from "axios";
import { ethers } from "ethers";

import Networks from "../networks.json";
import { shortenAddress } from "../utils/web3";

import L1TokenAbi from "../abis/L1Token.json";
import L1BridgeAbi from "../abis/L1Bridge.json";
import L2TokenAbi from "../abis/L2Token.json";
import L2BridgeAbi from "../abis/L2Bridge.json";

const host = process.env.REACT_APP_API_HOST;

const L1TokenAddress = Networks[42].tokenAddress;
const L1BridgeAddress = Networks[42].bridgeAddress;
const L2TokenAddress = Networks[97].tokenAddress;
const L2BridgeAddress = Networks[97].bridgeAddress;

export let provider = null;
let signer = null;
let L1Token = null;
let L1Bridge = null;
let L2Token = null;
let L2Bridge = null;

let AddressZero = null;

let Contracts = null;

try {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  L1Token = new ethers.Contract(L1TokenAddress, L1TokenAbi, signer);
  L1Bridge = new ethers.Contract(L1BridgeAddress, L1BridgeAbi, signer);
  L2Token = new ethers.Contract(L2TokenAddress, L2TokenAbi, signer);
  L2Bridge = new ethers.Contract(L2BridgeAddress, L2BridgeAbi, signer);

  AddressZero = ethers.constants.AddressZero;

  Contracts = {
    42: { Token: L1Token, Bridge: L1Bridge, BridgeAddress: L1BridgeAddress },
    97: { Token: L2Token, Bridge: L2Bridge, BridgeAddress: L2BridgeAddress },
  };
} catch (e) {
  console.log(e);
}

export async function bridgeToken(
  chainId,
  tokenId,
  tokensChainId,
  change,
  setChange,
  setDisableButtons,
  setPending,
  setTransactionStatus,
  setTxLink
) {
  const Token = Contracts[chainId].Token;
  const Bridge = Contracts[chainId].Bridge;
  const BridgeAddress = Contracts[chainId].BridgeAddress;
  const signerAddress = await signer.getAddress();
  const allowance = (await Token.getApproved(tokenId)).toString();
  const bridgeToChain = tokensChainId === 42 ? 97 : 42;
  const bridgeToAddress =
    tokensChainId === 42 ? L2BridgeAddress : L1BridgeAddress;

  if (allowance === AddressZero) {
    setPending(true);
    Token.approve(BridgeAddress, tokenId, {
      from: signerAddress,
    })
      .then((tx) => {
        setTransactionStatus(`Approving`);
        setTxLink(tx.hash);
        tx.wait()
          .then(() => {
            setTransactionStatus(`Approved`);
            setTxLink(tx.hash);
            Bridge.outboundTransfer(
              signerAddress,
              tokenId,
              bridgeToChain,
              bridgeToAddress,
              ethers.utils.parseEther("0.01"),
              {
                from: signerAddress,
                value: ethers.utils.parseEther("0.03"),
              }
            ).then((tx) => {
              console.log(tokenId, bridgeToChain, bridgeToAddress);
              setTransactionStatus(`Outbound`);
              setTxLink(tx.hash);
              tx.wait().then(() => {
                setTransactionStatus(`Mined `);
                setTxLink(tx.hash);
                setTimeout(function testTokens() {
                  axios
                    .get(`${host}/tokens/`)
                    .then((response) => {
                      if (response.data.results[tokenId].chain_id !== chainId) {
                        setPending(false);
                        setChange((change) => !change);
                        setDisableButtons(false);
                      } else {
                        setTimeout(testTokens, 2000);
                        console.log("try");
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }, 1000);
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => {
        setPending(false);
      });

    return;
  } else {
    console.log("fg");
  }

  setPending(true);
  Bridge.outboundTransfer(signerAddress, tokenId)
    .then((tx) => {
      tx.wait().then(() => {
        setPending(false);
      });
    })
    .catch(() => {
      setPending(false);
    });
}
