import { createContext, useState } from "react";
import { Cycle, CyclesContextData } from "../types/cycles";

export const CyclesContext = createContext({} as CyclesContextData);

export function CyclesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cycles, setCycles] = useState<Cycle[] | []>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountMinutesPassed, setAmountMinutesPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        amountMinutesPassed,
        setCycles,
        setActiveCycleId,
        setAmountMinutesPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
