"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import FormActionRow from "@/app/components/molecules/FormActionRow";
import FormField from "@/app/components/molecules/FormField";
import SelectField from "@/app/components/molecules/SelectField";
import FormLayout from "@/app/components/organisms/FormLayout";
import FormSection from "@/app/components/organisms/FormSection";
import { formTokens, spacing } from "@/app/theme/tokens";

export default function CustomerForm() {
  const [customerName, setCustomerName] = useState("Van Dijk Logistics");
  const [status, setStatus] = useState("active");
  const [billingEmail, setBillingEmail] = useState("finance@vandijk.nl");
  const [reference, setReference] = useState("CUST-2048");

  const customerNameValid = customerName.trim().length > 0;
  const statusValid = status.trim().length > 0;
  const billingEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingEmail);

  function resetForm() {
    setCustomerName("Van Dijk Logistics");
    setStatus("active");
    setBillingEmail("finance@vandijk.nl");
    setReference("CUST-2048");
  }

  return (
    <FormLayout onSubmit={(event) => event.preventDefault()}>
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
            state={customerNameValid ? "success" : "default"}
            helperText={customerNameValid ? "Customer name is complete." : undefined}
            errorText={!customerNameValid ? "Customer name is required." : undefined}
            inputProps={{
              value: customerName,
              onChange: (event) => setCustomerName(event.currentTarget.value),
              placeholder: "Van Dijk Logistics",
            }}
          />
          <SelectField
            label="Status"
            name="status"
            required
            state={statusValid ? "success" : "default"}
            helperText={statusValid ? "Status selected." : undefined}
            errorText={!statusValid ? "Choose a status." : undefined}
            options={[
              { label: "Select a status", value: "" },
              { label: "Active", value: "active" },
              { label: "Review", value: "review" },
              { label: "Inactive", value: "inactive" },
            ]}
            selectProps={{
              value: status,
              onChange: (event) => setStatus(event.currentTarget.value),
            }}
          />
          <FormField
            label="Billing email"
            name="billingEmail"
            required
            state={billingEmailValid ? "success" : "default"}
            helperText={billingEmailValid ? "Billing email verified." : undefined}
            errorText={!billingEmailValid ? "Enter a valid billing email address." : undefined}
            inputProps={{
              type: "email",
              value: billingEmail,
              onChange: (event) => setBillingEmail(event.currentTarget.value),
              placeholder: "finance@vandijk.nl",
            }}
          />
          <FormField
            label="Reference"
            name="reference"
            helperText="Use the external customer reference when available."
            inputProps={{
              value: reference,
              onChange: (event) => setReference(event.currentTarget.value),
              placeholder: "CUST-2048",
            }}
          />
        </Box>
        <FormActionRow primaryLabel="Save customer" onSecondaryClick={resetForm} />
      </FormSection>
    </FormLayout>
  );
}
