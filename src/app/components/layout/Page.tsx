"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import DocumentationLayout from "@/app/components/layout/DocumentationLayout";
import OnThisPage, {
  type OnThisPageItem,
} from "@/app/components/patterns/OnThisPage";
import { responsiveLayout } from "@/app/theme/tokens";

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
  maxWidth = responsiveLayout.contentMaxWidth,
}: PageProps) {
  return (
    <DocumentationLayout>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            xl: `minmax(0, 1fr) ${responsiveLayout.onThisPageWidth}px`,
          },
          gap: {
            xs: responsiveLayout.sectionGap.mobile,
            xl: responsiveLayout.sectionGap.desktop,
          },
          alignItems: "start",
          minWidth: 0,
        }}
      >
        <Box
          component="article"
          id={pageId}
          sx={{ maxWidth, scrollMarginTop: 96 }}
        >
          {children}
        </Box>
        <OnThisPage items={sections} />
      </Box>
    </DocumentationLayout>
  );
}
