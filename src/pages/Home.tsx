import { zodResolver } from "@hookform/resolvers/zod";
import { Play, Stop } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import z from "zod";

const newFormValidationSchema = z.object({
  task: z.string().min(1, { message: "O valor deve ser maior que 0" }),
  minutesAmount: z
    .number()
    .min(1, { message: "O valor deve ser maior que 5" })
    .max(60, { message: "O valor deve ser menor que 60" }),
});

type NewCycleFormData = z.infer<typeof newFormValidationSchema>;

type Cycle = {
  id: string;
  task: string;
  minutesAmount: number;
  interruptedDate?: Date | null;
  finishedDate?: Date | null;
};

export function HomePage() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountMinutesPassed, setamountMinutesPassed] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    // formState: { errors },
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(newFormValidationSchema),
    defaultValues: {
      task: undefined,
      minutesAmount: undefined,
    },
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    setCycles((prev) => [...prev, newCycle]);
    setActiveCycleId(newCycle.id);
    setamountMinutesPassed(0);
    reset();
  }

  function handleInterruptCycle() {
    setCycles((prev) =>
      prev.map((cycle) => {
        if (cycle.id === activeCycleId) {
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
    setamountMinutesPassed(0);
    document.title = "Ignite Timer";
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountMinutesPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount.toFixed(0)).padStart(2, "0");
  const seconds = String(secondsAmount.toFixed(0)).padStart(2, "0");

  const isValid = watch("task");

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
              if (cycle.id === activeCycleId) {
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
          setamountMinutesPassed(totalSeconds);
          document.title = "Ignite Timer";
          clearInterval(interval);
        } else {
          setamountMinutesPassed(Number(timeDiff));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCycle, activeCycleId, totalSeconds]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <HomeContainer>
      <Form action="">
        <label>Vou trabalhar em</label>
        <TaskInput
          type="text"
          id="task"
          list="task-suggestions"
          placeholder="Dê um nome para o seu projeto"
          disabled={!!activeCycle}
          {...register("task")}
        />

        <datalist id="task-suggestions">
          <option value="Estudar" />
          <option value="Revisão" />
          <option value="Ler" />
          <option value="Jogar" />
        </datalist>

        <label>durante</label>
        <MinutesAmountInput
          type="number"
          id="minutesAmount"
          placeholder="00"
          disabled={!!activeCycle}
          {...register("minutesAmount", {
            valueAsNumber: true,
            min: 1,
            max: 60,
          })}
        />
        <span>minutos.</span>
      </Form>
      <CountDownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountDownContainer>
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

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme["gray-100"]};

  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`;

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme["gray-100"]};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme["green-500"]};
    outline: none;
  }
`;

const TaskInput = styled(BaseInput)`
  flex: 1;
  max-width: 17rem;

  /* Remove o seletor de data em navegadores baseados em WebKit (Chrome, Safari, etc.) */
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }

  /* Para Firefox */
  &[type="date"] {
    -moz-appearance: textfield; /* Remove o botão de calendário */
  }

  /* Escondendo a seta no Edge */
  &::-ms-clear {
    display: none;
  }

  /* Também pode esconder completamente o input de data em navegadores que suportam */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Se precisar esconder o input de data em qualquer browser */
  &[type="date"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
`;

const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;

  /* Remove as setas de incremento/decremento */
  -moz-appearance: textfield; /* Firefox */
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none; /* Chrome, Safari, Edge */
    margin


`;

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
