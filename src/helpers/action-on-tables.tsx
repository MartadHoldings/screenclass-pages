import {
  UserInfo,
  DangerousActionModal,
  SubscribeStudent,
} from "@/components/modals";
import AddNewSubject from "@/components/modals/add-new-subject";
import AddNew from "@/components/modals/add-new-subject";
import AddTopic from "@/components/modals/add-topic";
import DeleteActionModal from "@/components/modals/delete-action-modal";
import DeleteTopic from "@/components/modals/delete-topic";
import EditClass from "@/components/modals/edit-class";
import { ActiveDropDown } from "@/context/modal-state-context";
import { TableData } from "@/types";
import { Button, Flex } from "antd";

interface RenderFooterType {
  activeDropDown: ActiveDropDown | null;
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

export const renderActionsModalGuardian = (action: ActiveDropDown | null) => {
  switch (action?.label) {
    case "View Guardian Details":
      return <UserInfo />;
    case "Suspend Guardian":
      return <DangerousActionModal actionType="suspend" user="guardian" />;
    case "Delete Guardian":
      return <DangerousActionModal actionType="delete" user="guardian" />;
    default:
      return null;
  }
};

export const renderActionsModalStudent = (action: ActiveDropDown | null) => {
  switch (action?.label) {
    case "View Student Details":
      return <UserInfo />;
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
  switch (activeDropDown?.label) {
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
          Close
        </Button>
      );

    case "Suspend Student":
    case "Suspend Guardian":
    case "Delete Student":
    case "Delete Guardian": // ✅ Uses the same footer for both cases
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
            {activeDropDown.label === "Suspend Student" ||
            activeDropDown.label === "Suspend Guardian"
              ? "Suspend"
              : "Delete"}
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
    // return <AddNewSubject />;
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
      return <AddNewSubject />;
    // case "edit subject cell":
    //   return editingRow && <EditClass editingRow={editingRow} type="subject" />;
    case "add topic to subject":
      return editingRow && <AddTopic editingRow={editingRow} />;
    // case "delete subjects":
    //   return <DeleteActionModal variant="subjects" />;
    case "delete topic":
      return <DeleteTopic editingRow={editingRow} />;
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
    // case "edit subject cell":
    //   return (
    //     <Flex gap="small">
    //       <Button
    //         key="back"
    //         onClick={handleCancel}
    //         size="large"
    //         className="w-full"
    //       >
    //         Cancel
    //       </Button>
    //       <Button
    //         key="submit"
    //         type="primary"
    //         loading={loading}
    //         onClick={handleOk}
    //         size="large"
    //         className="w-full"
    //       >
    //         Save
    //       </Button>
    //     </Flex>
    //   );

    case "add topic to subject":
    case "delete topic":
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
            color={
              tableActionModal === "add topic to subject" ? "blue" : "danger"
            }
            variant="solid"
            loading={loading}
            onClick={handleOk}
            size="large"
            className="w-full"
          >
            {tableActionModal === "add topic to subject"
              ? "Add Topic"
              : "Delete Topic"}
          </Button>
        </Flex>
      );

    default:
      return null;
  }
};

export const renderSubscriptionsFooter = ({
  tableActionModal,
  handleCancel,
  loading,
  handleOk,
}: RenderFooterClassType) => {
  switch (tableActionModal) {
    case "edit subscription":
      return (
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
            Edit Plan
          </Button>
        </Flex>
      );

    default:
      break;
  }
};
