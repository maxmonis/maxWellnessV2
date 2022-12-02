import { extractErrorMessage } from "../parsers"

describe("extractErrorMessage", () => {
  test("returns error if error is string", () => {
    expect(extractErrorMessage("error")).toBe("error")
  })

  test("returns message if error has valid message", () => {
    expect(extractErrorMessage(Error("error"))).toBe("error")
  })

  test("returns default message if no message can be extracted", () => {
    expect(extractErrorMessage(null)).toBe("An unexpected error occurred")
  })
})
