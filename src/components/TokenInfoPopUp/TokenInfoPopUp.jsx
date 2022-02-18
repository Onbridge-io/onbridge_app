import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { useWeb3React } from "@web3-react/core";

import { GalleryItem } from "../Gallery/GalleryItem/GalleryItem";
import { Button } from "..";
import { bridgeToken } from "../../api/bridge";
import { shortenAddress } from "../../utils/web3";

import networks from "../../networks.json";
import {
  ModalWrapper as ModalWrapperStyled,
  ModalOverlay,
  ModalBlock,
  ModalContent,
  ModalInfoTransfer,
  ModalChainTransferInfo,
  ModalChainBlock,
  ModalLoadingWrapper,
  ModalLoadingBlock,
  ModalLoadingStageBlock,
  ModalLoadingProcessText,
  ModalLoadingProcessSupprotText,
  ModalChainArrow,
  ModalCloseButton,
  ModalInfoApprove,
  ModalInfoApproveText,
  ModalApproveButton,
  ModalSuccessImg,
  ModalSuccessContainer,
  ModalCloseButtonItem,
  ModalOtherNetworks,
  ModalBridgeInfoChainText,
} from "./TokenInfoPopUp.module.scss";
import {
  NetworksMenuButton,
  NetworksMenuButtonContent,
} from "../Web3Status/Web3Status.module.scss";
import Spiner from "../Spiner/Spiner";
import Accordion from "../Accordion/Accordion";

const networksLogos = {
  42: "/img/networks-logos/mainnet.svg",
  97: "/img/networks-logos/BSC.svg",
  80001: "/img/networks-logos/polygon.svg",
};

function Modal({
  isShowing,
  hide,
  modalActive,
  currentItem,
  change,
  setChange,
}) {
  const [pending, setPending] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("Pending...");
  const [txLink, setTxLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [debridgeInfo, setDebridgeInfo] = useState({});
  const { chainId } = useWeb3React();

  const { allowedToTransferNetworks } = networks[currentItem.tokensChainId];
  const [bridgeCurrentItemId, setBridgeCurrentItemId] = useState(
    allowedToTransferNetworks[0]
  );

  useEffect(() => {
    setBridgeCurrentItemId(allowedToTransferNetworks[0]);
  }, [allowedToTransferNetworks]);

  const linkToTxDetails =
    Number(currentItem.tokensChainId) === 42
      ? "https://kovan.etherscan.io/tx/"
      : "https://testnet.bscscan.com/tx/";

  const [bridgeInfoChainText, setBridgeInfoChainText] = useState(
    networks[bridgeCurrentItemId].longName
  );

  useEffect(() => {
    setBridgeInfoChainText(networks[bridgeCurrentItemId].longName);
  }, [bridgeCurrentItemId]);

  const bridgeHandler = () => {
    setDisableButtons(true);
    setIsLoading(true);
    bridgeToken(
      chainId,
      currentItem.tokenId,
      currentItem.tokensChainId,
      change,
      setChange,
      setDisableButtons,
      setPending,
      setTransactionStatus,
      setTxLink,
      setIsLoading,
      setConfirmed,
      bridgeCurrentItemId,
      setDebridgeInfo
    );
  };

  const [showBridgeSwitcher, setShowBridgeSwitcher] = useState(false);
  const BridgeSwitcher = ({ items }) => {
    const listItems = items.map((item) => {
      return (
        <Button
          key={item}
          className={NetworksMenuButton}
          onClick={() => {
            setBridgeCurrentItemId(item);
          }}
        >
          <div className={NetworksMenuButtonContent}>
            <img
              src={networksLogos[item]}
              alt={networks[item].name}
              width={40}
              height={40}
            />
            <span>{networks[item].name}</span>
          </div>
        </Button>
      );
    });

    return <div className={ModalOtherNetworks}>{listItems}</div>;
  };

  const InfoTransfer = () => {
    return (
      <>
        {!isLoading && !confirmed ? (
          <>
            <p>The token will be transferred to another network</p>
            <div className={ModalChainTransferInfo}>
              <div className={ModalChainBlock}>
                <img
                  src={networksLogos[currentItem.tokensChainId]}
                  alt={bridgeInfoChainText[currentItem.tokensChainId]}
                />
                <p>{networks[currentItem.tokensChainId].longName}</p>
              </div>
              <div className={ModalChainArrow}>
                <img src="/img/arrow.svg" alt="transfer-arrow" />
              </div>
              <div
                className={ModalChainBlock}
                onClick={() => {
                  if (allowedToTransferNetworks.length > 1) {
                    setShowBridgeSwitcher(!showBridgeSwitcher);
                  }
                }}
              >
                <img
                  src={networksLogos[bridgeCurrentItemId]}
                  alt={bridgeInfoChainText}
                />
                <p className={ModalBridgeInfoChainText}>
                  <span>{bridgeInfoChainText}</span>
                  {allowedToTransferNetworks.length > 1 && (
                    <span>
                      <img
                        src="/img/chevron-down.svg"
                        width={17}
                        alt="Arrow down"
                      />
                    </span>
                  )}
                </p>
                {showBridgeSwitcher && (
                  <BridgeSwitcher items={allowedToTransferNetworks} />
                )}
              </div>
            </div>
            <div className={ModalInfoApprove}>
              <p className={ModalInfoApproveText}>
                Bridging between BSC and polygon typically takes no more than
                5-10 minutes and depends on network load conditions and gas
                price you set for outgoing tx
              </p>
              <Button
                disabled={disableButtons}
                onClick={bridgeHandler}
                className={ModalApproveButton}
              >
                Approve
              </Button>
            </div>
          </>
        ) : (
          <div className={ModalLoadingWrapper}>
            {isLoading && !confirmed ? (
              <div className={ModalLoadingBlock}>
                <Spiner />
                <div className={ModalLoadingStageBlock}>
                  <span className={ModalLoadingProcessText}>
                    {transactionStatus}{" "}
                    <a href={linkToTxDetails + txLink}>
                      {shortenAddress(txLink)}
                    </a>
                  </span>
                  <p className={ModalLoadingProcessSupprotText}>
                    The token is being transferred to another network.
                  </p>
                </div>
              </div>
            ) : (
              <div className={ModalSuccessContainer}>
                <img
                  className={ModalSuccessImg}
                  src="/img/success-transaction.svg"
                  alt="Success"
                />
                <span className={ModalLoadingProcessText}>Successfully!</span>
                <p className={ModalLoadingProcessSupprotText}>
                  The token is being transferred to another network.
                </p>
              </div>
            )}
            {transactionStatus === "Mined" && (
              <Accordion debridgeInfo={debridgeInfo} />
            )}
            {isLoading && !confirmed && (
              <p>Confirm this operation in your wallet.</p>
            )}
          </div>
        )}
      </>
    );
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className={ModalOverlay} />
          <div
            className={ModalWrapperStyled}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className={ModalBlock}>
              <div className={ModalCloseButton}>
                <button
                  className={ModalCloseButtonItem}
                  disabled={isLoading}
                  data-dismiss="modal"
                  onClick={hide}
                >
                  <img src="/img/close-modal.svg" alt="close" />
                </button>
              </div>
              <div className={ModalContent}>
                <GalleryItem
                  tokenId={currentItem.tokenId}
                  owner={currentItem.owner}
                  image={currentItem.image}
                  chainId={currentItem.tokensChainId}
                  skill={currentItem.skill}
                />
                <div className={ModalInfoTransfer}>
                  <InfoTransfer />
                </div>
                <GalleryItem
                  tokenId={currentItem.tokenId}
                  owner={currentItem.owner}
                  image={currentItem.image}
                  chainId={bridgeCurrentItemId}
                  skill={currentItem.skill}
                />
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
}

export default Modal;
