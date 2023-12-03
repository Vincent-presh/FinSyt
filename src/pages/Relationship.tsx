import {Background} from "../components/ui/Background";
import {BtnUI} from "../components/ui/Btn";
import {Logo} from "../components/ui/Logo";
import {Title} from "../components/ui/Title";

export const Relationship = () => {
  return (
    <Background>
      <header>
        <Logo />
      </header>
      <main className="w-full">
        <section className="w-full">
          <Title
            title={"Relationship Status"}
            question={"Are you married, single, or divorced?"}
          />
        </section>

        <section className="mt-5">
          <BtnUI type={"primary"} title={"Continue"} />
        </section>
      </main>
    </Background>
  );
};
