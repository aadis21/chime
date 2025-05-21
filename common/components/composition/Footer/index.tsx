import * as Styled from "./styled";

import type { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { NAVIGATION_ITEMS, BREAKPOINTS } from "@constants";
import { ContentContainer, InactiveSpan } from "@components/elements";

const Footer: FC = () => {
  return (
    <Styled.Footer>
      <ContentContainer>
        <Styled.TopSection>
          <Styled.MenuSection>
            {NAVIGATION_ITEMS.map((item, idx) => (
              <li key={idx}>
                {item.path ? (
                  <span>
                    <Link href={item.path}>{item.label}</Link>
                  </span>
                ) : (
                  <InactiveSpan width={2}>{item.label}</InactiveSpan>
                )}

              
              </li>
            ))}
          </Styled.MenuSection>

          <Styled.HorizontalLine hideAt={BREAKPOINTS.LG} />

          {/* <Styled.SocialSection>
            <a href="https://apps.apple.com/us/app/Chime-banking/id836215269">
              <Image
                src="/static/components/Footer/app-store.png"
                alt="Chime App Store Download"
                width="170px"
                height="40px"
              />
            </a>

            <a href="https://play.google.com/store/apps/details?id=com.onedebit.Chime&hl=en">
              <Image
                src="/static/components/Footer/google-play.png"
                alt="Chime Google Play Download"
                width="170px"
                height="40px"
              />
            </a>

            <Styled.IconWrapper>
              <a href="https://www.facebook.com/Chime">
                <Image
                  src="/static/components/Footer/facebook-bw.png"
                  alt="Chime Facebook"
                  width="32px"
                  height="32px"
                />
              </a>
            </Styled.IconWrapper>

            <Styled.IconWrapper>
              <a href="https://twitter.com/Chime">
                <Image
                  src="/static/components/Footer/twitter-bw.png"
                  alt="Chime Twitter"
                  width="32px"
                  height="32px"
                />
              </a>
            </Styled.IconWrapper>

            <Styled.IconWrapper>
              <a href="https://www.instagram.com/Chime/">
                <Image
                  src="/static/components/Footer/instagram-bw.png"
                  alt="Chime Instagram"
                  width="32px"
                  height="32px"
                />
              </a>
            </Styled.IconWrapper>
          </Styled.SocialSection> */}
        </Styled.TopSection>

        <Styled.HorizontalLine />

        <Styled.DisclaimerSection>
         

          <p>© 025 ChimePay. All Rights Reserved.</p>
        </Styled.DisclaimerSection>
      </ContentContainer>
    </Styled.Footer>
  );
};

export default Footer;
