"use client";

import { Box, Typography } from "@mui/material";
import { PackageCheck, PackagePlus, Terminal, Wrench } from "lucide-react";
import { Button } from "@ssw/ui-library";
import { Card } from "@ssw/ui-library";
import { InfoBanner } from "@ssw/ui-library";
import {
  CodeBlock,
  CodeExample,
  GuidelineList,
  Intro,
  Section,
} from "@/app/components/documentation";
import Page from "@/app/components/layout/Page";
import { useSemanticColors } from "@ssw/ui-library";
import { radius, spacing } from "@ssw/ui-library";

const sections = [
  { label: "Overview", href: "#installation" },
  { label: "Install package", href: "#install-package" },
  { label: "Peer dependencies", href: "#peer-dependencies" },
  { label: "Use components", href: "#use-components" },
  { label: "Development setup", href: "#development-setup" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
] as const;

const guidelines = [
  "Install the shared UI library instead of copying components from the styleguide app.",
  "Import product components from @ssw/ui-library after it is published internally.",
  "Keep tokens, theme configuration and reusable components inside the package.",
  "Keep documentation helpers and preview-only examples inside the styleguide app.",
  "When a component changes, update the package first and then update this styleguide to use the package version.",
] as const;

const setupSteps = [
  {
    title: "1. Install the package",
    description:
      "Applications add @ssw/ui-library alongside their compatible React and MUI versions.",
    icon: PackagePlus,
  },
  {
    title: "2. Apply the theme",
    description:
      "The shared theme and tokens remain the visual source of truth for every component.",
    icon: PackageCheck,
  },
  {
    title: "3. Import product UI",
    description:
      "Applications import stable product components from one public package entry point.",
    icon: Terminal,
  },
  {
    title: "4. Keep examples local",
    description:
      "The styleguide reuses local documentation helpers while its previews render real package components.",
    icon: Wrench,
  },
] as const;

export default function InstallationPage() {
  const {
    secondaryText,
    accent,
    selectedBackground,
  } = useSemanticColors();

  return (
    <Page pageId="installation" sections={sections}>
      <Intro
        title="Installation"
        description="This page explains how Stream Software teams will install and use the shared UI library. The goal is that applications use one package instead of copying components from the styleguide."
      />

      <Section
        id="install-package"
        title="Install package"
        description="Once the package is available internally, Stream applications can install it with the package manager used in the project."
        divider={false}
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            npm
          </Typography>
          <CodeBlock>{`npm install @ssw/ui-library`}</CodeBlock>
        </Card>
      </Section>

      <Section
        id="peer-dependencies"
        title="Peer dependencies"
        description="The UI library is built on top of React and MUI, so consuming apps need compatible versions installed."
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Required foundation
          </Typography>
          <CodeBlock>{`npm install react react-dom @mui/material @emotion/react @emotion/styled lucide-react`}</CodeBlock>
          <Typography
            variant="body2"
            sx={{ mt: 2, color: secondaryText, lineHeight: 1.7 }}
          >
            React 19 and MUI 7.3.7 through 9.x are supported peer versions. The
            package keeps using the shared Stream theme and tokens in every
            compatible application.
          </Typography>
        </Card>
      </Section>

      <Section
        id="use-components"
        title="Use components"
        description="After installation, developers import components from @ssw/ui-library instead of local styleguide files."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          <Card>
            <Typography variant="h3" sx={{ mb: 1.5 }}>
              Import
            </Typography>
            <CodeBlock>{`import { Button } from "@ssw/ui-library";
import { Check } from "lucide-react";`}</CodeBlock>
          </Card>

          <Card>
            <Typography variant="h3" sx={{ mb: 1.5 }}>
              Render
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Button startIcon={<PackageCheck />}>Install library</Button>
            </Box>
            <CodeBlock>{`<Button startIcon={<Check />}>
  Save changes
</Button>`}</CodeBlock>
          </Card>
        </Box>
      </Section>

      <Section
        id="development-setup"
        title="Development setup"
        description="The current project can grow toward this package setup in small, safe steps."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          {setupSteps.map(({ title, description, icon: Icon }) => (
            <Card key={title}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  display: "grid",
                  placeItems: "center",
                  mb: spacing.md,
                  color: accent,
                  backgroundColor: selectedBackground,
                  borderRadius: radius.medium,
                }}
              >
                <Icon size={21} />
              </Box>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: secondaryText, lineHeight: 1.7 }}
              >
                {description}
              </Typography>
            </Card>
          ))}
        </Box>

        <InfoBanner title="Important distinction" sx={{ mt: 2 }}>
          The styleguide documents the system. The UI library provides the
          reusable product code. Documentation components and preview-only
          examples stay local to the styleguide.
        </InfoBanner>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Copy the import pattern developers should use once the shared package is available."
      >
        <CodeExample
          title="Install and use a package component"
          preview={<Button startIcon={<PackageCheck />}>Install library</Button>}
          code={`import { Button } from "@ssw/ui-library";
import { Check } from "lucide-react";

export function SaveAction() {
  return (
    <Button startIcon={<Check />}>
      Save changes
    </Button>
  );
}`}
        />
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="These rules keep installation and usage predictable for Stream teams."
        last
      >
        <GuidelineList items={guidelines} />
      </Section>
    </Page>
  );
}
