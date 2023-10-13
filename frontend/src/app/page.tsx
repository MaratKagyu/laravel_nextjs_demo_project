"use client";
import {NextPage} from "next";
import TopMenu from "@/component/TopMenu/TopMenu";
import VLScrollableContent from "@/component/VerticalLayout/VLScrollableContent";
import VerticalLayout from "@/component/VerticalLayout/VerticalLayout";
import React from "react";
import AuthRequired from "@/component/AuthRequired/AuthRequired";
import Dashboard from "@/component/Dashboard/Dashboard";

const HomePage: NextPage = () => {
  return (
    <AuthRequired>
      <VerticalLayout>
        <TopMenu />
        <VLScrollableContent>
          <Dashboard />
        </VLScrollableContent>
      </VerticalLayout>
    </AuthRequired>

  )
};

export default HomePage;
