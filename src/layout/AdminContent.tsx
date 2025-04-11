"use client";
import "@ant-design/v5-patch-for-react-19";
import React from "react";
import HeaderContent from "@/components/shared/HeaderContent";
import { Layout, Menu, Modal, theme } from "antd";
import type { MenuProps } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ChartLine,
  GraduationCap,
  Receipt,
  BellRing,
  UserPlus,
  LogOut,
  ShieldCheck,
  Youtube,
} from "lucide-react";
import { logout } from "@/queries/auth";
import { toast } from "sonner";

const { Header, Content, Sider, Footer } = Layout;

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
    label: <span>{label}</span>, // Remove <Link> for "Logout"
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Overview", "/dashboard", <LayoutDashboard />),
  getItem("Guardian", "/dashboard/guardian", <ShieldCheck />),
  getItem("Students", "/dashboard/students", <Users />),
  getItem("Levels", "/dashboard/levels", <ChartLine />),
  getItem("Class & Subjects", "/dashboard/class-subjects", <GraduationCap />),
  getItem("Payments", "/dashboard/payment-history", <Receipt />),
  getItem("Subscriptions", "/dashboard/subscription-plans", <Youtube />),
  getItem("Notifications", "/dashboard/notifications", <BellRing />),
  getItem("Create an Account", "/dashboard/create-account", <UserPlus />),
  getItem("Logout", "/logout", <LogOut color="red" />),
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

  const router = useRouter();

  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "/logout") {
      setLogoutModalOpen(true);
    } else {
      window.location.href = key;
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await logout();
      console.log(res);

      if (res.success) {
        setLogoutModalOpen(false);
        toast.success(res.data.message);
        router.push("/");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

      setLogoutModalOpen(false);
    }
  };
  return (
    <>
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
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: colorBgContainer,
              padding: 0,
              height: "100px",
            }}
            className="shadow-lg"
          >
            <HeaderContent />
          </Header>
          <Content style={{ margin: "24px 32px 0" }}>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            Screenclass ©{new Date().getFullYear()} Created by Martad Holdings
            Limited
          </Footer>
        </Layout>
      </Layout>

      <Modal
        open={logoutModalOpen}
        onCancel={() => setLogoutModalOpen(false)}
        onOk={() => {
          handleLogout();
        }}
        centered
        okText="Yes, Logout"
        cancelText="Cancel"
        title="Confirm Logout"
        confirmLoading={loading}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </>
  );
}
