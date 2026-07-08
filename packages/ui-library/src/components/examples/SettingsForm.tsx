"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import CheckboxField from "../forms/CheckboxField";
import FormActionRow from "../forms/FormActionRow";
import RadioGroup from "../forms/RadioGroup";
import ToggleField from "../forms/ToggleField";
import FormLayout from "../forms/FormLayout";
import FormSection from "../forms/FormSection";
import { spacing } from "../../theme/tokens";

export default function SettingsForm() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [includeArchived, setIncludeArchived] = useState(false);
  const [priority, setPriority] = useState("standard");
  const archivedNeedsConfirmation = weeklySummary && !includeArchived;

  function resetForm() {
    setEmailNotifications(true);
    setWeeklySummary(false);
    setIncludeArchived(false);
    setPriority("standard");
  }

  return (
    <FormLayout onSubmit={(event) => event.preventDefault()}>
      <FormSection title="Notifications" description="Use toggles for settings that can be switched on or off.">
        <Box sx={{ display: "grid", gap: spacing.md }}>
          <ToggleField
            label="Email notifications"
            description="Send updates when workflow status changes."
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
          <ToggleField
            label="Weekly summary"
            description="Send a digest every Monday morning."
            checked={weeklySummary}
            onCheckedChange={setWeeklySummary}
          />
          <CheckboxField
            label="Include archived workflows"
            description="Adds archived records to the weekly summary."
            name="includeArchived"
            checked={includeArchived}
            onCheckedChange={setIncludeArchived}
            errorText={
              archivedNeedsConfirmation
                ? "Confirm whether archived workflows should be included."
                : undefined
            }
          />
        </Box>
      </FormSection>
      <FormSection title="Priority" description="Use radio buttons when one option must be selected.">
        <RadioGroup
          label="Default workflow priority"
          name="priority"
          value={priority}
          onValueChange={setPriority}
          required
          helperText="Choose one default priority for new workflows."
          options={[
            { label: "Standard", value: "standard", description: "Recommended for most workflows." },
            { label: "High", value: "high", description: "Use for time-sensitive processes." },
          ]}
        />
        <FormActionRow primaryLabel="Save settings" onSecondaryClick={resetForm} />
      </FormSection>
    </FormLayout>
  );
}
