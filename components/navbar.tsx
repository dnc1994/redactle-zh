import React from "react";
import Image from "next/image";
import ExternalLink from "./externalLink";

const Navbar: React.FC<{
  onShowInfoModal: () => void;
  onShowScoreModal: () => void;
}> = ({ onShowInfoModal, onShowScoreModal }) => {
  return (
    <nav>
      <h1>Redactle 中文版</h1>
      <ul>
        <li className="left" onClick={onShowInfoModal}>
          简介
        </li>
        <li className="left" onClick={onShowScoreModal}>
          得分
        </li>
        <li className="divider" />
        <li>
          <ExternalLink href="https://github.com/dnc1994/redactle-zh">
            <Image height={30} width={30} src="/github.png" alt="GitHub" />
          </ExternalLink>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Navbar);
