# Pocket Plan Theme Options

This document defines available visual themes and the implementation approach for theme switching in Pocket Plan.

## Theme 1: Indigo Classic (Current Active)

- Box Color: #5C5CDB
- Background Color: #F4F4FF
- Text Color: #111827
- Supporting Accent: #3F2E95

## Theme 2: Emerald Calm

- Box Color: #0F766E
- Background Color: #F3F7F6
- Text Color: #0F172A
- Supporting Accent: #134E4A

## Theme 3: Sunset Coral

- Box Color: #F97316
- Background Color: #FFF7ED
- Text Color: #1F2937
- Supporting Accent: #C2410C

## Theme 4: Buttermilk & Mid Blue

- Box Color: #4C6FFF
- Background Color: #FFF8E8
- Text Color: #1F2937
- Supporting Accent: #2F4DBA

## Theme 5: Salmon & Mid Green

- Box Color: #E67D73
- Background Color: #F5FBF7
- Text Color: #1F2937
- Supporting Accent: #2F8A57

## Notes

- The box color maps to headers, key cards, and active controls.
- The background color maps to app screen backgrounds.
- The text color maps to primary content text for readability.

## Implementation Architecture

Use token-based theming instead of hardcoded hex values in screens.

Core pieces:

1. Themes token file

- Create a themes token file with consistent keys across all themes.
- Example token groups:
  - brand: primary, primaryDark, accent
  - surface: background, card, border
  - text: primary, secondary, muted
  - semantic: success, warning, danger, info

2. Theme Provider

- Build a ThemeProvider that stores current theme key and exposes selected tokens.
- Persist selected theme key in local storage so app restarts keep user preference.

3. useMemo requirement for provider value

- When building ThemeProvider, memoize the provider value with useMemo.
- Reason: if provider value object changes on every render, all components subscribed to theme context re-render.
- For Pocket Plan, this matters for smoothness on older Android devices.
- Goal: re-render only when theme actually changes from Settings.

4. useTheme hook

- Expose a simple useTheme hook to consume theme tokens in screens/components.

5. Settings integration

- Add theme selection UI in Settings.
- On selection:
  - update ThemeProvider state
  - persist selected theme key
  - apply live immediately

## Important Semantic Color Rule

Keep meaning colors stable across themes:

- Success = green family
- Warning = yellow or amber family
- Danger = red family

For Dark or Midnight themes, keep these semantic tokens explicit in themes file even if values are similar.

Reason:

- Pure neon variants can reduce readability on near-black surfaces.
- Slight hue or brightness tuning is recommended per theme for accessibility and comfort.

## Suggested Future Theme Additions

1. Midnight Slate

- Dark UI with low-glare surfaces and tuned semantic colors.

2. Ocean Teal

- Cool tone palette while preserving semantic meaning colors.

## Execution Steps

1. Create theme token file and define all theme objects.
2. Add ThemeProvider and useTheme hook.
3. Use useMemo in ThemeProvider value.
4. Add storage for selected theme key.
5. Add theme selector in Settings screen.
6. Refactor shared components first:
   - Buttons
   - Cards
   - Screen containers
7. Migrate high-traffic screens next:
   - Add Transaction
   - Budget
   - Savings
   - Dashboard
8. Verify contrast and readability in light and dark variants.

## Done Criteria

- Theme selection persists after app restart.
- No visible frame drops when toggling theme.
- Semantic status colors remain understandable in every theme.
- Screens do not contain hardcoded color values for theme-driven UI areas.
