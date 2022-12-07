import { faker } from "@faker-js/faker"

export const email = faker.internet.email()
export const errorMessage = faker.lorem.sentence(5)
export const errorMessage2 = faker.lorem.sentence(4)
export const invalidEmail = faker.lorem.word(5)
export const invalidPassword = faker.lorem.word(5)
export const password = faker.lorem.word(6)
export const username = faker.internet.userName()
