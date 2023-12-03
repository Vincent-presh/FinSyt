import {Background} from "../components/ui/Background";
import {Logo} from "../components/ui/Logo";
import {BtnUI} from "../components/ui/Btn";
import {Title} from "../components/ui/Title";
import {useState} from "react";

export const Debt = () => {
  const [debt, setDebt] = useState("");

  return (
    <Background>
      <header>
        <Logo />
      </header>
      <main className="w-full">
        <section className="w-full">
          <Title title={"Debt Status"} question={"Do you have any debts?"} />
        </section>

        <section>
          <BtnUI
            type={"primary"}
            title={"Continue"}
            value={debt}
            onClick={() => {}}
          />
        </section>
      </main>
    </Background>
  );
};
