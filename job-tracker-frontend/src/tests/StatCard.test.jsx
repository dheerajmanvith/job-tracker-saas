import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatCard from "../components/StatCard";

describe("StatCard", () => {
  it("renders title and value", () => {
    render(
      <StatCard
        title="Total Applications"
        value={25}
        color="blue"
      />
    );

    expect(
      screen.getByText("Total Applications")
    ).toBeInTheDocument();

    expect(
      screen.getByText("25")
    ).toBeInTheDocument();
  });
});