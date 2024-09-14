import { createContext, useReducer, useState } from "react";
import { CyclesActionTypes, CyclesReducer } from "../reducers/cycles";
import { NewCycleFormData } from "../schemas/z.newFormValidationSchema";
import { Cycle, CyclesContextData } from "../types/cycles";

export const CyclesContext = createContext({} as CyclesContextData);

export function CyclesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cyclesContextData, dispatch] = useReducer(CyclesReducer, {
    cycles: [],
    activeCycle: undefined,
  });

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountMinutesPassed, setAmountMinutesPassed] = useState(0);

  function createNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    dispatch({
      type: CyclesActionTypes.ADD_NEW_CYCLE,
      payload: newCycle,
    });

    setActiveCycleId(newCycle.id);
    setAmountMinutesPassed(0);
  }

  function interruptCycle() {
    if (!activeCycleId) return;
    dispatch({
      type: CyclesActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: activeCycleId,
    });
    setActiveCycleId(null);
    setAmountMinutesPassed(0);
    document.title = "Ignite Timer";
  }

  function finishCycle() {
    if (!activeCycleId) return;
    dispatch({
      type: CyclesActionTypes.FINISH_CURRENT_CYCLE,
      payload: activeCycleId,
    });
    setActiveCycleId(null);
    setAmountMinutesPassed(0);
    document.title = "Ignite Timer";
  }

  const { cycles, activeCycle } = cyclesContextData;

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        amountMinutesPassed,
        setActiveCycleId,
        setAmountMinutesPassed,
        createNewCycle,
        interruptCycle,
        finishCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
