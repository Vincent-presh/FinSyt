import {useState} from "react";
import {Background} from "../components/ui/Background";
import {BtnUI} from "../components/ui/Btn";
import {Logo} from "../components/ui/Logo";
import {Title} from "../components/ui/Title";
import {InputBtn} from "../components/ui/InputBtn";

export const Dependants = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    {title: "Yess", name: "I have dependants"},
    {title: "No", name: "I dont have dependants"},
  ];
  return (
    <Background>
      <header>
        <Logo />
      </header>
      <main className="w-full">
        <section className="w-full">
          <Title title={"Do you have children or dependants"} />
        </section>
        <section>
          <div className="flex w-full flex-col space-y-5">
            {options.map((gender) => (
              <InputBtn
                title={gender.title}
                name={gender.name}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            ))}
          </div>
        </section>
        <section className="mt-5">
          <BtnUI type={"primary"} title={"Continue"} onClick={() => {}} />
        </section>
      </main>
    </Background>
  );
};
