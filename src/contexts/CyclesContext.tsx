import { createContext, useReducer, useState } from "react";
import { Cycle, CyclesContextData } from "../types/cycles";
import { NewCycleFormData } from "../schemas/z.newFormValidationSchema";

export const CyclesContext = createContext({} as CyclesContextData);

type CyclesContextProviderProps = {
  cycles: Cycle[] | [];
  activeCycle: Cycle | undefined;
};

export function CyclesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cyclesContextData, dispatch] = useReducer(
    (
      state: CyclesContextProviderProps,
      action: {
        type: "ADD_NEW_CYCLE" | "INTERRUPT_CURRENT_CYCLE" | "FINISH_CURRENT_CYCLE";
        payload: Cycle | string;
      }
    ) => {
      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            cycles: [...state.cycles, action.payload as Cycle],
            activeCycle: action.payload as Cycle,
          };

        case "INTERRUPT_CURRENT_CYCLE": {
          const updatedCyclesInterrupt = state.cycles.map((cycle) => {
            if (cycle.id === action.payload) {
              return {
                ...cycle,
                interruptedDate: new Date(),
              };
            }
            return cycle;
          });
          return {
            ...state,
            cycles: updatedCyclesInterrupt,
            activeCycle: undefined,
          };
        }

        case "FINISH_CURRENT_CYCLE": {
          const updatedCyclesFinish = state.cycles.map((cycle) => {
            if (cycle.id === action.payload) {
              return {
                ...cycle,
                finishedDate: new Date(),
              };
            }
            return cycle;
          });
          return {
            ...state,
            cycles: updatedCyclesFinish,
            activeCycle: undefined,
          };
        }

        default:
          return state; // Retorna o estado anterior se o tipo da ação não for reconhecido
      }
    },
    {
      cycles: [], // Estado inicial para ciclos
      activeCycle: undefined, // Estado inicial para ciclo ativo
    }
  );

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountMinutesPassed, setAmountMinutesPassed] = useState(0);

  function createNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: newCycle,
    });

    setActiveCycleId(newCycle.id);
    setAmountMinutesPassed(0);
  }

  function interruptCycle() {
    if (!activeCycleId) return;
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: activeCycleId,
    });
    setActiveCycleId(null);
    setAmountMinutesPassed(0);
    document.title = "Ignite Timer";
  }

  function finishCycle() {
    if (!activeCycleId) return;
    dispatch({
      type: "FINISH_CURRENT_CYCLE",
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
