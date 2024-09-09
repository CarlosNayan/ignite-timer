export type CyclesContextData = {
  cycles: Cycle[] | [];
  activeCycle: Cycle | undefined;
  amountMinutesPassed: number;
  setAmountMinutesPassed: React.Dispatch<React.SetStateAction<number>>;
  setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
  setActiveCycleId: React.Dispatch<React.SetStateAction<string | null>>;
};

export type Cycle = {
  id: string;
  task: string;
  minutesAmount: number;
  interruptedDate?: Date | null;
  finishedDate?: Date | null;
};
