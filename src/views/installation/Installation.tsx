"use client";

import { Box, Typography } from "@mui/material";
import { PackageCheck, PackagePlus, Terminal, Wrench } from "lucide-react";
import Button from "@/app/components/documentation/Button";
import Card from "@/app/components/documentation/Card";
import CodeBlock from "@/app/components/documentation/CodeBlock";
import GuidelineList from "@/app/components/documentation/GuidelineList";
import Intro from "@/app/components/documentation/Intro";
import Page from "@/app/components/documentation/Page";
import Section from "@/app/components/documentation/Section";
import { useDocumentationStyles } from "@/app/components/documentation/useDocumentationStyles";
import { borderWidths, radius, spacing } from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#installation" },
  { label: "Install package", href: "#install-package" },
  { label: "Peer dependencies", href: "#peer-dependencies" },
  { label: "Use components", href: "#use-components" },
  { label: "Development setup", href: "#development-setup" },
  { label: "Guidelines", href: "#guidelines" },
] as const;

const guidelines = [
  "Install the shared UI library instead of copying components from the styleguide app.",
  "Import components from @ssw/ui-library once the package exists and is published internally.",
  "Keep tokens, theme configuration and reusable components inside the package.",
  "Use the styleguide app as documentation and examples, not as the source of reusable production components.",
  "When a component changes, update the package first and then update this styleguide to use the package version.",
] as const;

const setupSteps = [
  {
    title: "1. Create the package",
    description:
      "The reusable components move into a package named @ssw/ui-library.",
    icon: PackagePlus,
  },
  {
    title: "2. Export components",
    description:
      "The package exports shared components such as Button, Card and future form controls.",
    icon: PackageCheck,
  },
  {
    title: "3. Install in apps",
    description:
      "Stream applications install the package and import components from one central place.",
    icon: Terminal,
  },
  {
    title: "4. Document in styleguide",
    description:
      "The styleguide installs @ssw/ui-library too, so documentation always shows the real package components.",
    icon: Wrench,
  },
] as const;

export default function InstallationPage() {
  const {
    borders,
    surface,
    secondaryText,
    accent,
    selectedBackground,
  } = useDocumentationStyles();

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
            Later, the package can define these as peer dependencies so every
            application uses its own React and MUI versions while sharing the
            same Stream components.
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

        <Box
          sx={{
            mt: 2,
            p: 2.5,
            borderLeft: `${borderWidths.accent} solid ${accent}`,
            backgroundColor: selectedBackground,
          }}
        >
          <Typography variant="h3" sx={{ mb: 1, color: accent }}>
            Important distinction
          </Typography>
          <Typography variant="body2" sx={{ color: secondaryText, lineHeight: 1.7 }}>
            The styleguide documents the system. The UI library provides the
            reusable code. Eventually this styleguide should consume the UI
            library, just like other Stream applications.
          </Typography>
        </Box>
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="These rules keep installation and usage predictable for Stream teams."
        last
      >
        <Card sx={{ backgroundColor: surface, borderColor: borders.default }}>
          <GuidelineList items={guidelines} />
        </Card>
      </Section>
    </Page>
  );
}
