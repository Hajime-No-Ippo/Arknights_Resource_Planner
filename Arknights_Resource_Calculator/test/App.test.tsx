import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../src/App";

const setMockFetch = (value: { ok: boolean; json?: () => Promise<unknown>; text?: () => Promise<string> }) => {
    (global as any).fetch = jest.fn().mockResolvedValue(value);
    return global.fetch as jest.Mock;
};

describe("Calculator UI", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("renders inputs and shows result from API", async () => {
        setMockFetch({
            ok: true,
            json: async () => ({ result: 42 }),
        });

        render(<App />);
        fireEvent.change(screen.getByLabelText(/Orundum/i), { target: { value: "600" } });
        fireEvent.change(screen.getByLabelText(/Gacha/i), { target: { value: "1" } });
        fireEvent.change(screen.getByLabelText(/Ten-times Employment/i), { target: { value: "2" } });
        fireEvent.change(screen.getByLabelText(/Single Employment/i), { target: { value: "3" } });

        fireEvent.click(screen.getByRole("button", { name: /Calculate/i }));

        await waitFor(() => expect(screen.getByText(/Result:/i)).toBeInTheDocument());
        expect(screen.getByText(/42/)).toBeInTheDocument();
    });

    it("shows an error message on failed fetch", async () => {
        setMockFetch({
            ok: false,
            text: async () => '{"error":"Invalid request"}',
        });

        render(<App />);
        fireEvent.click(screen.getByRole("button", { name: /Calculate/i }));

        await waitFor(() => expect(screen.getByText(/Request failed/i)).toBeInTheDocument());
    });
});