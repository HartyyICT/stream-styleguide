"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import ErrorText from "@/app/components/atoms/ErrorText";
import HelperText from "@/app/components/atoms/HelperText";
import Label from "@/app/components/atoms/Label";
import Textarea from "@/app/components/atoms/Textarea";
import FormActionRow from "@/app/components/molecules/FormActionRow";
import FormField from "@/app/components/molecules/FormField";
import SelectField from "@/app/components/molecules/SelectField";
import FormLayout from "@/app/components/organisms/FormLayout";
import FormSection from "@/app/components/organisms/FormSection";
import { formTokens, spacing } from "@/app/theme/tokens";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("Jansen");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("implementation");
  const [message, setMessage] = useState("");

  const firstNameValid = firstName.trim().length > 0;
  const lastNameValid = lastName.trim().length > 0;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const topicValid = topic.trim().length > 0;
  const messageValid = message.trim().length > 0;

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
          <FormField
            label="First name"
            name="firstName"
            required
            state={firstNameValid ? "success" : "default"}
            helperText={firstNameValid ? "First name is complete." : undefined}
            errorText={!firstNameValid ? "First name is required." : undefined}
            inputProps={{
              value: firstName,
              onChange: (event) => setFirstName(event.currentTarget.value),
              placeholder: "Sanne",
            }}
          />
          <FormField
            label="Last name"
            name="lastName"
            required
            state={lastNameValid ? "success" : "default"}
            helperText={lastNameValid ? "Last name is complete." : undefined}
            errorText={!lastNameValid ? "Last name is required." : undefined}
            inputProps={{
              value: lastName,
              onChange: (event) => setLastName(event.currentTarget.value),
              placeholder: "Jansen",
            }}
          />
          <FormField
            label="Email"
            name="email"
            required
            state={emailValid ? "success" : "default"}
            helperText={emailValid ? "Email address verified." : undefined}
            errorText={!emailValid ? "Enter a valid email address." : undefined}
            inputProps={{
              type: "email",
              value: email,
              onChange: (event) => setEmail(event.currentTarget.value),
              placeholder: "sanne@streamsoftware.nl",
            }}
          />
          <SelectField
            label="Topic"
            name="topic"
            required
            helperText={topicValid ? "Topic selected." : undefined}
            errorText={!topicValid ? "Choose a topic." : undefined}
            state={topicValid ? "success" : "default"}
            options={[
              { label: "Select a topic", value: "" },
              { label: "Implementation", value: "implementation" },
              { label: "Support", value: "support" },
              { label: "Sales", value: "sales" },
            ]}
            selectProps={{
              value: topic,
              onChange: (event) => setTopic(event.currentTarget.value),
            }}
          />
        </Box>
        <Box sx={{ display: "grid", gap: formTokens.label.gap }}>
          <Label htmlFor="message" required>Message</Label>
          <Textarea
            id="message"
            name="message"
            required
            state={messageValid ? "success" : "default"}
            error={!messageValid}
            value={message}
            onChange={(event) => setMessage(event.currentTarget.value)}
            placeholder="Describe what the team needs to follow up on."
          />
          {messageValid ? (
            <HelperText tone="success">Message is complete.</HelperText>
          ) : (
            <ErrorText>Message is required.</ErrorText>
          )}
        </Box>
        <FormActionRow primaryLabel="Send message" />
      </FormSection>
    </FormLayout>
  );
}
