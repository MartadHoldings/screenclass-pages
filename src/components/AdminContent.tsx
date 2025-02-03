"use client";
import React from "react";
import HeaderContent from "@/components/shared/HeaderContent";
import { FileOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  path?: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label: path ? (
      <Link href={path} legacyBehavior>
        <a>{label}</a>
      </Link>
    ) : (
      label
    ),
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "1", "/overview", <FileOutlined />),
  getItem("Guardian", "2", "/guardian", <FileOutlined />),
  getItem("Students", "3", "/students", <FileOutlined />),
  getItem("Classes", "12", "/classes", <FileOutlined />),
  getItem("Subject & Content", "4", "/subjects-content", <FileOutlined />),
  getItem("Trivia", "5", "/trivia", <FileOutlined />),
  getItem("Videos & Notes", "6", "/videos-notes", <FileOutlined />),
  getItem("Payments", "7", "/payments", <FileOutlined />),
  getItem("Subscriptions", "8", "/subscriptions", <FileOutlined />),
  getItem("Notifications", "9", "/notifications", <FileOutlined />),
  getItem("Settings", "10", "/settings", <FileOutlined />),
  getItem("Logout", "11", "/logout", <FileOutlined />),
];

const siderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: "3em 0",
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

export default function AdminContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider style={siderStyle} width={255}>
        <div className="flex h-20 w-full items-center justify-center">
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={200}
            height={38}
            className="shrink-0"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          className="mt-6 space-y-4"
        />
      </Sider>
      <Layout>
        <Header
          style={{ background: colorBgContainer, padding: 0, height: "100px" }}
          className="shadow-lg"
        >
          <HeaderContent />
        </Header>
        <Content style={{ margin: "24px 32px 0" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
