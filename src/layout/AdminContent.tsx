"use client";
import React from "react";
import HeaderContent from "@/components/shared/HeaderContent";
import { FileOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label:
      key === "/logout" ? (
        <Link href={key.toString()} legacyBehavior>
          <a>{label}</a>
        </Link>
      ) : (
        <Link href={key.toString()} legacyBehavior>
          <a>{label}</a>
        </Link>
      ),
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/overview", <FileOutlined />),
  getItem("Guardian", "/guardian", <FileOutlined />),
  getItem("Students", "/students", <FileOutlined />),
  getItem("Classes", "/classes", <FileOutlined />),
  getItem("Subject & Content", "/subjects-content", <FileOutlined />),
  getItem("Trivia", "/trivia", <FileOutlined />),
  getItem("Videos & Notes", "videos-notes", <FileOutlined />),
  getItem("Payments", "/payment-history", <FileOutlined />),
  getItem("Subscriptions", "/subscription-plans", <FileOutlined />),
  getItem("Notifications", "/notifications", <FileOutlined />),
  getItem("Settings", "/settings", <FileOutlined />),
  getItem("Logout", "/logout", <FileOutlined />),
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

  const pathname = usePathname();

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
          selectedKeys={[pathname]}
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
