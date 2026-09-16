import type { ReactNode } from "react";
import { render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import WorkflowPage from "../page";

const { listClustersMock, listWorkflowsMock, toastErrorMock } = vi.hoisted(
  () => ({
    listClustersMock: vi.fn(),
    listWorkflowsMock: vi.fn(),
    toastErrorMock: vi.fn(),
  })
);

vi.mock("@/lib/services/cluster", () => ({
  clusterService: {
    listClusters: listClustersMock,
  },
}));

vi.mock("@/lib/services/workflow", () => ({
  listWorkflows: listWorkflowsMock,
  cloneWorkflow: vi.fn(),
  updateWorkflowStatus: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    error: toastErrorMock,
    info: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
  },
}));

vi.mock("@/components/layout/AppLayout", () => ({
  AppLayout: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/layout/PageContainer", () => ({
  PageContainer: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("WorkflowPage loading errors", () => {
  beforeEach(() => {
    listClustersMock.mockReset();
    listWorkflowsMock.mockReset();
    toastErrorMock.mockReset();
  });

  it("shows one actionable cluster-loading error and skips workflow loading", async () => {
    listClustersMock.mockRejectedValueOnce(new Error("cluster request failed"));

    render(<WorkflowPage />);

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledTimes(1);
      expect(toastErrorMock).toHaveBeenCalledWith(
        "Failed to load clusters. Try again."
      );
    });

    expect(listWorkflowsMock).not.toHaveBeenCalled();
  });

  it("shows only the workflow-loading error when workflow loading fails", async () => {
    listClustersMock.mockResolvedValueOnce({
      clusters: [{ id: "cluster-1" }],
    });
    listWorkflowsMock.mockRejectedValueOnce(new Error("workflow request failed"));

    render(<WorkflowPage />);

    await waitFor(() => {
      expect(listWorkflowsMock).toHaveBeenCalledTimes(1);
      expect(toastErrorMock).toHaveBeenCalledTimes(1);
      expect(toastErrorMock).toHaveBeenCalledWith(
        "Failed to load workflows. Try again."
      );
    });
  });
});
