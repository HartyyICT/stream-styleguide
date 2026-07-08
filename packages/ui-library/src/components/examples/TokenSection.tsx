"use client";

import type { ReactNode } from "react";
import Section from "@/app/components/layout/Section";
import TokenTable, {
  type TokenTableRow,
} from "@/app/components/molecules/TokenTable";

interface TokenSectionProps {
  id: string;
  title: string;
  description: string;
  headers: readonly string[];
  rows: readonly TokenTableRow[];
  children?: ReactNode;
}

export default function TokenSection({
  id,
  title,
  description,
  headers,
  rows,
  children,
}: TokenSectionProps) {
  return (
    <Section id={id} title={title} description={description}>
      <TokenTable headers={headers} rows={rows} />
      {children}
    </Section>
  );
}
