import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { IconInnerShadowTop } from "@tabler/icons-react";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect, useSearchParams } from "next/navigation";
import { z } from "zod";

const schema = z
  .object({
    password: z
      .string()
      .min(6)
      .refine((v) => /[A-Z]/.test(v), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((v) => /[a-z]/.test(v), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((v) => /[0-9]/.test(v), {
        message: "Password must contain at least one number.",
      })
      .refine((v) => /[!@#$%^&*]/.test(v), {
        message:
          "Password must include at least one special character (!@#$%^&*).",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

async function setPasswordAction(formData: FormData) {
  "use server";
  const raw = {
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;

    const params = new URLSearchParams();

    if (errors.password?.length) {
      params.set("password", errors.password[0]);
    }

    if (errors.confirmPassword?.length) {
      params.set("confirmPassword", errors.confirmPassword[0]);
    }

    // Redirect back with query params containing errors
    redirect(`/set-password?${params.toString()}`);
  }

  const session = await auth();
  await prisma.user.update({
    where: { email: session?.user.email! },
    data: {
      password: await bcrypt.hash(
        parsed.data.password,
        Number(process.env.SALT)
      ),
    },
  });
  redirect("/dashboard");
}

export default async function Page({
  searchParams,
}: {
  searchParams: { password?: string; confirmPassword?: string };
}) {
  const { password, confirmPassword } = await searchParams;
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <IconInnerShadowTop className="size-4" />
          </div>
          Project Memory.
        </a>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Set a Password</CardTitle>
              <CardDescription>
                Choose a strong password to secure your account.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form action={setPasswordAction}>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      name="password"
                      type="password"
                      placeholder="********"
                      required
                    />
                    {password && (
                      <FieldError errors={[{ message: password }]} />
                    )}
                  </Field>

                  <Field>
                    <FieldLabel>Confirm Password</FieldLabel>
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="********"
                      required
                    />
                    {confirmPassword && (
                      <FieldError errors={[{ message: confirmPassword }]} />
                    )}
                  </Field>

                  <Field>
                    <Button type="submit">Set Password</Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
