"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { useAction } from "next-safe-action/hooks";

import { loginAction } from "@/lib/auth/actions";
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
import { loginSchema } from "@/lib/auth/schema";

function renderFieldErrors(errors: unknown[]) {
  if (errors.length === 0) {
    return null;
  }

  const [error] = errors;

  if (typeof error === "object" && error && "message" in error) {
    return <FieldError>{String(error.message)}</FieldError>;
  }

  return <FieldError>{String(error)}</FieldError>;
}

function LoginForm() {
  const action = useAction(loginAction);
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      action.execute(value);
    },
    validators: {
      onChange: loginSchema,
    },
  });

  const actionError = action.result.data?.error;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardDescription>Access your marketplace account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-4">
            <form.Field name="username">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    type="text"
                    value={field.state.value}
                  />
                  {renderFieldErrors(field.state.meta.errors)}
                </Field>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    type="password"
                    value={field.state.value}
                  />
                  {renderFieldErrors(field.state.meta.errors)}
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          {actionError ? <FieldError>{actionError}</FieldError> : null}

          <Button className="w-full" disabled={action.isPending} type="submit">
            {action.isPending ? "Logging in..." : "Log in"}
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            Need an account?{" "}
            <Link
              className="text-foreground underline"
              href="/features/register"
            >
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export { LoginForm };
