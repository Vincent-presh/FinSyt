import {Background} from "../components/ui/Background";
import {Logo} from "../components/ui/Logo";
import {BtnUI} from "../components/ui/Btn";
import {Title} from "../components/ui/Title";
import {useContext, useEffect, useState} from "react";
import {InputBtn} from "../components/ui/InputBtn";
import {PagesContext} from "../contexts/PagesProvider";
import {updateUserDebt} from "../functions/updateUserFunctions";
import {UserContext} from "../contexts/userProvider";

export const Debt = () => {
  const [debt, setDebt] = useState("");
  const {user}: any = useContext(UserContext);
  const {nextPage}: any = useContext(PagesContext);

  const options = [
    {title: "Yes", name: "I have debts"},
    {title: "No", name: "I dont have any debt"},
  ];

  useEffect(() => {
    if (debt == "") {
      return;
    }
    updateUserDebt(user?.id, debt)
      .then(() => {
        console.log("Debt status updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating debt status:", error);
      });
  }, [debt, user]);

  return (
    <Background>
      <header>
        <Logo />
      </header>
      <main className="w-full">
        <section className="w-full">
          <Title title={"Debt Status"} question={"Do you have any debts?"} />
        </section>
        <section className="my-5">
          <div className="flex w-full flex-col space-y-5">
            {options.map((stat) => (
              <InputBtn
                title={stat.title}
                name={stat.name}
                selectedOption={debt}
                setSelectedOption={setDebt}
              />
            ))}
          </div>
        </section>
        <section>
          <BtnUI
            type={"primary"}
            title={"Continue"}
            value={debt}
            onClick={() => {
              nextPage(8);
            }}
          />
        </section>
      </main>
    </Background>
  );
};
