"use client";

import { Box } from "@mui/material";
import FormActionRow from "@/app/components/molecules/FormActionRow";
import FormField from "@/app/components/molecules/FormField";
import SelectField from "@/app/components/molecules/SelectField";
import FormLayout from "@/app/components/organisms/FormLayout";
import FormSection from "@/app/components/organisms/FormSection";
import ValidationSummary from "@/app/components/organisms/ValidationSummary";
import { formTokens, spacing } from "@/app/theme/tokens";

export default function CustomerForm() {
  return (
    <FormLayout onSubmit={(event) => event.preventDefault()}>
      <ValidationSummary
        errors={["Customer name is required.", "Enter a valid billing email address."]}
      />
      <FormSection title="Customer" description="Use this pattern for creating or editing customer records.">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: formTokens.layout.singleColumn, md: formTokens.layout.twoColumn },
            gap: spacing.md,
          }}
        >
          <FormField
            label="Customer name"
            name="customerName"
            required
            errorText="Customer name is required."
            inputProps={{ placeholder: "Van Dijk Logistics" }}
          />
          <SelectField
            label="Status"
            name="status"
            options={[
              { label: "Active", value: "active" },
              { label: "Review", value: "review" },
              { label: "Inactive", value: "inactive" },
            ]}
          />
          <FormField
            label="Billing email"
            name="billingEmail"
            errorText="Enter a valid billing email address."
            inputProps={{ type: "email", defaultValue: "finance@" }}
          />
          <FormField
            label="Reference"
            name="reference"
            helperText="Use the external customer reference when available."
            inputProps={{ defaultValue: "CUST-2048" }}
          />
        </Box>
        <FormActionRow primaryLabel="Save customer" />
      </FormSection>
    </FormLayout>
  );
}
