export type CyclesContextData = {
  cycles: Cycle[] | [];
  activeCycle: Cycle | undefined;
  amountMinutesPassed: number;
  setAmountMinutesPassed: React.Dispatch<React.SetStateAction<number>>;
  setActiveCycleId: React.Dispatch<React.SetStateAction<string | null>>;
  createNewCycle: (data: NewCycleFormData) => void;
  interruptCycle: () => void;
  finishCycle: () => void;
};

export type Cycle = {
  id: string;
  task: string;
  minutesAmount: number;
  interruptedDate?: Date | null;
  finishedDate?: Date | null;
};
