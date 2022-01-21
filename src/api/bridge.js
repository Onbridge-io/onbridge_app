import axios from "axios";
import { ethers } from "ethers";

import Networks from "../networks.json";
import { shortenAddress } from "../utils/web3";

import L1TokenAbi from "../abis/L1Token.json";
import L1BridgeAbi from "../abis/L1Bridge.json";
import L2TokenAbi from "../abis/L2Token.json";
import L2BridgeAbi from "../abis/L2Bridge.json";

const host = process.env.REACT_APP_API_HOST;

const L1TokenAddress = Networks[1337].tokenAddress;
const L1BridgeAddress = Networks[1337].bridgeAddress;
const L2TokenAddress = Networks[1338].tokenAddress;
const L2BridgeAddress = Networks[1338].bridgeAddress;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const L1Token = new ethers.Contract(L1TokenAddress, L1TokenAbi, signer);
const L1Bridge = new ethers.Contract(L1BridgeAddress, L1BridgeAbi, signer);
const L2Token = new ethers.Contract(L2TokenAddress, L2TokenAbi, signer);
const L2Bridge = new ethers.Contract(L2BridgeAddress, L2BridgeAbi, signer);

const AddressZero = ethers.constants.AddressZero;

const Contracts = {
  1337: { Token: L1Token, Bridge: L1Bridge, BridgeAddress: L1BridgeAddress },
  1338: { Token: L2Token, Bridge: L2Bridge, BridgeAddress: L2BridgeAddress },
};

export async function bridgeToken(
  chainId,
  tokenId,
  setPending,
  setTransactionStatus,
  setChange,
  change,
  setDisableButtons
) {
  const Token = Contracts[chainId].Token;
  const Bridge = Contracts[chainId].Bridge;
  const BridgeAddress = Contracts[chainId].BridgeAddress;
  const signerAddress = await signer.getAddress();
  const allowance = (await Token.getApproved(tokenId)).toString();

  if (allowance === AddressZero) {
    setPending(true);
    Token.approve(BridgeAddress, tokenId)
      .then((tx) => {
        setTransactionStatus(`Approving with hash: ${shortenAddress(tx.hash)}`);
        tx.wait()
          .then(() => {
            setTransactionStatus(
              `Approved with hash: ${shortenAddress(tx.hash)}`
            );
            Bridge.outboundTransfer(signerAddress, tokenId).then((tx) => {
              setTransactionStatus(
                `Outbound with hash: ${shortenAddress(tx.hash)}`
              );
              tx.wait().then(() => {
                setTransactionStatus(
                  `Mined with hash: ${shortenAddress(tx.hash)}`
                );
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
