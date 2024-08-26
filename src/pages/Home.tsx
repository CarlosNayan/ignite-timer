import { Play } from "phosphor-react";
import styled from "styled-components";

export function HomePage() {
  return (
    <HomeContainer>
      <Form action="">
        <label>Vou trabalhar em</label>
        <TaskInput
          type="text"
          id="task"
          list="task-suggestions"
          placeholder="Dê um nome para o seu projeto"
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
          min={5}
          max={60}
        />
        <span>minutos.</span>
      </Form>
      <CountDownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountDownContainer>
      <Button type="submit">
        <Play size={24} />
        Começar
      </Button>
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

const Button = styled.button`
  width: 100%;
  border: 0;
  cursor: pointer;
  color: ${(props) => props.theme["gray-100"]};
  background: ${(props) => props.theme["green-500"]};
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
    background: ${(props) => props.theme["green-700"]};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
