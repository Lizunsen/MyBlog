"use client";

import { useMemo, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { Check, Copy } from "lucide-react";

type CodeProps = {
  className?: string;
  children?: ReactNode;
};

type PreProps = {
  children?: ReactNode;
};

export function CodeBlock({ children }: PreProps) {
  const [copied, setCopied] = useState(false);

  const codeChild = children as ReactElement<CodeProps>;
  const className = codeChild?.props?.className ?? "";
  const language = className.replace("language-", "") || "text";

  const codeText = useMemo(() => {
    const text = codeChild?.props?.children;
    if (Array.isArray(text)) {
      return text.join("");
    }
    return typeof text === "string" ? text : "";
  }, [codeChild]);

  async function handleCopy() {
    if (!codeText) {
      return;
    }
    await navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="code-shell not-prose">
      <div className="code-shell__toolbar">
        <span className="code-shell__lang">{language}</span>
        <button className="code-shell__copy" onClick={handleCopy} type="button">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>{children}</pre>
    </div>
  );
}
