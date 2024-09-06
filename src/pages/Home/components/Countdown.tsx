import { useContext, useEffect } from "react";
import styled from "styled-components";
import { CyclesContext } from "../../../contexts/CyclesContext";

export function Countdown() {
  const {
    activeCycle,
    amountMinutesPassed,
    setAmountMinutesPassed,
    setCycles,
    setActiveCycleId,
  } = useContext(CyclesContext);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountMinutesPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount.toFixed(0)).padStart(2, "0");
  const seconds = String(secondsAmount.toFixed(0)).padStart(2, "0");

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const timeDiff = (
          (new Date().getTime() - Number(activeCycle.id)) /
          1000
        ).toFixed(0);

        if (Number(timeDiff) >= totalSeconds) {
          setCycles((prev) =>
            prev.map((cycle) => {
              if (cycle.id === activeCycle.id) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                };
              } else {
                return cycle;
              }
            })
          );
          setActiveCycleId(null);
          setAmountMinutesPassed(totalSeconds);
          document.title = "Ignite Timer";
          clearInterval(interval);
        } else {
          setAmountMinutesPassed(Number(timeDiff));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCycle, totalSeconds]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}

const CountDownContainer = styled.div`
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme["gray-100"]};
  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme["gray-700"]};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme["green-500"]};
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;
