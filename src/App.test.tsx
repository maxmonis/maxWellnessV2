import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders page title", () => {
  render(<App />)
  screen.getByRole("heading", { name: /maxWellness/ })
})
