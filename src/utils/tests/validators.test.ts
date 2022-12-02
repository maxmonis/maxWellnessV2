import { hasChars, hasMessage, isEmail } from "../validators"

describe("isEmail", () => {
  test("returns true for emails", () => {
    expect(isEmail("a@b.c")).toBe(true)
  })

  test("returns false for non-emails", () => {
    expect(isEmail("a@b")).toBe(false)
    expect(isEmail("a@.c")).toBe(false)
    expect(isEmail("@b.c")).toBe(false)
    expect(isEmail("email: a@b.c")).toBe(false)
  })
})

describe("hasMessage", () => {
  test("returns true for errors with messages", () => {
    expect(hasMessage(Error("error"))).toBe(true)
    expect(hasMessage({ message: "error" })).toBe(true)
  })

  test("returns false for errors without messages", () => {
    expect(hasMessage(Error())).toBe(false)
    expect(hasMessage(Error(""))).toBe(false)
    expect(hasMessage({ message: "" })).toBe(false)
    expect(hasMessage({ message: null })).toBe(false)
  })

  test("returns false for nullish values", () => {
    expect(hasMessage(null)).toBe(false)
    expect(hasMessage(undefined)).toBe(false)
  })
})

describe("hasChars", () => {
  test("returns true for non-empty strings", () => {
    expect(hasChars("string")).toBe(true)
  })

  test("returns false for empty strings", () => {
    expect(hasChars("")).toBe(false)
  })

  test("returns false for strings with only spaces", () => {
    expect(hasChars("   ")).toBe(false)
  })

  test("returns true if trimmed length reaches or exceeds minimum", () => {
    expect(hasChars("abcd", 4)).toBe(true)
    expect(hasChars("abcde", 4)).toBe(true)
    expect(hasChars(" a b c ", 4)).toBe(true)
  })

  test("returns false if trimmed length is below minimum", () => {
    expect(hasChars("abc", 4)).toBe(false)
    expect(hasChars(" abc ", 4)).toBe(false)
  })
})
