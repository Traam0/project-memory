import zod from "zod"

export const CredentialsValidator = zod.object({
    email: zod.string().email(),
    password: zod.string().regex(new RegExp(/^(?=.*[A-Z])(?=.*\d).{6,}$/g)),
})

export type Credentials = zod.infer<typeof CredentialsValidator>
