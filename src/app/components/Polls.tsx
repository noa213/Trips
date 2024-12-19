"use client";
import React, { useEffect, useState } from "react";
import { IOption, IPoll } from "../types/poll";
import { updatePoll } from "../services/polls";
import { Survey } from "survey-react-ui";
import * as SurveyCore from "survey-core";
import "survey-core/defaultV2.css";
import PieChart from "./PieChart";
import { IPollsProps } from "../types/PollsProps";

const Polls: React.FC<IPollsProps> = ({ pollsList }) => {
  const [polls, setPolls] = useState<IPoll[]>([]);
  // const [polls, setPolls] = useState<IPoll[]>([
  // {
  //   pollId: "poll-1734335285696",
  //   question: "new",
  //   options: [
  //     { value: "פיצה", votes: 3},
  //     { value: "פלאפל", votes: 2 },
  //     { value: "פסטה", votes: 1 },
  //     { value: "טוסטים", votes: 0 },
  //   ],
  //   status: "open",
  //   // _id: "675fdb35099d5d090fc55e91",
  // },
  // {
  //   pollId: "poll-1734263250738",
  //   question: "cccccccccc",
  //   options: [
  //     { value: "123", votes: 0 },
  //     { value: "456", votes: 0 },
  //   ],
  //   status: "open",
  //   // _id: "675ec1d4848a99be2b3cbbd8",
  // },
  // {
  //   pollId: "poll-1734275670833",
  //   question: "my first poll",
  //   options: [
  //     { value: "123", votes: 0 },
  //     { value: "456", votes: 0 },
  //   ],
  //   status: "open",
  //   // _id: "675ef256848a99be2b3cbd33",
  // },
  // {
  //   pollId: "poll-1734275768460",
  //   question: "my second poll",
  //   options: [
  //     { value: "123", votes: 0 },
  //     { value: "456", votes: 0 },
  //   ],
  //   status: "open",
  //   // _id: "675ef2b8848a99be2b3cbd57",
  // },
  // ]);
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (pollsList.length > 0) {
      setPolls(pollsList);
    }
  }, [pollsList]);

  const handleVote = (pollId: string, selectedValue: string) => {
    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.pollId === pollId) {
          return {
            ...poll,
            options: poll.options.map((option: IOption) => {
              if (option.value === selectedValue) {
                return { ...option, votes: option.votes + 1 };
              }
              if (userVotes[pollId] && option.value === userVotes[pollId]) {
                return { ...option, votes: option.votes - 1 };
              }
              return option;
            }),
          };
        }
        return poll;
      })
    );
    setUserVotes((prevVotes) => ({ ...prevVotes, [pollId]: selectedValue }));
  };

  const saveVotes = async (poll: IPoll) => {
    console.log("on save votes", poll);

    try {
      await updatePoll(poll);
      console.log("Batch updates sent to server");
    } catch (error) {
      console.error("Failed to send batch updates:", error);
    }
  };

  return (
    <>
      {polls.map((poll) => {
        const surveyModel = new SurveyCore.Model({
          // showNavigationButtons: false,
          questions: [
            {
              type: "radiogroup",
              name: poll.pollId,
              title: poll.question,
              choices: poll.options.map((option) => option.value),
              defaultValue: userVotes[poll.pollId],
            },
          ],
        });

        surveyModel.onValueChanged.add((options) => {
          const selectedValue = options.value;

          handleVote(poll.pollId, selectedValue);
          // saveVotes()
        });
        surveyModel.onComplete.add(() => {
          saveVotes(poll);
          console.log(poll);
          // console.log("User votes:", userVotes); // מדפיס את ההצבעות
          // console.log("Survey data:", sender.data); // מדפיס את כל נתוני הסקר
          // console.log("Survey details:", sender.getPlainData()); // הדפסת נתונים בפורמט ברור
        });
        return (
          <div
            key={poll.pollId}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: 1, marginRight: "20px" }}>
              <Survey model={surveyModel} />
            </div>

            <div style={{ flex: 1 }}>
              <PieChart options={poll.options} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Polls;
