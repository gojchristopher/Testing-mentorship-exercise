import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ContactUsForm from "@/components/contact-us/contact-us-form";
import { Category, ConcernedProjects } from "src/types/contact-types";
import { ChakraProvider } from "@chakra-ui/react";
import Toast from "../toast";
import userEvent from "@testing-library/user-event";

describe("render contact form", () => {
  beforeEach(() => {
    render(<ContactUsForm />);
  });

  afterAll(cleanup);

  it("Should render form header", () => {
    expect(screen.getByTestId("form-header")).toBeInTheDocument();
  });
  it("Should render name input field", async () => {
    const nameInput = await screen.findAllByTestId("name.input");

    expect(nameInput).toHaveLength(1);
  });
  it("Should render email input field", async () => {
    const emailInput = await screen.findAllByTestId("email.input");

    expect(emailInput).toHaveLength(1);
  });
  it("Should render concerned project input field", async () => {
    const concernedProjectInput = await screen.findAllByRole("combobox", {
      name: "concerned-project.input",
    });

    expect(concernedProjectInput).toHaveLength(1);
  });
  it("Should render category input field", async () => {
    const categoryInput = await screen.findAllByRole("combobox", {
      name: "category.input",
    });

    expect(categoryInput).toHaveLength(1);
  });
  it("Should render description input field", async () => {
    const descriptionInput = await screen.findAllByTestId("description.input");

    expect(descriptionInput).toHaveLength(1);
  });
  it("Should render send button field", async () => {
    const sendButton = await screen.findAllByTestId("send.button");

    expect(sendButton).toHaveLength(1);
  });
});

describe("Contact form events with values", () => {
  beforeEach(() => {
    render(<ContactUsForm />);
  });

  afterAll(cleanup);

  it("Should have not an empty value in name input field", () => {
    const nameInput = screen.getByTestId("name.input");
    fireEvent.change(nameInput, { target: { value: "hello world" } });
    expect(nameInput).toHaveValue("hello world");
  });
  it("Should have not an empty value in email input field", () => {
    const emailInput = screen.getByTestId("email.input");
    fireEvent.change(emailInput, { target: { value: "helloworld@gmail.com" } });
    expect(emailInput).toHaveValue("helloworld@gmail.com");
  });
  it("Should have not an empty value in description input field", () => {
    const descriptionInput = screen.getByTestId("description.input");
    fireEvent.change(descriptionInput, {
      target: { value: "hello world testing 123" },
    });
    expect(descriptionInput).toHaveValue("hello world testing 123");
  });
  it("Should have a selected value on concerned project drop down", () => {
    const concernedProjectInput = screen.getByRole("combobox", {
      name: "concerned-project.input",
    });
    fireEvent.change(concernedProjectInput, {
      target: { value: ConcernedProjects.FinHQ },
    });
    expect(concernedProjectInput).toHaveDisplayValue(ConcernedProjects.FinHQ);
  });
  it("Should have a selected value on category drop down", () => {
    const categoryInput = screen.getByRole("combobox", {
      name: "category.input",
    });
    fireEvent.change(categoryInput, {
      target: { value: Category.General },
    });
    expect(categoryInput).toHaveDisplayValue(Category.General);
  });
});

describe("Contact form show toast", () => {
  it("Should show toast after clicking send button if all required fields are valid", async () => {
    render(
      <ChakraProvider>
        <ContactUsForm />
        <Toast />
      </ChakraProvider>
    );

    const nameInput = screen.getByTestId("name.input");
    const emailInput = screen.getByTestId("email.input");
    const descriptionInput = screen.getByTestId("description.input");
    const concernedProjectInput = screen.getByRole("combobox", {
      name: "concerned-project.input",
    });
    const categoryInput = screen.getByRole("combobox", {
      name: "category.input",
    });
    const sendButton = screen.getByTestId("send.button");

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "hello world" } });
      fireEvent.change(emailInput, {
        target: { value: "helloworld@gmail.com" },
      });
      fireEvent.change(descriptionInput, {
        target: { value: "hello world testing 123" },
      });
      fireEvent.change(concernedProjectInput, {
        target: { value: ConcernedProjects.FinHQ },
      });
      fireEvent.change(categoryInput, {
        target: { value: Category.General },
      });

      fireEvent.click(sendButton);
    });
    const toast = await screen.findAllByTestId("toast");
    expect(toast).toHaveLength(1);
  });
});

describe("Contact form show error messages", () => {
  it("Should show 'Required field' error messages when clicking send button if all fields are not valid", async () => {
    render(<ContactUsForm />);
    const sendButton = screen.getByTestId("send.button");
    await userEvent.click(sendButton);
    expect(await screen.findAllByText("Required field")).toHaveLength(4);
  });
});
