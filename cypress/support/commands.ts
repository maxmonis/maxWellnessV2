declare global {
  namespace Cypress {
    interface Chainable {
      login: typeof login
      register: typeof register
    }
  }
}

export function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  cy.visit("/")
  cy.get("input[name='email']").type(email)
  cy.intercept("GET", /Firestore\/Listen\/channel/).as("listen")
  cy.get("input[name='password']").type(`${password}{enter}`)
  cy.wait("@listen")
}

export function register({
  email,
  password,
  username,
}: {
  email: string
  password: string
  username: string
}) {
  cy.visit("/")
  cy.get("a[href*='register']").click()
  cy.get("input[name='username']").type(username)
  cy.get("input[name='email']").type(email)
  cy.intercept("GET", /Firestore\/Listen\/channel/).as("listen")
  cy.get("input[name='password']").type(`${password}{enter}`)
  cy.wait("@listen")
}

Cypress.Commands.add("login", login)
Cypress.Commands.add("register", register)
