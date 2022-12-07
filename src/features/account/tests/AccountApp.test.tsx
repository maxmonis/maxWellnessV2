import { BrowserRouter } from "react-router-dom"

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import AccountApp from "../AccountApp"

const firebaseAuthHook = require("react-firebase-hooks/auth")

jest.mock("react-firebase-hooks/auth", () => {
  return {
    // our default will be a null user
    useAuthState: () => [null],
  }
})

const mockUseNavigate = jest.fn()
jest.mock("react-router-dom", () => {
  const actualReactRouter = jest.requireActual("react-router-dom")
  return {
    ...actualReactRouter,
    useNavigate: () => {
      return (...args: unknown[]) => mockUseNavigate(...args)
    },
  }
})

describe("AccountApp", () => {
  test("allows logged out user to access account routes", () => {
    render(<AccountApp />, { wrapper: BrowserRouter })

    // login is the default route
    screen.getByRole("button", { name: "Login" })

    // navigate to password reset from login
    userEvent.click(screen.getByRole("link", { name: /forgot password/i }))
    screen.getByRole("button", { name: /reset password/i })

    // navigate to register from password reset
    userEvent.click(screen.getByRole("link", { name: /register/i }))
    screen.getByRole("button", { name: "Register" })

    // navigate to login from register
    userEvent.click(screen.getByRole("link", { name: /login/i }))
    screen.getByRole("button", { name: "Login" })

    // navigate to register from login
    userEvent.click(screen.getByRole("link", { name: /register/i }))
    screen.getByRole("button", { name: "Register" })
  })

  test("redirects to the home page if a user is logged in", () => {
    jest.spyOn(firebaseAuthHook, "useAuthState").mockImplementation(() => {
      // simulate that the hook returns a user
      return [{ uid: "someId" }]
    })
    render(<AccountApp />, { wrapper: BrowserRouter })

    // because there's a user we should redirect to the root route
    expect(mockUseNavigate).toHaveBeenCalledTimes(1)
    expect(mockUseNavigate).toHaveBeenCalledWith("/")
  })
})
