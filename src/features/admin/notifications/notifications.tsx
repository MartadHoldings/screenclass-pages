"use client";
import React, { useState } from "react";
import EmailTemplate from "@/components/notifications/EmailTemplate";
import SmsTemplate from "@/components/notifications/SmsTemplate";
import Client from "./client";
import { Modal, Button, Flex } from "antd";
import SendSms from "@/components/modals/send-sms";
import SendMail from "@/components/modals/send-email";

export const Notifications = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<"email" | "sms" | null>(null);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(null);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(null);
  };

  const handleSelect = (value: "email" | "sms" | null) => {
    setOpen(value);
  };

  return (
    <div>
      <h2 className="text-[1.3rem] font-semibold">Notifications</h2>
      <div className="mt-10 grid grid-cols-4 gap-4">
        <EmailTemplate handleSelect={handleSelect} />
        <SmsTemplate handleSelect={handleSelect} />
      </div>
      <Client />
      <Modal
        open={open !== null}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        title={open === "email" ? "Send Mail" : "Send SMS"}
        centered
        footer={
          <Flex gap="small">
            <Button
              key="back"
              onClick={handleCancel}
              className="w-full"
              size="large"
            >
              Cancel
            </Button>

            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
              className="w-full"
              size="large"
            >
              Send
            </Button>
          </Flex>
        }
      >
        {open === "sms" ? <SendSms /> : <SendMail />}
      </Modal>{" "}
    </div>
  );
};
