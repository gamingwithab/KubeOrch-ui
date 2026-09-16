import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { PluginWithStatus } from "@/lib/services/plugins";
import PluginsPage from "../page";

const { store } = vi.hoisted(() => ({
  store: {
    plugins: [] as PluginWithStatus[],
    isLoading: false,
    fetchPlugins: vi.fn(),
    enablePlugin: vi.fn(),
    disablePlugin: vi.fn(),
  },
}));

vi.mock("@/stores/PluginStore", () => ({
  usePluginStore: () => store,
}));

vi.mock("@/components/layout/AppLayout", () => ({
  AppLayout: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/layout/PageContainer", () => ({
  PageContainer: ({
    title,
    description,
    breadcrumbs,
    children,
  }: {
    title: string;
    description: string;
    breadcrumbs: Array<{ label: string }>;
    children: ReactNode;
  }) => (
    <main>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav aria-label="Breadcrumbs">
        {breadcrumbs.map(crumb => (
          <span key={crumb.label}>{crumb.label}</span>
        ))}
      </nav>
      {children}
    </main>
  ),
}));

vi.mock("@/components/ui/select", () => ({
  Select: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SelectContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SelectTrigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SelectValue: () => null,
}));

describe("Extensions catalog", () => {
  beforeEach(() => {
    store.plugins = [];
    store.isLoading = false;
    store.fetchPlugins.mockReset();
    store.enablePlugin.mockReset();
    store.disablePlugin.mockReset();
  });

  it("uses Extensions consistently for catalog-facing copy", () => {
    render(<PluginsPage />);

    expect(screen.getByRole("heading", { name: "Extensions" })).toBeTruthy();
    expect(screen.getByPlaceholderText("Search extensions...")).toBeTruthy();
    expect(screen.getByText("0 of 0 extensions enabled")).toBeTruthy();
    expect(screen.getByText("No extensions found")).toBeTruthy();
    expect(screen.getByText("No extensions are available at the moment.")).toBeTruthy();

    expect(screen.queryByText("CRD Plugins")).toBeNull();
    expect(screen.queryByPlaceholderText("Search plugins...")).toBeNull();
  });

  it("gives the extension enable control an accessible action label", () => {
    store.plugins = [
      {
        id: "example",
        name: "example",
        displayName: "Example",
        description: "Example authoring extension",
        category: "workflow",
        icon: "Plug",
        version: "1.0.0",
        crdGroup: "example.io",
        crdKinds: ["Example"],
        nodeTypes: [],
        createdAt: "2026-09-16T00:00:00Z",
        updatedAt: "2026-09-16T00:00:00Z",
        enabled: false,
      },
    ];

    render(<PluginsPage />);

    expect(
      screen.getByRole("switch", { name: "Enable Example extension" })
    ).toBeTruthy();
  });
});
