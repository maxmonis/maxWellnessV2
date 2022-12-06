import { rest } from "msw"

import { mockDelay } from "../utils"

export const authHandlers = [
  // send password reset email
  rest.post(/accounts:sendOobCode/, async (req, res, ctx) => {
    const { email }: { email: string } = await req.json()
    return res(
      ctx.json({
        email,
        kind: "identitytoolkit#GetOobConfirmationCodeResponse",
      }),
      ctx.delay(mockDelay()),
    )
  }),
]
