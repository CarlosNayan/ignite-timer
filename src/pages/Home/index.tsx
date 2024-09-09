import { zodResolver } from "@hookform/resolvers/zod";
import { Play, Stop } from "phosphor-react";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { CyclesContext } from "../../contexts/CyclesContext";
import {
  NewCycleFormData,
  newFormValidationSchema,
} from "../../schemas/z.newFormValidationSchema";
import { Cycle } from "../../types/cycles";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";

export function HomePage() {
  const { activeCycle, setCycles, setActiveCycleId, setAmountMinutesPassed } =
    useContext(CyclesContext);

  const methods = useForm<NewCycleFormData>({
    resolver: zodResolver(newFormValidationSchema),
    defaultValues: {
      task: undefined,
      minutesAmount: undefined,
    },
  });

  const { handleSubmit, watch, reset } = methods;

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    setCycles((prev) => [...prev, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountMinutesPassed(0);
    reset();
  }

  function handleInterruptCycle() {
    setCycles((prev) =>
      prev.map((cycle) => {
        if (cycle.id === activeCycle?.id) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
    setAmountMinutesPassed(0);
    document.title = "Ignite Timer";
  }

  const isValid = watch("task");

  return (
    <HomeContainer>
      <FormProvider {...methods}>
        <NewCycleForm />
      </FormProvider>
      <Countdown />
      {activeCycle ? (
        <Button
          disabled={!activeCycle}
          type="button"
          onClick={handleInterruptCycle}
        >
          <Stop size={24} />
          Interromper
        </Button>
      ) : (
        <Button
          disabled={!isValid}
          type="submit"
          onClick={handleSubmit(handleCreateNewCycle)}
        >
          <Play size={24} />
          Começar
        </Button>
      )}
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
`;

const Button = styled.button<{ type: "submit" | "button" }>`
  width: 100%;
  border: 0;
  cursor: pointer;
  color: ${(props) => props.theme["gray-100"]};
  background: ${(props) =>
    props.type === "submit"
      ? props.theme["green-500"]
      : props.theme["red-500"]};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 1.125rem;
  max-width: 40rem;

  &:not(:disabled):hover {
    background: ${(props) =>
      props.type === "submit"
        ? props.theme["green-700"]
        : props.theme["red-700"]};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
