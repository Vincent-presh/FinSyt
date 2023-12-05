import {useContext, useEffect, useState} from "react";
import {Background} from "../components/ui/Background";
import {BtnUI} from "../components/ui/Btn";
import {Logo} from "../components/ui/Logo";
import {Title} from "../components/ui/Title";
import {PagesContext} from "../contexts/PagesProvider";
import googleLogo from "../assets/logos/google-logo.png";
import {InputBtn} from "../components/ui/InputBtn";
import {UserContext} from "../contexts/userProvider";
import {toast} from "react-toastify";

export const Login = () => {
  const {nextPage, currentIndex}: any = useContext(PagesContext);
  const {user, setUser, signIn, isLoading}: any = useContext(UserContext);
  const [male, setMale] = useState(false);
  const [female, setFeMale] = useState(false);

  useEffect(() => {
    if (user) {
      console.log(user);
      if (!user?.gender && currentIndex != 2) {
        nextPage(1);
        return;
      }
      if (!user?.relationship) {
        nextPage(2);
        return;
      }
      if (!user?.dependants) {
        nextPage(3);
        return;
      }
      if (!user?.income) {
        nextPage(4);
        return;
      }
      if (!user?.debt) {
        nextPage(5);
        return;
      }
      nextPage(8);
      return;
      // if (!user?.spendables) {
      //   nextPage(6);
      //   return;
      // }
    }
  }, [user]);

  return (
    <Background>
      <header>
        <Logo />
      </header>
      <main className="w-full space-y-6">
        <section className="w-full">
          <Title
            title={"Welcome to your finacial assistant"}
            question={"Sign in here"}
            align={"center"}
          />
        </section>

        <section>
          <BtnUI
            type={"primary"}
            title={"Continue with Google"}
            icon={
              <img
                src={googleLogo}
                alt="google logo"
                className="w-[1.125rem]"
              />
            }
            onClick={async () => {
              if ((await signIn()) === true) {
                // toast("Login Successful!");
              }
            }}
          />
        </section>
      </main>
    </Background>
  );
};
