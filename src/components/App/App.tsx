import CafeInfo from "../CafeInfo/CafeInfo";
import css from "./App.module.css";
import { useState } from "react";
import type { Votes, VoteType } from "../../types/votes";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const handleVote = (voteName: VoteType) => {
    setVotes({
      ...votes,
      [voteName]: votes[voteName] + 1,
    });
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const canReset = votes.good > 0 || votes.neutral > 0 || votes.bad > 0;

  const totalVotes = (votes: Votes): number => {
    return votes.good + votes.neutral + votes.bad;
  };
  const total = totalVotes(votes);

  const positiveRate = (votes: Votes): number => {
    return total ? Math.round((votes.good / total) * 100) : 0;
  };

  const positive = positiveRate(votes);
  return (
    <div className={css.app}>
      <CafeInfo />
      {total > 0 ? (
        <VoteStats votes={votes} totalVotes={total} positiveRate={positive} />
      ) : (
        <div>
          <Notification />
        </div>
      )}
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={canReset}
      />
    </div>
  );
}
