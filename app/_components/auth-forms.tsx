"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { LogoIcon } from "./icons";
import {
  getFirebaseAuth,
  getFirebaseDb,
  isFirebaseConfigured,
  missingFirebaseEnvKeys,
} from "../_lib/firebase";
import { dictionary, localizedHref, type Locale } from "../_lib/i18n";

type UserRole = "renter" | "owner";

type FormStatus = {
  type: "error" | "success";
  message: string;
};

const defaultMessages = {
  missingConfig:
    "Firebase is not configured yet. Add these keys to .env.local and restart the dev server: ",
  resetNeedsEmail: "Enter your email first.",
  resetSent: "Password reset email sent.",
  loginSuccess: "You are signed in. Redirecting...",
  registerSuccess: "Account created. Redirecting...",
  genericError: "Firebase could not complete that request. Try again.",
  invalidCredential: "Email or password is incorrect.",
  emailInUse: "Email is already registered.",
  weakPassword: "Password should be at least 6 characters.",
  operationNotAllowed: "Enable Email/Password sign-in in Firebase Authentication.",
};

function firebaseMessage(error: unknown) {
  const code =
    typeof error === "object" && error !== null && "code" in error && typeof error.code === "string" ? error.code : "";

  switch (code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return defaultMessages.invalidCredential;
    case "auth/email-already-in-use":
      return defaultMessages.emailInUse;
    case "auth/weak-password":
      return defaultMessages.weakPassword;
    case "auth/operation-not-allowed":
      return defaultMessages.operationNotAllowed;
    default:
      return defaultMessages.genericError;
  }
}

function missingConfigMessage() {
  return `${defaultMessages.missingConfig}${missingFirebaseEnvKeys.join(", ")}.`;
}

function StatusMessage({ status }: { status: FormStatus | null }) {
  if (!status) {
    return null;
  }

  const className =
    status.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-red-200 bg-red-50 text-red-700";

  return <p className={`rounded-[8px] border px-3 py-2 text-sm font-bold ${className}`}>{status.message}</p>;
}

function ConfigWarning() {
  if (isFirebaseConfigured) {
    return null;
  }

  return (
    <p className="rounded-[8px] border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-bold text-amber-800">
      {missingConfigMessage()}
    </p>
  );
}

async function getLoginDestination(uid: string) {
  try {
    const profile = await getDoc(doc(getFirebaseDb(), "users", uid));
    return profile.data()?.role === "owner" ? "/owner/dashboard" : "/fields";
  } catch {
    return "/fields";
  }
}

export function LoginForm({ locale }: { locale: Locale }) {
  const router = useRouter();
  const t = dictionary[locale];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    if (!isFirebaseConfigured) {
      setStatus({ type: "error", message: missingConfigMessage() });
      return;
    }

    setIsSubmitting(true);

    try {
      const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      const destination = await getLoginDestination(credential.user.uid);

      setStatus({ type: "success", message: defaultMessages.loginSuccess });
      router.push(localizedHref(destination, locale));
    } catch (error) {
      setStatus({ type: "error", message: firebaseMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePasswordReset() {
    setStatus(null);

    if (!email) {
      setStatus({ type: "error", message: defaultMessages.resetNeedsEmail });
      return;
    }

    if (!isFirebaseConfigured) {
      setStatus({ type: "error", message: missingConfigMessage() });
      return;
    }

    try {
      await sendPasswordResetEmail(getFirebaseAuth(), email);
      setStatus({ type: "success", message: defaultMessages.resetSent });
    } catch (error) {
      setStatus({ type: "error", message: firebaseMessage(error) });
    }
  }

  return (
    <section className="w-full max-w-md rounded-[8px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <LogoIcon className="mx-auto h-16 w-16 text-emerald-600" />
      <h1 className="mt-4 text-center text-3xl font-black">{t.auth.appName}</h1>
      <p className="mt-1 text-center text-sm font-semibold text-slate-500">{t.auth.tagline}</p>

      <div className="mt-8 grid grid-cols-2 rounded-[8px] bg-slate-100 p-1 text-sm font-black">
        <button className="rounded-[8px] bg-white py-2 text-emerald-700 shadow-sm" type="button">
          {t.nav.login}
        </button>
        <Link href={localizedHref("/register", locale)} className="py-2 text-center text-slate-500">
          {t.nav.register}
        </Link>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <ConfigWarning />
        <StatusMessage status={status} />
        <label className="block text-xs font-bold text-slate-500">
          {t.auth.email}
          <input
            autoComplete="email"
            className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="user@email.com"
            required
            type="email"
            value={email}
          />
        </label>
        <label className="block text-xs font-bold text-slate-500">
          {t.auth.password}
          <input
            autoComplete="current-password"
            className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600"
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t.auth.password}
            required
            type="password"
            value={password}
          />
        </label>
        <div className="flex justify-end">
          <button className="text-xs font-bold text-blue-700" onClick={handlePasswordReset} type="button">
            {t.auth.forgotPassword}
          </button>
        </div>
        <button
          className="block w-full rounded-[8px] bg-emerald-700 py-3 text-center text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Loading..." : t.nav.login}
        </button>
      </form>
    </section>
  );
}

export function RegisterForm({ locale }: { locale: Locale }) {
  const router = useRouter();
  const t = dictionary[locale];
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("renter");
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    if (!isFirebaseConfigured) {
      setStatus({ type: "error", message: missingConfigMessage() });
      return;
    }

    setIsSubmitting(true);

    try {
      const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);

      if (fullName) {
        await updateProfile(credential.user, { displayName: fullName });
      }

      try {
        await setDoc(doc(getFirebaseDb(), "users", credential.user.uid), {
          createdAt: serverTimestamp(),
          displayName: fullName,
          email,
          role,
        });
      } catch (profileError) {
        console.warn("Firebase Auth account was created, but the Firestore profile was not saved.", profileError);
      }

      setStatus({ type: "success", message: defaultMessages.registerSuccess });
      router.push(localizedHref(role === "owner" ? "/owner/dashboard" : "/fields", locale));
    } catch (error) {
      setStatus({ type: "error", message: firebaseMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full max-w-md rounded-[8px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <LogoIcon className="mx-auto h-16 w-16 text-emerald-600" />
      <h1 className="mt-4 text-center text-3xl font-black">{t.auth.createAccount}</h1>
      <p className="mt-1 text-center text-sm font-semibold text-slate-500">{t.auth.chooseAccess}</p>

      <div className="mt-8 grid grid-cols-2 rounded-[8px] bg-slate-100 p-1 text-sm font-black">
        <Link href={localizedHref("/login", locale)} className="py-2 text-center text-slate-500">
          {t.nav.login}
        </Link>
        <button className="rounded-[8px] bg-white py-2 text-emerald-700 shadow-sm" type="button">
          {t.nav.register}
        </button>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <ConfigWarning />
        <StatusMessage status={status} />
        <label className="block text-xs font-bold text-slate-500">
          {t.auth.fullName}
          <input
            autoComplete="name"
            className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600"
            onChange={(event) => setFullName(event.target.value)}
            placeholder={locale === "ar" ? "سارة أحمد" : "Sara Ahmad"}
            required
            value={fullName}
          />
        </label>
        <label className="block text-xs font-bold text-slate-500">
          {t.auth.email}
          <input
            autoComplete="email"
            className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="user@email.com"
            required
            type="email"
            value={email}
          />
        </label>
        <label className="block text-xs font-bold text-slate-500">
          {t.auth.password}
          <input
            autoComplete="new-password"
            className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600"
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t.auth.password}
            required
            type="password"
            value={password}
          />
        </label>
        <label className="block text-xs font-bold text-slate-500">
          {t.auth.accountType}
          <select
            className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600"
            onChange={(event) => setRole(event.target.value as UserRole)}
            value={role}
          >
            <option value="renter">{t.auth.renter}</option>
            <option value="owner">{t.auth.owner}</option>
          </select>
        </label>
        <button
          className="block w-full rounded-[8px] bg-emerald-700 py-3 text-center text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Loading..." : t.auth.createAccount}
        </button>
      </form>
    </section>
  );
}
