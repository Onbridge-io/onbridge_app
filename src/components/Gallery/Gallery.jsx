import { useEffect, useState } from "react";

import Modal from "../TokenInfoPopUp/TokenInfoPopUp";

import { getTokensInfo } from "../../api/fetchTokens";
import {
  Gallery as GalleryStyled,
  GalleryHead,
  GalleryHeadTitle,
  GalleryHeadLogo,
  GalleryHeadCounter,
  GalleryGrid,
  GalleryChainStatus,
} from "./Gallery.module.scss";
import { GalleryItem } from "./GalleryItem/GalleryItem";

import useModal from "../../utils/hooks/useModal";
import { Web3Status } from "..";

const contract = {
  logo: "/img/gallery-logo.svg",
  name: "OnBridge Pirates",
};

function TokensList({ tokens, change, setChange }) {
  const [currentItem, setCurrentItem] = useState({
    change: true,
    owner: "0x5fCb8f7149E8aD03544157C90E6f81b26933d3a2",
    skill: 0,
    tokenId: 0,
    tokensChainId: 97,
    image: "",
  });
  const { isShowing, toggle } = useModal();

  return (
    <>
      {tokens &&
        tokens.map(({ token_id, owner, image, chain_id, skill }) => {
          return (
            <GalleryItem
              key={token_id}
              tokenId={token_id}
              owner={owner}
              image={image}
              chainId={chain_id}
              skill={skill}
              change={change}
              setChange={setChange}
              setCurrentItem={setCurrentItem}
              toggleModal={toggle}
            />
          );
        })}
      <Modal
        isShowing={isShowing}
        hide={toggle}
        modalActive={isShowing}
        currentItem={currentItem}
        change={change}
        setChange={setChange}
      />
    </>
  );
}

export function Gallery() {
  const [tokensList, setTokensList] = useState([]);
  const [change, setChange] = useState(true);

  useEffect(() => {
    getTokensInfo().then((res) => {
      setTokensList(res);
    });
  }, [change]);

  return (
    <div className={GalleryStyled}>
      <Web3Status className={GalleryChainStatus} />
      <div className={GalleryHead}>
        <div className={GalleryHeadTitle}>
          <img className={GalleryHeadLogo} src={contract.logo} alt="Logo" />
          {contract.name}
        </div>
        <div className={GalleryHeadCounter}>
          {tokensList && tokensList.length} items
        </div>
      </div>

      <div className={GalleryGrid}>
        <TokensList tokens={tokensList} setChange={setChange} change={change} />
      </div>
    </div>
  );
}
