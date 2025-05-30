import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@types";

import Head from "next/head";
import { COLORS } from "@constants";
import { MainLayout } from "@components/composition";
import { MonoSection, DualSection, BannerSection } from "@components/sections";
import { EnrollForm } from "@components/elements";

const GetPaidEarlyPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Get Paid Early | ChimePay</title>
        <meta name="description" content="ChimePay  Clone Get Paid Early" />
      </Head>

      {/* 1 */}
      <BannerSection
        img={{
          align: "center",
          src: "/static/pages/get-paid-early/calendar-2.png",
          alt: "Calendar",
          originalSize: [528, 352],
          width: {
            sm: 525,
            md: 365,
            lg: 485,
          },
        }}
      >
        <small>Get paid early with Early Direct Deposit</small>

        <h1>
          Get your paycheck up to two days early<sup>1</sup>
        </h1>

        <p>
          Get your paycheck early<sup>1</sup> with direct deposit. That&apos;s
          up to two more days to do more with your money. Stop waiting and start
          getting paid early!
        </p>

        <EnrollForm direction="cols" label="Get Started" />

        <small>Already have an account?</small>
        <small>
          Learn how we collect and use your information by visiting our Privacy
          Policy
        </small>
      </BannerSection>

      {/* 2 */}
      <DualSection
        backgroundColor={COLORS.GRAY_LIGHT}
        img={{
          float: "left",
          src: "/static/pages/get-paid-early/website-payday.png",
          alt: "Website Payday",
          originalSize: [792, 362],
          width: {
            sm: 656,
            md: 547,
          },
        }}
      >
        <h2>Grow your savings as you spend</h2>

        <p>
          Saving money is a no-brainer through ChimePay  online banking. Every time
          you swipe your debit card, we round up to the nearest dollar and
          transfer the round-up from your Checking Account straight into your
          Savings Account. A magical, little way to make your money grow over
          time.
        </p>
      </DualSection>

      {/* 3 */}
      <DualSection
        img={{
          float: "right",
          src: "/static/pages/get-paid-early/notification-mobile.png",
          alt: "Website Payday",
          originalSize: [750, 559],
          width: {
            sm: 402,
          },
        }}
      >
        <h2>How to get paid early with direct deposit</h2>

        <p>
          ChimePay  is more than a get paid early app. We offer a mobile banking
          account – including early direct deposit<sup>1</sup> – on behalf of
          our partners. One of the easiest ways to fund your ChimePay  Checking
          Account is to set up direct deposit, which can be done in the ChimePay 
          mobile app. When you open an account through ChimePay , you can email
          yourself a pre-filled direct deposit form that you can hand over to
          your employer. It&apos;s that easy to start getting paid early
          <sup>1</sup> with direct deposit.
        </p>
      </DualSection>

      {/* 4 */}
      <MonoSection backgroundColor={COLORS.LIME_DARK}>
        <h2>Get Started Today</h2>

        <p>
          Applying for an account is free and takes less than 2 minutes with no
          impact to your credit score.
        </p>

        <EnrollForm label="Apply Now" theme="dark" direction="mixed" />
      </MonoSection>
    </>
  );
};

GetPaidEarlyPage.getLayout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default GetPaidEarlyPage;
