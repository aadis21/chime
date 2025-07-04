import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import * as Styled from "./styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useHover } from "usehooks-ts";

import { NAVIGATION_ITEMS } from "@constants";
import { useUser } from "@hooks";
import { IconSVG, InactiveSpan } from "@components/elements";

const Header: FC = () => {
  const [isSpliderOpened, setIsSpliderOpened] = useState<boolean>(false);
  const [isSubmenuVisible, setIsSubmenuVisible] = useState<boolean>(false);
  const { events, push: navigate } = useRouter();
  const { user, setUser } = useUser();
  const menuRef = useRef(null);
  const isMenuHover = useHover(menuRef);

  useEffect(() => {
    setIsSubmenuVisible(true);
  }, [isMenuHover]);

  useEffect(() => {
    const handleResize = () => setIsSubmenuVisible(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const closeModal = () => setIsSpliderOpened(false);
    events.on("routeChangeComplete", closeModal);
    return () => events.off("routeChangeComplete", closeModal);
  }, [events]);

  const openTidioChat = () => {
    if (typeof window !== "undefined" && (window as any).tidioChatApi?.open) {
      (window as any).tidioChatApi.open();
    }
  };

  return (
    <>
      <Styled.Header>
        <Link href="/">
          <h1>
            <Image
              src="/static/components/Header/chime-logo.png"
              alt="Chime Logo"
              width={90}
              height={30}
            />
          </h1>
        </Link>

        <Styled.MenuContainerDesktop ref={menuRef} visible={isSubmenuVisible}>
          <menu>
            {NAVIGATION_ITEMS.map((item, idx) => (
              <li key={idx}>
                {item.path ? (
                  <Styled.Span>
                    <Link href={item.path}>{item.label}</Link>
                  </Styled.Span>
                ) : (
                  <Styled.Span>
                    <InactiveSpan width={2}>{item.label}</InactiveSpan>
                  </Styled.Span>
                )}
                <Styled.SubmenuContainerDesktop />
              </li>
            ))}
          </menu>
        </Styled.MenuContainerDesktop>

        <nav>
          <Link href="/users/sign-up">
            <Styled.Button>Sign In</Styled.Button>
          </Link>

          <Styled.Button onClick={openTidioChat}>
            Contact Us
          </Styled.Button>

          <IconSVG
            onClick={() =>
              setIsSpliderOpened(isSpliderOpened => !isSpliderOpened)
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </IconSVG>
        </nav>
      </Styled.Header>

      <Styled.ModalContainer isVisible={isSpliderOpened}>
        <header>
          <Link href="/">
            <h1>
              <Image
                src="/static/components/Header/chime-logo.png"
                alt="Chime Logo"
                width={100}
                height={30}
              />
            </h1>
          </Link>

          <IconSVG
            onClick={() =>
              setIsSpliderOpened(isSpliderOpened => !isSpliderOpened)
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </IconSVG>
        </header>

        <Styled.MenuContainer>
          <menu>
            {NAVIGATION_ITEMS.map((item, idx) => (
              <li key={idx}>
                {item.path ? (
                  <Link href={item.path}>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <InactiveSpan width={2}>{item.label}</InactiveSpan>
                )}
              </li>
            ))}
          </menu>
        </Styled.MenuContainer>

        {/* {!user && (
          // <Styled.AccountActions>
          //   <div onClick={() => navigate("/users/log-in")}>Sign In</div>
          // </Styled.AccountActions>
        )} */}
      </Styled.ModalContainer>
    </>
  );
};

export default Header;
