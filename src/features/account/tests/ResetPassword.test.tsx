import { BrowserRouter } from "react-router-dom"

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import ResetPassword from "../ResetPassword"

const firebaseAuth = require("firebase/auth")

const email = "john@example.com"
const invalidEmail = "notAnEmail"
const errorMessage = "Mock error message"

const mockSendPasswordResetEmail = jest.fn()

jest.mock("firebase/app", () => {
  return {
    initializeApp: jest.fn(),
  }
})

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn(),
    sendPasswordResetEmail: (...args: unknown[]) => {
      mockSendPasswordResetEmail(...args)
    },
  }
})

jest.mock("firebase/firestore", () => {
  return {
    getFirestore: jest.fn(),
  }
})

describe("ResetPassword", () => {
  test("prevents submission and shows error if email is invalid", () => {
    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>,
    )
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveDisplayValue("")
    expect(emailInput).toBeValid()

    // required email error displayed when user submits
    userEvent.type(emailInput, "{enter}")
    expect(emailInput).toBeInvalid()
    screen.getByText(/email is required/i)

    // type a value which is not an email
    userEvent.type(emailInput, invalidEmail)

    // error cleared because input changed
    expect(emailInput).toBeValid()
    expect(screen.queryByText(/email is required/i)).toBeNull()

    // invalid email error displayed when user submits
    userEvent.type(emailInput, "{enter}")
    expect(emailInput).toBeInvalid()
    screen.getByText(/invalid email/i)

    // neither attempted submit was successful
    expect(mockSendPasswordResetEmail).not.toHaveBeenCalled()
  })

  test("sends password reset email and shows confirmation if email is valid", async () => {
    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>,
    )
    const submitButton = screen.getByRole("button", {
      name: /reset password/i,
    })
    const emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, email)
    userEvent.click(submitButton)

    // button disabled while submitting
    expect(submitButton).toBeDisabled()
    // hit enter to ensure only one submit happens
    userEvent.type(emailInput, "{enter}")

    // confirmation message displayed instead of form
    await screen.findByRole("heading", { name: /email sent/i })
    expect(screen.queryByLabelText(/email/i)).toBeNull()

    // no duplicate call happened
    expect(mockSendPasswordResetEmail).toHaveBeenCalledTimes(1)
    // email sent to correct address
    expect(mockSendPasswordResetEmail).toHaveBeenCalledWith(undefined, email)
  })

  test("shows error if one occurs", async () => {
    jest
      .spyOn(firebaseAuth, "sendPasswordResetEmail")
      .mockImplementation(() => {
        throw Error(errorMessage)
      })

    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>,
    )
    userEvent.type(screen.getByLabelText(/email/i), `${email}{enter}`)

    // error message displayed in alert
    await screen.findByRole("alert")
    screen.getByText(errorMessage)

    // user can hide alert
    userEvent.click(screen.getByRole("button", { name: /close/i }))
    expect(screen.queryByRole("alert")).toBeNull()

    // form still displayed instead of confirmation message
    screen.getByLabelText(/email/i)
    expect(screen.queryByRole("heading", { name: /email sent/i })).toBeNull()
  })
})
