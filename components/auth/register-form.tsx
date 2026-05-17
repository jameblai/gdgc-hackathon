"use client";

import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useAction } from "next-safe-action/hooks";

import { registerAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TagsInput } from "@/components/ui/tags-input";
import { registerSchema } from "@/lib/auth/schema";

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

function validateWithSchema(schema: {
  safeParse: (
    value: unknown,
  ) =>
    | { success: true }
    | { error: { issues: Array<{ message: string }> }; success: false };
}) {
  return ({ value }: { value: unknown }) => {
    const result = schema.safeParse(value);

    if (result.success) {
      return undefined;
    }

    return result.error.issues[0]?.message;
  };
}

type RegisterFormValues = {
  company: string;
  dateOfBirth: Date | undefined;
  domains: string[];
  name: string;
  occupation: string;
  password: string;
  username: string;
};

function DateOfBirthPicker({
  date,
  id,
  onBlur,
  onChange,
}: {
  date: Date | undefined;
  id: string;
  onBlur: () => void;
  onChange: (date: Date) => void;
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const startMonth = new Date(1900, 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            className="text-muted-foreground data-[has-value=true]:text-foreground w-full justify-start font-normal"
            data-has-value={Boolean(date)}
            id={id}
            onBlur={onBlur}
            type="button"
            variant="outline"
          />
        }
      >
        <CalendarIcon className="size-4" />
        {date ? format(date, "PPP") : "Select date"}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto overflow-hidden p-0">
        <Calendar
          captionLayout="dropdown"
          defaultMonth={date ?? new Date(2000, 0)}
          disabled={{ after: today }}
          endMonth={today}
          mode="single"
          onSelect={(selectedDate) => {
            if (selectedDate) {
              onChange(selectedDate);
              setOpen(false);
            }
          }}
          selected={date}
          startMonth={startMonth}
        />
      </PopoverContent>
    </Popover>
  );
}

function RegisterForm() {
  const action = useAction(registerAction);
  const defaultValues: RegisterFormValues = {
    username: "",
    name: "",
    password: "",
    dateOfBirth: undefined,
    domains: [],
    occupation: "",
    company: "",
  };
  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      if (!value.dateOfBirth) {
        return;
      }

      action.execute({
        company: value.company,
        dateOfBirth: value.dateOfBirth,
        domains: value.domains,
        name: value.name,
        occupation: value.occupation,
        password: value.password,
        username: value.username,
      });
    },
  });

  const actionError = action.result.data?.error;

  return (
    <Card className="w-full max-w-md">
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
              name="username"
              validators={{
                onChange: validateWithSchema(registerSchema.shape.username),
                onSubmit: validateWithSchema(registerSchema.shape.username),
              }}
            >
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

            <form.Field
              name="name"
              validators={{
                onChange: validateWithSchema(registerSchema.shape.name),
                onSubmit: validateWithSchema(registerSchema.shape.name),
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
              name="password"
              validators={{
                onChange: validateWithSchema(registerSchema.shape.password),
                onSubmit: validateWithSchema(registerSchema.shape.password),
              }}
            >
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

            <form.Field
              name="dateOfBirth"
              validators={{
                onChange: validateWithSchema(registerSchema.shape.dateOfBirth),
                onSubmit: validateWithSchema(registerSchema.shape.dateOfBirth),
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Date of birth</FieldLabel>
                  <DateOfBirthPicker
                    date={field.state.value}
                    id={field.name}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                  />
                  {renderFieldErrors(field.state.meta.errors)}
                </Field>
              )}
            </form.Field>

            <form.Field
              name="domains"
              validators={{
                onChange: validateWithSchema(registerSchema.shape.domains),
                onSubmit: validateWithSchema(registerSchema.shape.domains),
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Domains</FieldLabel>
                  <TagsInput
                    id={field.name}
                    onBlur={field.handleBlur}
                    onValueChange={field.handleChange}
                    placeholder="Add a domain"
                    value={field.state.value}
                  />
                  <FieldDescription>
                    Press Enter or comma after each domain.
                  </FieldDescription>
                  {renderFieldErrors(field.state.meta.errors)}
                </Field>
              )}
            </form.Field>

            <form.Field
              name="occupation"
              validators={{
                onChange: validateWithSchema(registerSchema.shape.occupation),
                onSubmit: validateWithSchema(registerSchema.shape.occupation),
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Occupation</FieldLabel>
                  <Input
                    autoComplete="organization-title"
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
              name="company"
              validators={{
                onChange: validateWithSchema(registerSchema.shape.company),
                onSubmit: validateWithSchema(registerSchema.shape.company),
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Company</FieldLabel>
                  <Input
                    autoComplete="organization"
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
          </FieldGroup>

          {actionError ? <FieldError>{actionError}</FieldError> : null}

          <Button className="w-full" disabled={action.isPending} type="submit">
            {action.isPending ? "Creating account..." : "Create account"}
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            Already registered?{" "}
            <Link className="text-foreground underline" href="/features/login">
              Log in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export { RegisterForm };
