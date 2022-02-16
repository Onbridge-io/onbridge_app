import { Link } from "../../";
import {
  GalleryItem as GalleryItemStyled,
  GalleryItemText,
  GalleryItemPicture,
  GalleryItemInfo,
  GalleryItemInfoHead,
  GalleryItemInfoFoot,
  GalleryItemNetworkLogo,
  GalleryItemSpecsWrapper,
  GalleryItemSpec,
  GalleryItemSpecLabel,
  GalleryItemSpecValue,
  GalleryItemSpecValueLink,
  GalleryItemBridgeInfo,
} from "./GalleryItem.module.scss";

import { shortenAddress } from "../../../utils/web3";
import Networks from "../../../networks.json";

const networksLogos = {
  42: "/img/networks-logos/mainnet.svg",
  97: "/img/networks-logos/BSC.svg",
  80001: "/img/networks-logos/polygon.svg",
};

export function GalleryItem({
  tokenId,
  owner,
  image,
  chainId: tokensChainId,
  skill,
  change,
  setChange,
  setCurrentItem,
  toggleModal,
}) {
  const blockExplorer = Networks[tokensChainId].blockExplorer;

  return (
    <div
      className={GalleryItemStyled}
      onClick={() => {
        setCurrentItem({ tokenId, owner, skill, change, tokensChainId, image });
        toggleModal();
      }}
    >
      <img src={image} alt="Token" className={GalleryItemPicture} />
      <div className={GalleryItemInfo}>
        <div className={GalleryItemInfoHead}>OnBridge Pirate #{tokenId}</div>

        <div className={GalleryItemInfoFoot}>
          <div className={GalleryItemSpecsWrapper}>
            <div className={GalleryItemSpec}>
              <div className={GalleryItemSpecLabel}>Owner</div>
              <div className={GalleryItemSpecValue}>
                <Link
                  className={GalleryItemSpecValueLink}
                  target="_blank"
                  href={`${blockExplorer}/address/${owner}`}
                >
                  {shortenAddress(owner)}
                </Link>
              </div>
            </div>
            <div className={GalleryItemSpec}>
              <div className={GalleryItemSpecLabel}>Skill</div>
              <div className={GalleryItemSpecValue}>{skill}</div>
            </div>
          </div>
          <div className={GalleryItemBridgeInfo}>
            <div className={GalleryItemText}>
              <p>{tokenId}</p>
            </div>
            <div className={GalleryItemNetworkLogo}>
              <img src={networksLogos[tokensChainId]} alt="Network" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
