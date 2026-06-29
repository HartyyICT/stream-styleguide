"use client";

import { Box } from "@mui/material";
import CheckboxField from "@/app/components/molecules/CheckboxField";
import FormActionRow from "@/app/components/molecules/FormActionRow";
import RadioGroup from "@/app/components/molecules/RadioGroup";
import ToggleField from "@/app/components/molecules/ToggleField";
import FormLayout from "@/app/components/organisms/FormLayout";
import FormSection from "@/app/components/organisms/FormSection";
import { spacing } from "@/app/theme/tokens";

export default function SettingsForm() {
  return (
    <FormLayout onSubmit={(event) => event.preventDefault()}>
      <FormSection title="Notifications" description="Use toggles for settings that can be switched on or off.">
        <Box sx={{ display: "grid", gap: spacing.md }}>
          <ToggleField
            label="Email notifications"
            description="Send updates when workflow status changes."
            defaultChecked
          />
          <ToggleField
            label="Weekly summary"
            description="Send a digest every Monday morning."
          />
          <CheckboxField
            label="Include archived workflows"
            description="Adds archived records to the weekly summary."
            name="includeArchived"
          />
        </Box>
      </FormSection>
      <FormSection title="Priority" description="Use radio buttons when one option must be selected.">
        <RadioGroup
          label="Default workflow priority"
          name="priority"
          defaultValue="standard"
          options={[
            { label: "Standard", value: "standard", description: "Recommended for most workflows." },
            { label: "High", value: "high", description: "Use for time-sensitive processes." },
          ]}
        />
        <FormActionRow primaryLabel="Save settings" />
      </FormSection>
    </FormLayout>
  );
}
