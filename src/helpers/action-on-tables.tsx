import {
  UserInfo,
  DangerousActionModal,
  SubscribeStudent,
} from "@/components/modals";
import { Button, Flex } from "antd";

type RenderFooterType = {
  activeDropDown: string | null;
  loading: boolean;
  handleCancel: () => void;
  handleOk: () => void;
};

export const renderActionsModalGuardian = (action: string | null) => {
  switch (action) {
    case "View Guardian Details":
      return <UserInfo type="guardian" />;
    case "Suspend Guardian":
      return <DangerousActionModal actionType="suspend" user="guardian" />;
    case "Delete Guardian":
      return <DangerousActionModal actionType="delete" user="guardian" />;
    default:
      return null;
  }
};

export const renderActionsModalStudent = (action: string | null) => {
  switch (action) {
    case "View Student Details":
      return <UserInfo type="student" />;
    case "Suspend Student":
      return <DangerousActionModal actionType="suspend" user="student" />;
    case "Subscribe for Student":
      return <SubscribeStudent />;
    case "Delete Student":
      return <DangerousActionModal actionType="delete" user="student" />;
    default:
      return null;
  }
};

export const renderFooter = ({
  activeDropDown,
  handleCancel,
  loading,
  handleOk,
}: RenderFooterType) => {
  switch (activeDropDown) {
    case "View Student Details":
    case "View Guardian Details":
      return (
        <Button
          key="back"
          onClick={handleCancel}
          size="large"
          className="w-full"
          type="primary"
        >
          Return
        </Button>
      );

    case "Suspend Student":
    case "Delete Student": // ✅ Uses the same footer for both cases
      return (
        <Flex gap="small">
          <Button
            key="back"
            onClick={handleCancel}
            size="large"
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
            size="large"
            className="w-full"
          >
            {activeDropDown === "Suspend Student" ? "Suspend" : "Delete"}
          </Button>
        </Flex>
      );

    case "Subscribe for Student":
      return (
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
          size="large"
          className="w-full"
        >
          Subscribe
        </Button>
      );

    default:
      return null;
  }
};
