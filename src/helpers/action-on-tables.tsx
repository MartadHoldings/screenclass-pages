import {
  UserInfo,
  DangerousActionModal,
  SubscribeStudent,
} from "@/components/modals";
import AddNew from "@/components/modals/add-new";
import DeleteActionModal from "@/components/modals/delete-action-modal";
import EditClass from "@/components/modals/edit-class";
import { TableData } from "@/types";
import { Button, Flex } from "antd";

interface RenderFooterType {
  activeDropDown: string | null;
  loading: boolean;
  handleCancel: () => void;
  handleOk: () => void;
}

interface RenderFooterClassType
  extends Omit<RenderFooterType, "activeDropDown"> {
  tableActionModal: string | null;
}

interface RenderClassActionType {
  tableActionModal: string | null;
  editingRow: TableData | null;
}

interface RenderSubjectActionType {
  tableActionModal: string | null;
  editingRow: TableData | null;
}

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

export const renderClassActionsModal = ({
  tableActionModal,
  editingRow,
}: RenderClassActionType) => {
  switch (tableActionModal) {
    case "add new class":
      return <AddNew type="class" />;
    case "edit class cell":
      return editingRow && <EditClass editingRow={editingRow} type="class" />;
    case "delete classes":
      return <DeleteActionModal variant="class" />;
    default:
      return null;
  }
};

export const renderClassModalsFooter = ({
  tableActionModal,
  handleCancel,
  handleOk,
  loading,
}: RenderFooterClassType) => {
  switch (tableActionModal) {
    case "add new class":
    case "delete classes":
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
            {tableActionModal === "delete classes"
              ? "Delete Selections"
              : "Add Class"}
          </Button>
        </Flex>
      );
    case "edit class cell":
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
            Save
          </Button>
        </Flex>
      );

    default:
      return null;
  }
};

export const renderSubjectActionsModal = ({
  tableActionModal,
  editingRow,
}: RenderSubjectActionType) => {
  switch (tableActionModal) {
    case "add new subject":
      return <AddNew type="subject" />;
    case "edit subject cell":
      return editingRow && <EditClass editingRow={editingRow} type="subject" />;
    case "delete subjects":
      return <DeleteActionModal variant="subjects" />;
    default:
      return null;
  }
};

export const renderSubjectModalsFooter = ({
  tableActionModal,
  handleCancel,
  handleOk,
  loading,
}: RenderFooterClassType) => {
  switch (tableActionModal) {
    case "add new subject":
    case "delete subjects":
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
            {tableActionModal === "delete subjects"
              ? "Delete Selections"
              : "Add Subject"}
          </Button>
        </Flex>
      );
    case "edit subject cell":
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
            Save
          </Button>
        </Flex>
      );

    default:
      return null;
  }
};
