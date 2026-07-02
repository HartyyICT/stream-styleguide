"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import DocumentationLayout from "@/app/components/layout/DocumentationLayout";
import OnThisPage, {
  type OnThisPageItem,
} from "@/app/components/patterns/OnThisPage";
import { pageLayoutTokens } from "@ssw/ui-library";

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
  maxWidth = pageLayoutTokens.contentMaxWidth,
}: PageProps) {
  return (
    <DocumentationLayout>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: pageLayoutTokens.contentGridColumns.mobile,
            xl: pageLayoutTokens.contentGridColumns.desktop,
          },
          gap: {
            xs: pageLayoutTokens.contentGap.mobile,
            xl: pageLayoutTokens.contentGap.desktop,
          },
          alignItems: "start",
          minWidth: 0,
        }}
      >
        <Box
          component="article"
          id={pageId}
          sx={{ maxWidth, scrollMarginTop: pageLayoutTokens.articleScrollMarginTop }}
        >
          {children}
        </Box>
        <OnThisPage items={sections} />
      </Box>
    </DocumentationLayout>
  );
}
