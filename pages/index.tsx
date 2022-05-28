import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Game from "../components/game";
import Navbar from "../components/navbar";
import InfoModal from "../components/infoModal";
import ScoreModal from "../components/scoreModal";
import IntroductionModal from "../components/introductionModal";

const Home: NextPage = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };

  const handleShowScoreModal = () => {
    setShowScoreModal(true);
  };

  const handleCloseScoreModal = () => {
    setShowScoreModal(false);
  };

  return (
    <>
      <Head>
        <title>Redactle 中文版</title>
        <meta name="description" content="基于维基百科的解谜游戏" />
        <meta name="author" content="Linghao Zhang" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        onShowInfoModal={handleShowInfoModal}
        onShowScoreModal={handleShowScoreModal}
      />
      <Game />

      <InfoModal open={showInfoModal} onClose={handleCloseInfoModal} />
      <ScoreModal open={showScoreModal} onClose={handleCloseScoreModal} />
      <IntroductionModal />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
