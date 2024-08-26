import styled from "styled-components";

export function ButtonVariant(props: any) {
  return <Button {...props} />;
}

const Button = styled.button`
  background-color: #0070f3;
  border: 1px solid #0070f3;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;
