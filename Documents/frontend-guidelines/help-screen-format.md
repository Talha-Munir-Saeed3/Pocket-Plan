# Help Screen Format Guide

## Purpose

This guide defines the standard UI format for all help screens in Pocket Plan Frontend.

Use this format to keep help content clean, readable, and consistent across screens.

## Page Structure

1. Hero header with screen title and short subtitle.
2. Top-right dismiss control uses an `X` icon (not text "Close").
3. Topic switcher (if needed) appears under the hero.
4. Main content is split into separate section boxes.
5. Each section box has:

- A semantic icon in the heading.
- A left accent color.
- A soft matching background tint.
- Short, scannable text blocks.

## Do Not

- Do not place all help text in a single long card.
- Do not use redundant card titles that repeat the page header context.
- Do not use text-only color references when visual color indicators can be shown.

## Semantic Color And Icon Mapping

Use these meanings consistently:

- 🟢 Green: Best practice and positive guidance.
- 🟡 Amber: Warnings and caution points.
- 🔴 Red: Destructive actions and danger.
- 🟣 Purple: Feature explanation and how-it-works content.
- ⚫ Grey: Temporary or less important information.

## Visual Status Legend Pattern (Overview-type help)

When showing progress/severity states, use physical color dots with labels.

Example:

- Green dot: 0% to 60% used
- Amber dot: 61% to 80% used
- Orange dot: 81% to 99% used (critical)
- Red dot: 100%+ used (over limit)

## Section Box Pattern

Each section should be visually separated from others.

Recommended section order for process-based help:

1. 🟣 Steps
2. 🟢 Best practice / When to do this
3. 🟡 Warning notes
4. 🔴 Destructive action warning
5. 🟣 Example / How it works
6. ⚫ Temporary note (if any)

## Writing Style

- Keep text direct and short.
- Prefer bullet points or numbered steps.
- Keep one idea per line for easier scanning.
- Put examples in dedicated sections, not inline with warnings.

## Current Usage In Project

This format is currently used in:

- Budget Help (Overview + Allocation)
- Add Transaction Help

## Future Guidance

For any new help screen:

1. Reuse this section-box structure.
2. Keep semantic icon-color meaning unchanged.
3. Keep dismiss action as top-right `X`.
4. Keep content mobile-readable with clear spacing.
