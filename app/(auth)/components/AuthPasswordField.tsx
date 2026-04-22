"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

import {
  authInputClassName,
  authInputIconWrapClassName,
  authPasswordToggleButtonClassName,
} from "@/app/(auth)/auth-tokens";
import { cn } from "@/lib/ui/cn";

type Props = Omit<React.ComponentProps<"input">, "type" | "className"> & {
  inputClassName?: string;
  /** Leading icon (e.g. `<Lock className="h-4 w-4" strokeWidth={2} />`) */
  icon?: React.ReactNode;
  className?: string;
};

export const AuthPasswordField = forwardRef<HTMLInputElement, Props>(
  function AuthPasswordField({ inputClassName, className, icon, ...rest }, ref) {
    const [show, setShow] = useState(false);

    return (
      <div className={cn("group relative w-full", className)}>
        {icon ? <span className={authInputIconWrapClassName}>{icon}</span> : null}
        <input
          ref={ref}
          type={show ? "text" : "password"}
          className={cn(
            authInputClassName({
              withLeadingIcon: !!icon,
              withPasswordToggle: true,
            }),
            inputClassName,
          )}
          {...rest}
        />
        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          className={authPasswordToggleButtonClassName}
          onClick={() => setShow((s) => !s)}
        >
          {show ? (
            <EyeOff className="h-4 w-4" strokeWidth={2} aria-hidden />
          ) : (
            <Eye className="h-4 w-4" strokeWidth={2} aria-hidden />
          )}
        </button>
      </div>
    );
  },
);
