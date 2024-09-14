import { createContext, useEffect, useReducer, useState } from "react";
import { CyclesActionTypes, CyclesReducer } from "../reducers/cycles";
import { NewCycleFormData } from "../schemas/z.newFormValidationSchema";
import { Cycle, CyclesContextData } from "../types/cycles";

export const CyclesContext = createContext({} as CyclesContextData);

export function CyclesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cyclesContextData, dispatch] = useReducer(
    CyclesReducer,
    {
      cycles: [],
      activeCycle: undefined,
    },
    (initialState) => {
      const storedCycles = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );

      if (storedCycles) {
        return JSON.parse(storedCycles);
      } else {
        return initialState;
      }
    }
  );
  const { cycles, activeCycle } = cyclesContextData;

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

    setAmountMinutesPassed(0);
  }

  function interruptCycle() {
    if (!activeCycle?.id) return;
    dispatch({
      type: CyclesActionTypes.INTERRUPT_CURRENT_CYCLE,
    });
    setAmountMinutesPassed(0);
    document.title = "Ignite Timer";
  }

  function finishCycle() {
    if (!activeCycle?.id) return;
    dispatch({
      type: CyclesActionTypes.FINISH_CURRENT_CYCLE,
    });
    setAmountMinutesPassed(0);
    document.title = "Ignite Timer";
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesContextData);
    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesContextData]);
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        amountMinutesPassed,
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
