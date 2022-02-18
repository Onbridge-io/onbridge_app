import axios from "axios";
import { ethers } from "ethers";

import Networks from "../networks.json";

import L1TokenAbi from "../abis/L1Token.json";
import L1BridgeAbi from "../abis/L1Bridge.json";
import L2TokenAbi from "../abis/L2Token.json";
import L2BridgeAbi from "../abis/L2Bridge.json";

const host = process.env.REACT_APP_API_HOST;

const BSCTockenAddress = Networks[97].tokenAddress;
const BSCBridgeAddress = Networks[97].bridgeAddress;
const ETHTokenAddress = Networks[42].tokenAddress;
const ETHBridgeAddress = Networks[42].bridgeAddress;
const PolygonTokenAddress = Networks[80001].tokenAddress;
const PolygonBridgeAddress = Networks[80001].bridgeAddress;

export let provider = null;
let signer = null;
let BSCToken = null;
let BSCBridge = null;
let ETHToken = null;
let ETHBridge = null;
let PolygonToken = null;
let PolygonBridge = null;

let AddressZero = null;

let Contracts = null;

const deBridgeApiUrl = (hash) => {
  return `https://testapi101.debridge.finance/api/Transactions/GetFullSubmissionInfo?filter=${hash}&filterType=1`;
};

try {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  BSCToken = new ethers.Contract(BSCTockenAddress, L1TokenAbi, signer);
  BSCBridge = new ethers.Contract(BSCBridgeAddress, L1BridgeAbi, signer);
  ETHToken = new ethers.Contract(ETHTokenAddress, L2TokenAbi, signer);
  ETHBridge = new ethers.Contract(ETHBridgeAddress, L2BridgeAbi, signer);
  PolygonToken = new ethers.Contract(PolygonTokenAddress, L2TokenAbi, signer);
  PolygonBridge = new ethers.Contract(
    PolygonBridgeAddress,
    L2BridgeAbi,
    signer
  );

  AddressZero = ethers.constants.AddressZero;

  Contracts = {
    97: { Token: BSCToken, Bridge: BSCBridge, BridgeAddress: BSCBridgeAddress },
    42: { Token: ETHToken, Bridge: ETHBridge, BridgeAddress: ETHBridgeAddress },
    80001: {
      Token: PolygonToken,
      Bridge: PolygonBridge,
      BridgeAddress: PolygonBridgeAddress,
    },
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
  setTxLink,
  setIsLoading,
  setConfirmed,
  bridgeToChain,
  setDebridgeInfo
) {
  const Token = Contracts[chainId].Token;
  const Bridge = Contracts[chainId].Bridge;
  const BridgeAddress = Contracts[chainId].BridgeAddress;
  const signerAddress = await signer.getAddress();
  const allowance = (await Token.getApproved(tokenId)).toString();
  const bridgeToAddress = Contracts[bridgeToChain].BridgeAddress;

  const getDeBridgeInfo = (hash) => {
    console.log("Start: getDeBridgeInfo");
    let index = 1;

    let requestDeBridgeInfo = setInterval(() => {
      axios.get(deBridgeApiUrl(hash)).then((res) => {
        if (res) {
          setDebridgeInfo(res.data);

          if (Object.keys(res.data).length !== 0) {
            if (res.data.send !== null) {
              const { isExecuted } = res.data.send;

              console.log(`${index++}. Try get Debridge data`, res.data);

              if (isExecuted) {
                setDebridgeInfo(res.data);
                clearInterval(requestDeBridgeInfo);
              }
            }
          }
        }

        console.log(
          hash,
          deBridgeApiUrl(hash),
          `https://testnet.debridge.finance/transaction?tx${hash}&chainId=42`
        );
      });
    }, 2000);
  };

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
              ethers.utils.parseEther(
                `${Networks[chainId].brigingPrice[bridgeToChain].debridgeValue}`
              ),
              {
                from: signerAddress,
                value: ethers.utils.parseEther(
                  `${Networks[chainId].brigingPrice[bridgeToChain].value}`
                ),
              }
            ).then((tx) => {
              setTransactionStatus(`Outbound`);
              setTxLink(tx.hash);
              tx.wait().then(() => {
                setTransactionStatus(`Mined`);
                setTxLink(tx.hash);
                getDeBridgeInfo(tx.hash);
                setTimeout(function testTokens() {
                  // axios
                  //   .get(deBridgeApiUrl(tx.hash))
                  //   .then((res) => {
                  //     if (res) {
                  //       setDebridgeInfo(res.data);
                  //     }

                  //     console.log(
                  //       tx.hash,
                  //       deBridgeApiUrl(tx.hash),
                  //       `https://testnet.debridge.finance/transaction?tx${tx.hash}&chainId=42`
                  //     );
                  //   })
                  //   .catch((err) => console.log(err));
                  axios
                    .get(`${host}/tokens/`)
                    .then((response) => {
                      if (response.data.results[tokenId].chain_id !== chainId) {
                        setPending(false);
                        setChange((change) => !change);
                        setDisableButtons(false);
                        setIsLoading(false);
                        setConfirmed(true);
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
        setIsLoading(false);
      });

    return;
  }

  setIsLoading(true);
  Bridge.outboundTransfer(signerAddress, tokenId)
    .then((tx) => {
      tx.wait().then(() => {
        setIsLoading(false);
      });
    })
    .catch(() => {
      setIsLoading(true);
    });
}
