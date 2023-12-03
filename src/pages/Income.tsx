import {useContext, useEffect, useState} from "react";
import {Background} from "../components/ui/Background";
import {BtnUI} from "../components/ui/Btn";
import {InputUI} from "../components/ui/Input";
import {Logo} from "../components/ui/Logo";
import {Main} from "../components/ui/Main";
import {Title} from "../components/ui/Title";
import {PagesContext} from "../contexts/PagesProvider";
import {UserContext} from "../contexts/userProvider";
import {updateUserIncome} from "../functions/updateUserFunctions";
import {useDebounce} from "@uidotdev/usehooks";

export const Income = () => {
  const [amount, setAmount] = useState("");
  const {nextPage}: any = useContext(PagesContext);
  const {user, setUser, signIn, isLoading}: any = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState("");
  const debouncedAmount = useDebounce(amount, 400);

  useEffect(() => {
    if (debouncedAmount == "") {
      return;
    }
    updateUserIncome(user?.id, debouncedAmount)
      .then(() => {
        console.log("Income updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating Income:", error);
      });
  }, [amount, user]);

  return (
    <Background>
      <header>
        <Logo />
      </header>
      <main className="w-full">
        <section className="w-full mb-3">
          <Title
            title={"Monthly Income"}
            question={"Tell us your monthly income."}
          />
        </section>

        <Main>
          <section>
            <InputUI
              type={"text"}
              placeholder={"Type your monthly income"}
              value={amount}
              onChange={(e: any) => {
                setAmount(e.target.value);
              }}
            />
          </section>
        </Main>

        <section className="mt-5">
          <BtnUI
            type={"primary"}
            title={"Continue"}
            onClick={() => {
              nextPage();
            }}
          />
        </section>
      </main>
    </Background>
  );
};
