# Notification Framework for a Major Consumer Electronics Platform

## Overview

We noticed that different features were sending out notifications without a shared understanding of what was already out there. As a result, users sometimes received repeated messages or missed the ones that actually mattered. We set out to fix that by building a shared framework that helps teams stay aligned on what gets sent, when, and why.

---

## Goals

1. **Build the foundation** -- Create a unified framework that designers and product managers can reference together.
2. **Ensure consistency** -- Reduce redundancy and conflicting messages across features.
3. **Enable better work** -- Establish shared standards so teams can move faster with confidence.

---

## Process

### Notification Audit

We began with a comprehensive audit of notifications across **6 core features** on the platform. Notifications were scattered across separate design files with no single source of truth -- each team had been designing in isolation.

The audit surfaced overlapping messages, inconsistent tone, and gaps where important notifications were missing entirely.

### Building the Framework

The framework was built on **two pillars**, each refined iteratively:

1. **Categorization & Usage** -- Informed by platform-level notification policies and adjusted through multiple rounds of review with stakeholders.
2. **Notification Frequency Types** -- Grounded in the existing design system to ensure visual and behavioral consistency.

---

## The Framework

### 8 Notification Categories

| # | Category | Description |
|---|----------|-------------|
| 1 | **Critical Device Health Warning** | Urgent alerts about conditions that could affect device safety or functionality. Requires immediate user attention. |
| 2 | **Security, Safety & Privacy** | Notifications related to account security, data privacy, or personal safety features. |
| 3 | **User Initiated** | Direct responses to an action the user has taken (e.g., confirming a setting change, completing a download). |
| 4 | **Background Actions** | Updates on tasks the system is performing on behalf of the user (e.g., automatic backups, software updates). |
| 5 | **Automated System Status & Transition** | System-generated updates about device state changes (e.g., entering a power-saving mode, connectivity changes). |
| 6 | **System Management Guidance** | Proactive suggestions to help users maintain or optimize their device (e.g., storage management, maintenance recommendations). |
| 7 | **Contextual Insights & Alerts** | Timely, situation-aware information surfaced based on usage patterns or environmental context. |
| 8 | **Promotional** | Marketing or feature-discovery messages. *(Not used in this project scope.)* |

### 4 Frequency Types

| Type | Description |
|------|-------------|
| **One-Time Informational** | Shown once to convey a piece of information. Does not recur. |
| **Reappearing** | Dismissed by the user but may return if the triggering condition persists or recurs. |
| **Regular Delivery** | Sent on a predictable cadence (daily, weekly, monthly) to keep users informed of ongoing status. |
| **Ongoing** | Persistent notification that remains visible while a condition or process is active. |

### Ranking & Priority Levels

Each notification is assigned an importance level that determines its visual treatment and interruption behavior:

| Priority | When to Use |
|----------|-------------|
| **Urgent** | Requires immediate action; may involve safety or data loss. |
| **High** | Important and time-sensitive, but not an emergency. |
| **Medium** | Useful information the user should see soon, but not disruptive. |
| **Low** | Nice-to-know; can be consumed at the user's convenience. |

---

## Classification Tree

The framework uses a decision-tree structure to classify any notification consistently:

```
START
  |
  v
[1. Categorization & Usage]
  Select the category that best describes the notification's purpose.
  |
  v
[2. Frequency Type]
  Determine how often and under what conditions it should appear.
  |
  v
[3. Importance Level]
  Assign a priority based on urgency and user impact.
  |
  v
END --> Notification is fully classified.
```

This sequential flow ensures every notification is evaluated through the same lens, regardless of which team is designing it.

---

## How to Use the Framework

### 3-Step Process

1. **Pick attributes via the classification tree** -- Walk through each decision point (category, frequency, importance) to define the notification's core attributes.
2. **Review against guidelines** -- Cross-reference the chosen attributes with the detailed guidelines table to check for conflicts, frequency limits, and CTA requirements.
3. **Complete the notification table** -- Document the final classification in the shared notification inventory so all teams have visibility.

### Example Walkthrough

**Scenario:** The system detects that a hardware component has degraded significantly and wants to recommend the user schedule a service appointment.

1. **Category:** System Management Guidance -- This is a proactive suggestion to help maintain the device.
2. **Frequency Type:** Reappearing -- If the user dismisses the notification but the condition persists, it should surface again after an appropriate interval.
3. **Importance:** Medium -- Important for long-term device health, but not an emergency requiring immediate action.

The result is a well-defined notification entry that any team member can understand and implement consistently.

---

## AI-Powered Workflow Integration

To scale the framework beyond documentation, we explored integrating an **AI-powered notification classifier tool** into the team's workflow. This tool was trained on the framework's rules and guidelines, enabling two key use cases:

### Usage One: Planning Notifications Early

**When:** During the product requirements phase, before any design work begins.

**How:** Upload a product requirements document (PRD) to the classifier tool. It analyzes the proposed feature and identifies which notifications will likely be needed, suggests categories, and flags potential conflicts with existing notifications.

**Value:** Catches redundancy and misalignment before design effort is spent, shifting notification planning left in the process.

### Usage Two: Checking Design Flows and Mocks

**When:** During or after the design phase, before handoff to engineering.

**How:** Upload screenshots or screen recordings of the notification as designed. The classifier tool evaluates the notification against the framework -- checking category alignment, frequency appropriateness, priority level, and visual consistency with the design system.

**Value:** Serves as a lightweight design review layer, ensuring framework compliance without requiring a full manual audit every time.

---

## Results

All three original goals were met:

- **Foundation built** -- A single, shared framework now serves as the source of truth for notification design across the platform.
- **Consistency achieved** -- Teams have a common vocabulary and classification system, reducing duplicated or conflicting notifications.
- **Better work enabled** -- The framework, combined with AI-assisted tooling, lowers the effort required to design well-considered notifications.

---

## Reference Tables

### Categorization & Usage Guidelines

| Category | Example Scenarios | Suggested Frequency | Limits & Constraints | CTA Guidance |
|----------|-------------------|---------------------|----------------------|--------------|
| Critical Device Health Warning | Overheating alert, critical storage full | One-Time or Ongoing | Must not be suppressed by user preferences | Direct action (e.g., "Shut down now") |
| Security, Safety & Privacy | Suspicious login, permission request | One-Time or Reappearing | Follow platform security notification policies | Clear accept/deny or review action |
| User Initiated | Download complete, setting confirmed | One-Time Informational | Should appear promptly after user action | Optional dismiss or "View" |
| Background Actions | Backup complete, system update ready | One-Time Informational | Avoid interrupting active use | "View details" or passive dismiss |
| Automated System Status & Transition | Entering power-saving mode, network switch | Ongoing or Reappearing | Remove when condition ends | Contextual (e.g., "Change settings") |
| System Management Guidance | Storage cleanup suggestion, component service recommendation | Reappearing | Respect dismissal cooldown periods | Actionable suggestion (e.g., "Manage storage") |
| Contextual Insights & Alerts | Usage summary, environment-based tip | Regular Delivery or One-Time | Limit to avoid notification fatigue | "Learn more" or passive |
| Promotional | Feature discovery, cross-sell | Regular Delivery | Must comply with platform opt-out policies | "Try it" or dismiss |

### Frequency Types Detail

| Frequency Type | Importance Levels | Display Behavior | Suggested Cadence |
|----------------|-------------------|------------------|-------------------|
| One-Time Informational | Low -- Medium | Appears once, then cleared | N/A |
| Reappearing | Medium -- High | Returns after dismissal if condition persists | Cooldown of hours to days depending on urgency |
| Regular Delivery | Low -- Medium | Delivered on a set schedule | Daily, weekly, or monthly |
| Ongoing | Medium -- Urgent | Persistent while condition is active | Continuous until resolved |

---

## Future Plans

1. **Evaluate notification quality** -- Develop metrics and review processes to assess whether notifications are achieving their intended outcomes.
2. **Organize more guidelines** -- Expand the framework to cover edge cases, multi-notification scenarios, and cross-feature coordination.
3. **Detect conflicts across projects** -- Build tooling or processes to automatically flag when two teams are planning notifications that overlap or contradict each other.
