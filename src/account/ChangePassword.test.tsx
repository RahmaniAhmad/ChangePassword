import ChangePassword from "./ChangePassword";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";

describe.only("ChangePassword", () => {
  test("there should be two inputs and a button in page", () => {
    const { queryByTestId } = render(<ChangePassword />);
    const container = queryByTestId("example");
    const inputs = container && container.querySelectorAll("input");
    expect(inputs).not.toBeNull();
    expect(inputs && inputs.length).toEqual(2);

    const button = queryByTestId("submitButton");
    expect(button).not.toBeNull();
  });

  test("should fire onClick because password and confirmPassword are valid and match", async () => {
    jest.spyOn(window, "alert").mockClear();
    const functionMock = jest.fn();
    jest.spyOn(window, "alert").mockImplementation(() => functionMock());

    const { queryByTestId } = render(<ChangePassword />);

    const container = queryByTestId("example");
    const inputs = container?.querySelectorAll("input");
    const button = queryByTestId("submitButton");
    expect(inputs?.length).toBe(2);
    await act(async () => {
      inputs && fireEvent.change(inputs[0], { target: { value: "1234" } });
      inputs && fireEvent.change(inputs[1], { target: { value: "1234" } });

      button && fireEvent.click(button);
    });
    await waitFor(() => expect(functionMock).toHaveBeenCalledTimes(1));
  });

  test("should not fire onClick because password and confirmPassword are not match", async () => {
    jest.spyOn(window, "alert").mockClear();
    const functionMock = jest.fn();
    jest.spyOn(window, "alert").mockImplementation(() => functionMock());

    const { queryByTestId } = render(<ChangePassword />);

    const container = queryByTestId("example");
    const inputs = container?.querySelectorAll("input");
    const button = queryByTestId("submitButton");
    expect(inputs?.length).toBe(2);
    await act(async () => {
      inputs && fireEvent.change(inputs[0], { target: { value: "1234" } });
      inputs && fireEvent.change(inputs[1], { target: { value: "12345" } });

      button && fireEvent.click(button);
    });
    await waitFor(() => expect(functionMock).toHaveBeenCalledTimes(0));
  });
});
