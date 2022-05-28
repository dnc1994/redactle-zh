import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { commonWords, isWord, isChineseWord, splitWords } from "../utils/caviarding";
import { GameContext } from "../utils/game";

const _WordContainer: React.FC<{ node: any }> = ({ node }) => {
  const word = node.children[0].value;
  const [caviardingStyle] = useState<number>(Math.floor(Math.random() * 5) + 1);
  return (
    <GameContext.Consumer>
      {({ words, selection }) => {
        // console.log("word = " + word);
        const lowercaseWord = word.toLocaleLowerCase();
        const revealed = words.has(lowercaseWord);
        const selected = selection && selection[0] === lowercaseWord;
        if (revealed) {
          return (
            <span className={`word` + (selected ? " selected" : "")}>
              {word}
            </span>
          );
        } else {
          return (
            <span className={`word caviarded v${caviardingStyle}`}>
              {"█".repeat(word.length)}
            </span>
          );
        }
      }}
    </GameContext.Consumer>
  );
};

const WordContainer = React.memo(_WordContainer);
const MarkdownContainer = React.memo(ReactMarkdown);

const ArticleContainer: React.FC<{
  article: string;
  reveal: boolean;
}> = ({ article, reveal }) => {
  return (
    <div className="article-container">
      <MarkdownContainer
        components={{
          strong: ({ node }) => {
            return <WordContainer node={node} />;
          },
        }}
      >
        {reveal
          ? article
          : splitWords(article).reduce((value, word) => {
              let currentValue;
              if (!commonWords.has(word.toLocaleLowerCase()) && isWord(word)) {
                currentValue = `**${word}**`;
              } else {
                currentValue = word;
              }
              // TODO: Better solutions than adding spaces? Might be the best compromise if using ReactMarkdown though
              if (isChineseWord(word)) {
                currentValue = ' ' + currentValue + ' ';
              }
              return value + currentValue;
            })}
      </MarkdownContainer>
    </div>
  );
};

export default React.memo(ArticleContainer);
