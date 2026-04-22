"use client";

import { forwardRef } from "react";

import { authInputClassName, authInputIconWrapClassName } from "@/app/(auth)/auth-tokens";
import { cn } from "@/lib/ui/cn";

export type AuthInputFieldProps = Omit<React.ComponentProps<"input">, "className"> & {
  /** Extra classes on the `<input>` */
  inputClassName?: string;
  /** Optional leading icon (e.g. Lucide icon 16px) */
  icon?: React.ReactNode;
  /** Wrapper class */
  className?: string;
};

export const AuthInputField = forwardRef<HTMLInputElement, AuthInputFieldProps>(
  function AuthInputField({ icon, inputClassName, className, ...rest }, ref) {
    return (
      <div className={cn("group relative w-full", className)}>
        {icon ? <span className={authInputIconWrapClassName}>{icon}</span> : null}
        <input
          ref={ref}
          className={cn(authInputClassName({ withLeadingIcon: !!icon }), inputClassName)}
          {...rest}
        />
      </div>
    );
  },
);
