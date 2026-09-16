import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useSidebarStore } from "@/stores/SidebarStore";
import { NavigationSidebar } from "../NavigationSidebar";

describe("NavigationSidebar", () => {
  beforeEach(() => {
    useSidebarStore.setState({ openMenus: { Integrations: true } });
  });

  it("shows a neutral unchecked status instead of an operational claim", () => {
    render(<NavigationSidebar />);

    expect(screen.getByText("Status not checked")).toBeTruthy();
    expect(screen.queryByText("All systems operational")).toBeNull();
  });

  it("labels the catalog as Extensions while preserving its existing route", () => {
    render(<NavigationSidebar />);

    const extensionsLink = screen.getByRole("link", { name: "Extensions" });
    expect(extensionsLink).toHaveAttribute(
      "href",
      "/dashboard/integrations/plugins"
    );
    expect(screen.queryByText("Plugins")).toBeNull();
  });
});
