"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerWithEmail } from "@/lib/auth-api";
import { getApiErrorMessage } from "@/lib/error-messages";
import { emailRegisterInputSchema } from "@/lib/validators";
import { AuthErrorBanner } from "@/components/auth/AuthErrorBanner";
import { TurnstileChallenge } from "@/components/auth/TurnstileChallenge";
import { useAuthTurnstile } from "@/hooks/use-auth-turnstile";
import type { AuthSession } from "@/types/user";

const formSchema = emailRegisterInputSchema;
type FormValues = z.infer<typeof formSchema>;

interface EmailRegisterFormProps {
  onSuccess: (session: AuthSession) => Promise<void> | void;
}

export function EmailRegisterForm({ onSuccess }: EmailRegisterFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const {
    required: turnstileRequired,
    ready: turnstileReady,
    turnstileField,
    onTurnstileTokenChange,
    turnstileLoadError,
    setTurnstileLoadError,
  } = useAuthTurnstile();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",   // optional — empty string is treated as absent
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    if (turnstileRequired && !turnstileReady) {
      setError("Complete the security check below, then try again.");
      return;
    }
    try {
      setError(null);
      setInfo("Creating account...");
      // Strip empty phone so the backend receives undefined (not an empty string).
      const phone = values.phone?.trim() || undefined;
      const session = await registerWithEmail({ ...values, phone, ...turnstileField });
      await onSuccess(session);
    } catch (err) {
      setInfo(null);
      setError(getApiErrorMessage(err));
    }
  });

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="firstName" className="text-sm font-bold text-brand-maroon">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="h-12 w-full rounded-full border border-border bg-brand-cream px-4 text-sm font-medium text-brand-maroon placeholder:text-muted-foreground focus:border-brand-maroon focus:outline-none focus:ring-1 focus:ring-brand-maroon"
            {...form.register("firstName")}
          />
          <p className="text-xs font-bold text-red-500">
            {form.formState.errors.firstName?.message}
          </p>
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="lastName" className="text-sm font-bold text-brand-maroon">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="h-12 w-full rounded-full border border-border bg-brand-cream px-4 text-sm font-medium text-brand-maroon placeholder:text-muted-foreground focus:border-brand-maroon focus:outline-none focus:ring-1 focus:ring-brand-maroon"
            {...form.register("lastName")}
          />
          <p className="text-xs font-bold text-red-500">
            {form.formState.errors.lastName?.message}
          </p>
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="phone-reg" className="text-sm font-bold text-brand-maroon">
          Phone Number{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          id="phone-reg"
          type="tel"
          autoComplete="tel"
          placeholder="9876543210"
          className="h-12 w-full rounded-full border border-border bg-brand-cream px-4 text-sm font-medium text-brand-maroon placeholder:text-muted-foreground focus:border-brand-maroon focus:outline-none focus:ring-1 focus:ring-brand-maroon"
          {...form.register("phone")}
        />
        <p className="text-xs font-bold text-red-500">{form.formState.errors.phone?.message}</p>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="email-reg" className="text-sm font-bold text-brand-maroon">
          Email
        </label>
        <input
          id="email-reg"
          type="email"
          autoComplete="email"
          className="h-12 w-full rounded-full border border-border bg-brand-cream px-4 text-sm font-medium text-brand-maroon placeholder:text-muted-foreground focus:border-brand-maroon focus:outline-none focus:ring-1 focus:ring-brand-maroon"
          {...form.register("email")}
        />
        <p className="text-xs font-bold text-red-500">{form.formState.errors.email?.message}</p>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="password-reg" className="text-sm font-bold text-brand-maroon">
          Password
        </label>
        <input
          id="password-reg"
          type="password"
          autoComplete="new-password"
          className="h-12 w-full rounded-full border border-border bg-brand-cream px-4 text-sm font-medium text-brand-maroon placeholder:text-muted-foreground focus:border-brand-maroon focus:outline-none focus:ring-1 focus:ring-brand-maroon"
          {...form.register("password")}
        />
        <p className="text-xs font-bold text-red-500">
          {form.formState.errors.password?.message}
        </p>
      </div>

      <TurnstileChallenge
        onTokenChange={onTurnstileTokenChange}
        onLoadError={setTurnstileLoadError}
      />
      {turnstileLoadError ? (
        <p className="text-xs font-bold text-red-500" role="alert">
          {turnstileLoadError}
        </p>
      ) : null}

      {info && !error ? <p className="text-xs font-bold text-brand-green">{info}</p> : null}
      <AuthErrorBanner message={error} />

      <button
        type="submit"
        className="mt-2 h-12 w-full rounded-full bg-brand-maroon px-8 text-sm font-bold text-white transition-transform hover:-translate-y-1 hover:bg-brand-gold hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        disabled={form.formState.isSubmitting || (turnstileRequired && !turnstileReady)}
      >
        {form.formState.isSubmitting ? "Processing..." : "Create account"}
      </button>
    </form>
  );
}
