import {
  Questionnaire,
} from "./Questionnaire";

export function App() {
  return (
    <main>
      <header>
        <h1>Minha Cabeleira</h1>

        <p>
          Vamos entender melhor as
          necessidades do seu cabelo.
        </p>
      </header>

      <Questionnaire />
    </main>
  );
}