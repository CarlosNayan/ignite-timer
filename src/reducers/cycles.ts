import { Cycle } from "../types/cycles";

export type CyclesReducerProps = {
  cycles: Cycle[] | [];
  activeCycle: Cycle | undefined;
};

export type CyclesContextAction = {
  type: CyclesActionTypes;
  payload: Cycle | string;
};

export enum CyclesActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  FINISH_CURRENT_CYCLE = "FINISH_CURRENT_CYCLE",
}

export function CyclesReducer(
  state: CyclesReducerProps,
  action: CyclesContextAction
) {
  switch (action.type) {
    case CyclesActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload as Cycle],
        activeCycle: action.payload as Cycle,
      };

    case CyclesActionTypes.INTERRUPT_CURRENT_CYCLE: {
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

    case CyclesActionTypes.FINISH_CURRENT_CYCLE: {
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
}
