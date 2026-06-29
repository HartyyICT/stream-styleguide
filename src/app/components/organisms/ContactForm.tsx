"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import Label from "@/app/components/atoms/Label";
import Textarea from "@/app/components/atoms/Textarea";
import FormActionRow from "@/app/components/molecules/FormActionRow";
import FormField from "@/app/components/molecules/FormField";
import SelectField from "@/app/components/molecules/SelectField";
import FormLayout from "@/app/components/organisms/FormLayout";
import FormSection from "@/app/components/organisms/FormSection";
import { formTokens, spacing } from "@/app/theme/tokens";

export default function ContactForm() {
  const [message, setMessage] = useState("Please add this customer to the implementation planning.");

  return (
    <FormLayout onSubmit={(event) => event.preventDefault()}>
      <FormSection title="Contact details" description="Collect the minimum information needed to follow up.">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: formTokens.layout.singleColumn, md: formTokens.layout.twoColumn },
            gap: spacing.md,
          }}
        >
          <FormField label="First name" name="firstName" inputProps={{ defaultValue: "Sanne" }} />
          <FormField label="Last name" name="lastName" inputProps={{ defaultValue: "Jansen" }} />
          <FormField
            label="Email"
            name="email"
            inputProps={{ type: "email", defaultValue: "sanne@streamsoftware.nl" }}
          />
          <SelectField
            label="Topic"
            name="topic"
            options={[
              { label: "Implementation", value: "implementation" },
              { label: "Support", value: "support" },
              { label: "Sales", value: "sales" },
            ]}
          />
        </Box>
        <Box sx={{ display: "grid", gap: formTokens.label.gap }}>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.currentTarget.value)}
          />
        </Box>
        <FormActionRow primaryLabel="Send message" />
      </FormSection>
    </FormLayout>
  );
}
