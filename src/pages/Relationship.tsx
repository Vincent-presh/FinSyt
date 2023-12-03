import { useContext, useState } from "react";
import {Background} from "../components/ui/Background";
import {BtnUI} from "../components/ui/Btn";
import { InputBtn } from "../components/ui/InputBtn";
import {Logo} from "../components/ui/Logo";
import { Main } from "../components/ui/Main";
import {Title} from "../components/ui/Title";
import { PagesContext } from "../contexts/PagesProvider";
import { UserContext } from "../contexts/userProvider";
export const Relationship = () => {
  const {nextPage}: any = useContext(PagesContext);
  const {user, setUser, signIn, isLoading}: any = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState("");

  const relatioshipstats = [
    {title: "married", name: "married"},
    {title: "divorced", name: "divorced"},
    {title: "single", name: "single"}
  ];

  return (
    <Background>
      <header>
        <Logo />
      </header>
     
      <section className="w-full">
        <Title
          title={"Relationship Status"}
          question={"Are you married, single, or divorced?"}
        />
      </section>

      <Main>
        <section>
          <div className="flex w-full flex-col space-y-5">
            {relatioshipstats.map((stat) => (
                <InputBtn
                  title={stat.title}
                  name={stat.name}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              ))}
          </div>
        </section>

        <section className="mt-5">
          <BtnUI 
            type={"primary"} 
            title={"Continue"}
            onClick={() => {
              nextPage();
            }} 
          />
        </section>
      </Main>
    </Background>
  );
};
