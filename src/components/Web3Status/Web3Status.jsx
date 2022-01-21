import { useState, useEffect } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import classnames from "classnames";

import Networks from "../../networks.json";
import { supportedChainIds } from "../../constants";
import {
  Web3Status as Web3StatusStyled,
  Web3StatusAddressWrapper,
  Web3StatusAddress,
  Web3StatusCircle,
  NetworksMenu,
  NetworksMenuTitle,
  NetworksMenuHidden,
  NetworksMenuWrapper,
  NetworksMenuList,
  NetworksMenuButton,
  NetworksMenuMainButton,
  NetworksMenuArrow,
} from "./Web3Status.module.scss";
import { injected } from "../../utils/web3/connectors";
import { useEagerConnect, useInactiveListener } from "../../utils/web3/hooks";
import { shortenAddress, switchNetwork } from "../../utils/web3";
import { Button } from "../";

const connectorsByName = {
  Injected: {
    text: "Connect",
    connector: injected,
  },
};

function NetworkSwitcher() {
  const { error, chainId } = useWeb3React();
  const [menuIsVisible, setMenuIsVidible] = useState(false);
  const wrongNetwork = error instanceof UnsupportedChainIdError;

  const menuClassNames = classnames(NetworksMenu, {
    [NetworksMenuHidden]: !menuIsVisible,
  });

  const selectButtonText = wrongNetwork
    ? "Wrong Network"
    : Networks[chainId].name;

  return (
    <div className={NetworksMenuWrapper}>
      <Button
        className={NetworksMenuMainButton}
        onClick={() => {
          setMenuIsVidible(!menuIsVisible);
        }}>
        {selectButtonText}
        <img
          className={NetworksMenuArrow}
          src="/img/chevron-down.svg"
          alt="Down"
        />
      </Button>
      <div className={menuClassNames}>
        <div className={NetworksMenuTitle}>Select network</div>

        <div className={NetworksMenuList}>
          {supportedChainIds.map((id) => {
            if (chainId === id) {
              return null;
            }

            return (
              <Button
                key={id}
                onClick={() => {
                  switchNetwork(id);
                }}
                className={NetworksMenuButton}>
                {Networks[id].name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Web3Status({ ...props }) {
  const { connector, account, activate, deactivate, error } = useWeb3React();
  const wrongNetwork = error instanceof UnsupportedChainIdError;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const address = account && (
    <>
      <div className={Web3StatusCircle} />
      <span className={Web3StatusAddress}>{shortenAddress(account)}</span>
    </>
  );

  const StatusContent = () => {
    const TryAgain = () => (
      <Button
        onClick={() => {
          if (connector === injected) {
            deactivate();
          }
        }}>
        Try again
      </Button>
    );

    if (connector === injected) {
      if (error && !wrongNetwork) {
        return <TryAgain />;
      }

      return <NetworkSwitcher />;
    }

    return Object.keys(connectorsByName).map((name) => {
      const currentConnector = connectorsByName[name].connector;
      const connected = currentConnector === connector;
      const disabled =
        !triedEager || !!activatingConnector || connected || !!error;

      const connectFunction = () => {
        setActivatingConnector.call(this, currentConnector);
        activate.call(this, connectorsByName[name].connector);
      };

      return (
        <Button disabled={disabled} key={name} onClick={connectFunction}>
          {connectorsByName[name].text}
        </Button>
      );
    });
  };

  return (
    <div className={Web3StatusStyled} {...props}>
      <div className={Web3StatusAddressWrapper}>{address}</div>
      <StatusContent />
    </div>
  );
}
