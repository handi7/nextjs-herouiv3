# Next HeroUI Boilerplate

A Next.js boilerplate with HeroUI v3, Tailwind CSS, TypeScript, ESLint, and Prettier. It mirrors
the component set and API of the `nextjs-shadcn` boilerplate, built on HeroUI and React Aria.

## Stack

- Next.js 16 (Turbopack)
- React 19
- TypeScript
- Tailwind CSS 4
- HeroUI v3 (`@heroui/react`, `@heroui/styles`) on React Aria Components
- `@internationalized/date`
- lucide-react
- next-themes
- ESLint 9 flat config, with complexity limits
- Prettier with Tailwind class sorting and import sorting

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page demos every component, grouped
into sections you can reach from the sidebar.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
npm run typecheck
```

## Project Structure

```
app/
  layout.tsx          Root layout: providers, sidebar, header
  page.tsx            Component demo (server)
  page-client.tsx     Interactive demos (toast, overlays, controlled date pickers)
  globals.css         Theme tokens and HeroUI overrides
components/
  AppSidebar.tsx      App navigation
  ThemeSwitch.tsx     Dark mode switch
  providers/          ThemeProvider (d hotkey) and Toast.Provider
  ui/                 Reusable components
hooks/                useMobile, useMounted
lib/                  utils (cn), options, dates, sidebar
styles/               HeroUI variant presets (buttonStyle, modalStyle)
```

Conventions (also in `CLAUDE.md`):

- Components are PascalCase (`InputNumber.tsx`), hooks camelCase (`useMounted.ts`).
- A file in `components/ui` only exists when it adds an API, defaults, or behavior. HeroUI
  components used as-is are imported straight from `@heroui/react`.
- When props don't fit on one line, take `props` and destructure in the body.

## UI Components

Form components share one shape: `label`, `description`, `errorMessage`, `classNames`,
`labelPlacement` (`"top"` | `"left"`), and `descriptionPlacement` (`"top"` | `"bottom"`). Passing
`errorMessage` marks the field invalid. Props follow React Aria naming: `isRequired`,
`isDisabled`, `isInvalid`, `value` / `defaultValue` / `onChange`.

| Component               | Built on                            | Notes                                                                                |
| ----------------------- | ----------------------------------- | ------------------------------------------------------------------------------------ |
| `InputText`             | `TextField` + `InputGroup`          | `startContent`, `endContent`                                                         |
| `InputTextarea`         | `TextField` + `TextArea`            |                                                                                      |
| `InputNumber`           | `NumberField`                       | `hideStepper`, `startContent`, `endContent`, `placeholder`                           |
| `InputFormattedNumber`  | `InputNumber` + `I18nProvider`      | `locale` (default `id-ID` → `1.250.000,5`), `maximumFractionDigits`, `allowNegative` |
| `InputSlider`           | `Slider`                            | Single or range value, `showValue`                                                   |
| `InputSelect`           | `Select` + `ListBox`                | `options`, `showClear`                                                               |
| `InputCombobox`         | `ComboBox` + `ListBox`              | `options`, `emptyMessage`, built-in filtering                                        |
| `InputComboboxMultiple` | `ComboBox` (multiple) + `TagGroup`  | Selected options as removable tags                                                   |
| `InputCheckbox`         | `Checkbox`                          |                                                                                      |
| `InputSwitch`           | `Switch`                            |                                                                                      |
| `InputCheckboxGroup`    | `CheckboxGroup`                     | `options` with per-option `description`, `orientation`                               |
| `InputRadioGroup`       | `RadioGroup`                        | `options` with per-option `description`, `orientation`                               |
| `DatePicker`            | `DatePicker` + `Calendar`           | Takes and returns `Date`                                                             |
| `DateRangePicker`       | `DateRangePicker` + `RangeCalendar` | `{ start: Date; end: Date }`                                                         |

Other components:

- `Button`: `variant`, `size`, `isLoading`, `loadingText`, `startContent`, `endContent`.
  `buttonVariants` styles links as buttons.
- `Icon`: lucide `DynamicIcon`, **only for icon names that come from data** (for example the
  database). Import static icons from `lucide-react` directly; ESLint rejects
  `<Icon name="...">` with a literal name.
- `Sidebar`: `SidebarProvider`, `Sidebar`, `SidebarGroup`, `SidebarItem`, `SidebarTrigger`,
  `SidebarInset`. Collapses to icons on desktop, opens as a drawer on mobile, toggles with
  ⌘/Ctrl + B, and remembers its state in a `sidebar_state` cookie.
- `Field`: `FieldShell` and helpers used by the form components.

Used straight from `@heroui/react`: `Modal`, `Drawer`, `Popover`, `Tooltip`, `toast`, `Spinner`,
`Skeleton`, `Separator`, `Label`.

## Component Usage

```tsx
import { Spinner, toast } from "@heroui/react";
import { ArrowRightIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import DateRangePicker from "@/components/ui/DateRangePicker";
import InputCheckbox from "@/components/ui/InputCheckbox";
import InputCheckboxGroup from "@/components/ui/InputCheckboxGroup";
import InputCombobox from "@/components/ui/InputCombobox";
import InputComboboxMultiple from "@/components/ui/InputComboboxMultiple";
import InputFormattedNumber from "@/components/ui/InputFormattedNumber";
import InputNumber from "@/components/ui/InputNumber";
import InputRadioGroup from "@/components/ui/InputRadioGroup";
import InputSelect from "@/components/ui/InputSelect";
import InputSlider from "@/components/ui/InputSlider";
import InputSwitch from "@/components/ui/InputSwitch";
import InputText from "@/components/ui/InputText";
import InputTextarea from "@/components/ui/InputTextarea";
```

Example:

```tsx
<Button startContent={<PlusIcon />}>Create</Button>

<Button endContent={<ArrowRightIcon />} variant="outline">
  Continue
</Button>

<Button isLoading loadingText="Saving...">
  Save
</Button>

<Spinner />

<Button onPress={() => toast.success("Changes saved")}>Save</Button>

<InputText isRequired label="Username" placeholder="Username" />

<InputText label="Name" labelPlacement="left" errorMessage="Name is required." />

<InputTextarea label="Description" placeholder="Write a description..." />

<InputNumber isRequired hideStepper label="Amount" minValue={0} startContent="Rp" />

<InputFormattedNumber label="Formatted amount" startContent="Rp" defaultValue={1250000.5} />

<InputSlider showValue label="Progress" defaultValue={45} step={5} />

<InputSlider showValue label="Budget range" defaultValue={[20, 80]} />

<InputSelect
  showClear
  label="Status"
  placeholder="Select status"
  options={[
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ]}
/>

<InputCombobox
  label="Assignee"
  defaultValue="jane"
  options={[
    { label: "Jane Doe", value: "jane" },
    { label: "John Smith", value: "john" },
  ]}
/>

<InputComboboxMultiple
  label="Reviewers"
  defaultValue={["jane", "john"]}
  options={[
    { label: "Jane Doe", value: "jane" },
    { label: "John Smith", value: "john" },
  ]}
/>

<InputCheckbox
  label="Accept terms"
  description="You agree to the terms and privacy policy."
/>

<InputSwitch label="Email notifications" defaultSelected />

<InputCheckboxGroup
  label="Permissions"
  defaultValue={["read"]}
  options={[
    { label: "Create", value: "create" },
    { label: "Read", value: "read" },
  ]}
/>

<InputRadioGroup
  label="Visibility"
  defaultValue="public"
  options={[
    { label: "Public", value: "public", description: "Anyone with the link." },
    { label: "Private", value: "private" },
  ]}
/>

<DatePicker label="Date" value={date} onChange={setDate} />

<DateRangePicker label="Period" value={range} onChange={setRange} />
```

## Formatting

Prettier is configured in `.prettierrc` with:

- `@trivago/prettier-plugin-sort-imports`
- `prettier-plugin-tailwindcss` (must stay last in `plugins`, or classes aren't sorted)

Tailwind class sorting includes `cn` and `tv` via `tailwindFunctions`.

```bash
npm run format
```

## Linting

ESLint uses the Next.js 16 flat configs (`core-web-vitals`, `typescript`) with
`eslint-config-prettier` to avoid conflicts with Prettier.

Complexity limits are errors:

| Rule                           | Limit | Counts                                                         |
| ------------------------------ | ----- | -------------------------------------------------------------- |
| `complexity`                   | 15    | Every branch, including `?.`, `??`, `&&` and ternaries         |
| `sonarjs/cognitive-complexity` | 15    | Branches weighted by nesting depth; display fallbacks are free |

When a function goes over, extract a named helper or a presentational subcomponent in the same
file, not an `eslint-disable`. To see every function's score:

```bash
npx eslint app components hooks lib styles --rule '{"complexity":["warn",0],"sonarjs/cognitive-complexity":["warn",0]}'
```

```bash
npm run lint
npm run typecheck
npm run build
```

## Theme

Theme tokens are HeroUI variables defined in `app/globals.css` using OKLCH colors, with a teal
accent. Dark mode uses a thin white field background.

`globals.css` also overrides a few HeroUI defaults so the components read as one set:

- One radius (`--radius`, 8px) for fields, buttons, overlays, toasts, list items and tags.
- Field descriptions stay visible next to errors, and every error is red.
- Checkbox and radio groups lay out their own items.

Press `d` to toggle dark mode.
