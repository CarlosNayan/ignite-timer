import { useContext } from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../contexts/CyclesContext";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
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
  );
}

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
