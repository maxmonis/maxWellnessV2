import { faker } from "@faker-js/faker"

describe("Account Management", () => {
  it("allows user to register, log in, log out, and reset password", async () => {
    const username = faker.internet.userName()
    const email = `${username}@example.com`
    const password = email

    // create new account
    cy.register({ email, password, username })

    // log out
    cy.get("button")
      .contains(/logout/i)
      .click()

    // log back in with the newly created account
    cy.login({ email, password })

    // log back out
    cy.get("button")
      .contains(/logout/i)
      .click()

    // send the password reset email
    cy.get("a[href*='reset-password']").click()
    cy.intercept("GET", /Firestore\/Listen\/channel/).as("listen")
    cy.get("input[name='email']").type(`${email}{enter}`)
    cy.wait("@listen")

    // navigate back to login
    cy.get("a[href*='login']").click()
  })
})
