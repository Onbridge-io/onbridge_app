import React, { useEffect, useState } from "react";

import {
  Accordion as AccordionStyled,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemContent,
  AccordionItemContentListItem,
} from "./Accordion.module.scss";
import networks from "../../networks.json";

const Accordion = ({ debridgeInfo, ...props }) => {
  const [isActive, setIsActive] = useState(false);

  const [status, setStatus] = useState("Processing");
  const [chainFrom, setChainFrom] = useState("...");
  const [confirmations, setConfirmations] = useState(0);
  const [receiver, setReceiver] = useState(0);
  const [timestamp, setTimestamp] = useState(0);

  const { send, claim } = debridgeInfo;

  useEffect(() => {
    if (Object.keys(debridgeInfo).length !== 0) {
      if (send !== null) {
        setStatus(send.isExecuted == null ? "Done" : "Processing");
        setChainFrom(networks[send.eventOriginChainId].longName);
        setConfirmations(send.confirmationsCount);
      }

      if (Object.keys(claim !== null).length !== 0) {
        setReceiver(networks[claim.eventOriginChainId].longName);
        setTimestamp(claim.trackedTimeStamp);
      }
    }
  }, [debridgeInfo, claim, send]);

  const accordionData = {
    title: "More Information",
    content: {
      Status: status,
      "Chain from": chainFrom,
      "Number of confirmations": confirmations,
      Receiver: receiver,
      Timestamp: timestamp,
    },
  };

  const { title, content } = accordionData;

  const contentItems = Object.entries(content);

  return (
    <React.Fragment>
      <div className={AccordionStyled} {...props}>
        <div className={AccordionItem}>
          <div
            className={AccordionItemTitle}
            onClick={() => setIsActive(!isActive)}
          >
            <div>{title}</div>
            <div>{isActive ? "-" : "+"}</div>
          </div>
          {isActive && (
            <ul className={AccordionItemContent}>
              {contentItems.map((el, idx) => {
                return (
                  <li className={AccordionItemContentListItem} key={idx}>
                    {el[0]}: {el[1]}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Accordion;
