import {useContext, useEffect, useState} from "react";
import {Background} from "../components/ui/Background";
import {BtnUI} from "../components/ui/Btn";
import {Logo} from "../components/ui/Logo";
import {Title} from "../components/ui/Title";
import {PagesContext} from "../contexts/PagesProvider";
import {InputBtn} from "../components/ui/InputBtn";
import {UserContext} from "../contexts/userProvider";
import { Main } from "../components/ui/Main";
export const Gender = () => {
  const {nextPage}: any = useContext(PagesContext);
  const {user, setUser, signIn, isLoading}: any = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState("");

  const genders = [
    {title: "male", name: "male"},
    {title: "female", name: "female"},
  ];

  return (
    <Background>
      <header>
        <Logo />
      </header>
      
        <section className="w-full">
          <Title
            title={"Hello, " + user?.name}
            question={"Whats your gender?"}
          />
        </section>

        <Main>
          <section>
            <div className="flex w-full flex-col space-y-5">
              {genders.map((gender) => (
                <InputBtn
                  title={gender.title}
                  name={gender.name}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              ))}
            </div>
          </section>

          <section>
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
