"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { useAction } from "next-safe-action/hooks";

import { registerAction } from "@/lib/auth/actions";
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

function renderFieldErrors(errors: unknown[]) {
  if (errors.length === 0) {
    return null;
  }

  return <FieldError>{String(errors[0])}</FieldError>;
}

function RegisterForm() {
  const action = useAction(registerAction, { throwOnNavigation: true });
  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      action.execute(value);
    },
  });

  const actionError = action.result.data?.error;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create your marketplace account.</CardDescription>
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
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  value.trim().length === 0 ? "Enter your name." : undefined,
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    autoComplete="name"
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    value={field.state.value}
                  />
                  {renderFieldErrors(field.state.meta.errors)}
                </Field>
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  value.trim().length === 0 ? "Enter your email." : undefined,
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    autoComplete="email"
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    type="email"
                    value={field.state.value}
                  />
                  {renderFieldErrors(field.state.meta.errors)}
                </Field>
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  value.length < 6
                    ? "Password must be at least 6 characters."
                    : undefined,
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    autoComplete="new-password"
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
            {action.isPending ? "Creating account..." : "Create account"}
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            Already registered?{" "}
            <Link className="text-foreground underline" href="/login">
              Log in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export { RegisterForm };
