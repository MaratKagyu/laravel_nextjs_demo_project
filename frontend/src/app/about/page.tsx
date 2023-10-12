import React from 'react';
import {NextPage} from "next";
import VerticalLayout from "@/component/VerticalLayout/VerticalLayout";
import TopMenu from "@/component/TopMenu/TopMenu";
import VLScrollableContent from "@/component/VerticalLayout/VLScrollableContent";

const AboutPage: NextPage = () => {
  return (
    <VerticalLayout>
      <TopMenu />
      <VLScrollableContent>
        Here&apos;s about page
      </VLScrollableContent>
    </VerticalLayout>
  )
};

export default AboutPage;
