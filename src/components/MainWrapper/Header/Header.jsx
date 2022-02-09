import {
  Header as HeaderStyled,
  HeaderLogo,
  HeaderChainStatus,
} from "./Header.module.scss";
import { Web3Status } from "../../";

export function Header() {
  return (
    <div className={HeaderStyled}>
      <img className={HeaderLogo} src="/img/logo.svg" alt="OnBridge" />
      <Web3Status className={HeaderChainStatus} />
    </div>
  );
}
