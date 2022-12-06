import { BrowserRouter } from "react-router-dom"

import { faker } from "@faker-js/faker"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Register from "../Register"

const firebaseAuth = require("firebase/auth")

const username = faker.internet.userName()
const email = faker.internet.email()
const invalidEmail = faker.lorem.word(5)
const password = faker.lorem.word(6)
const invalidPassword = faker.lorem.word(5)
const errorMessage = faker.lorem.sentence(5)
const errorMessage2 = faker.lorem.sentence(4)

const mockCreateUserWithEmailAndPassword = jest.fn()
const mockSignInWithPopup = jest.fn()

jest.mock("firebase/app", () => {
  return {
    initializeApp: jest.fn(),
  }
})

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn(),
    createUserWithEmailAndPassword: (...args: unknown[]) => {
      mockCreateUserWithEmailAndPassword(...args)
    },
    signInWithPopup: (...args: unknown[]) => {
      mockSignInWithPopup(...args)
    },
  }
})

jest.mock("firebase/firestore", () => {
  return {
    getFirestore: jest.fn(),
  }
})

const component = (
  <BrowserRouter>
    <Register />
  </BrowserRouter>
)

describe("Register", () => {
  test("prevents submission and shows error if credentials are invalid", () => {
    render(component)
    const usernameInput = screen.getByLabelText(/username/i)
    expect(usernameInput).toHaveFocus()
    expect(usernameInput).toHaveDisplayValue("")
    expect(usernameInput).toBeValid()
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveDisplayValue("")
    expect(emailInput).toBeValid()
    const passwordInput = screen.getByLabelText("Password")
    expect(passwordInput).toHaveDisplayValue("")
    expect(passwordInput).toBeValid()

    // required errors displayed when user submits
    userEvent.keyboard("{enter}")
    expect(usernameInput).toBeInvalid()
    screen.getByText(/username is required/i)
    expect(emailInput).toBeInvalid()
    screen.getByText(/email is required/i)
    expect(passwordInput).toBeInvalid()
    screen.getByText(/password is required/i)

    // type a value which is not an email
    userEvent.type(emailInput, invalidEmail)

    // errors cleared because input changed
    expect(usernameInput).toBeValid()
    expect(screen.queryByText(/username is required/i)).toBeNull()
    expect(emailInput).toBeValid()
    expect(screen.queryByText(/email is required/i)).toBeNull()
    expect(passwordInput).toBeValid()
    expect(screen.queryByText(/password is required/i)).toBeNull()

    // invalid email error displayed when user submits
    userEvent.keyboard("{enter}")
    expect(emailInput).toBeInvalid()
    screen.getByText(/invalid email/i)

    // test password minimum length validation
    userEvent.type(passwordInput, `${invalidPassword}{enter}`)
    expect(passwordInput).toBeInvalid()
    screen.getByText(/minimum password length is 6/i)

    // none of the attempted submits were successful
    expect(mockCreateUserWithEmailAndPassword).not.toHaveBeenCalled()
    expect(mockSignInWithPopup).not.toHaveBeenCalled()
  })

  test("logs user in if credentials are valid", async () => {
    render(component)
    const submitButton = screen.getByRole("button", {
      name: "Register",
    })
    userEvent.type(screen.getByLabelText(/username/i), username)
    userEvent.type(screen.getByLabelText(/email/i), email)
    userEvent.type(screen.getByLabelText("Password"), password)
    userEvent.click(submitButton)

    // buttons disabled while submitting
    expect(submitButton).toBeDisabled()
    expect(
      screen.getByRole("button", {
        name: /register with google/i,
      }),
    ).toBeDisabled()
    // hit enter to ensure no extra request is fired
    userEvent.keyboard("{enter}")

    await waitFor(() => {
      expect(submitButton).toBeEnabled()
    })

    // no unexpected call happened
    expect(mockSignInWithPopup).not.toHaveBeenCalled()
    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledTimes(1)
    // correct credentials passed to method
    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      email,
      password,
    )
  })

  test("opens popup to log user in using google", async () => {
    render(component)
    const googleButton = screen.getByRole("button", {
      name: /register with google/i,
    })
    userEvent.click(googleButton)

    // type valid credentials to facilitate loading state test
    userEvent.type(screen.getByLabelText(/username/i), username)
    userEvent.type(screen.getByLabelText(/email/i), email)
    userEvent.type(screen.getByLabelText("Password"), password)

    // buttons disabled while submitting
    expect(googleButton).toBeDisabled()
    expect(screen.getByRole("button", { name: "Register" })).toBeDisabled()
    // hit enter to ensure no extra request is fired
    userEvent.keyboard("{enter}")

    await waitFor(() => {
      expect(googleButton).toBeEnabled()
    })

    // no unexpected call happened
    expect(mockCreateUserWithEmailAndPassword).not.toHaveBeenCalled()
    expect(mockSignInWithPopup).toHaveBeenCalledTimes(1)
  })

  test("shows error if one occurs", async () => {
    jest
      .spyOn(firebaseAuth, "createUserWithEmailAndPassword")
      .mockImplementation(() => {
        throw Error(errorMessage)
      })

    jest.spyOn(firebaseAuth, "signInWithPopup").mockImplementation(() => {
      throw Error(errorMessage2)
    })

    render(component)
    userEvent.type(screen.getByLabelText(/username/i), username)
    userEvent.type(screen.getByLabelText(/email/i), email)
    userEvent.type(screen.getByLabelText("Password"), `${password}{enter}`)

    // error message displayed in alert
    await screen.findByRole("alert")
    screen.getByText(errorMessage)

    // test Google error handling
    userEvent.click(
      screen.getByRole("button", { name: /register with google/i }),
    )
    await screen.findByText(errorMessage2)

    // user can hide alert
    userEvent.click(screen.getByRole("button", { name: /close/i }))
    expect(screen.queryByRole("alert")).toBeNull()
  })
})
