import React from 'react';
import {NextPage} from "next";
import VerticalLayout from "@/component/VerticalLayout/VerticalLayout";
import TopMenu from "@/component/TopMenu/TopMenu";
import VLScrollableContent from "@/component/VerticalLayout/VLScrollableContent";
import Login from "@/component/Login/Login";

const LoginPage: NextPage = () => {
  return (
    <VerticalLayout>
      <TopMenu />
      <VLScrollableContent>
        <Login />
      </VLScrollableContent>
    </VerticalLayout>
  )
};

export default LoginPage;
