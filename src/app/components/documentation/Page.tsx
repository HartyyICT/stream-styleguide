"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import DocumentationLayout from "@/app/components/DocumentationLayout";
import OnThisPage, {
  type OnThisPageItem,
} from "@/app/components/OnThisPage";

interface PageProps {
  pageId: string;
  sections: readonly OnThisPageItem[];
  children: ReactNode;
  maxWidth?: number;
}

export default function Page({
  pageId,
  sections,
  children,
  maxWidth = 920,
}: PageProps) {
  return (
    <DocumentationLayout>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 1fr) 220px" },
          gap: { xs: 4, xl: 8 },
          alignItems: "start",
        }}
      >
        <Box component="article" id={pageId} sx={{ maxWidth }}>
          {children}
        </Box>
        <OnThisPage items={[...sections]} />
      </Box>
    </DocumentationLayout>
  );
}
