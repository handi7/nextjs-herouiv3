# Roadmap: nextjs-herouiv3 → parity dengan nextjs-shadcn

Target: boilerplate HeroUI v3 dengan struktur, tooling, dan API komponen yang sama dengan `../nextjs-shadcn`,
supaya pindah antar boilerplate tinggal ganti import, bukan ganti cara pakai.

## Kondisi sekarang

| Aspek          | nextjs-shadcn                                                            | nextjs-herouiv3                                               |
| -------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Next / TS      | Next 15.5.19, TS 5                                                       | Next 16.2.2, TS 6                                             |
| Naming file    | kebab-case (`input-text.tsx`)                                            | PascalCase (`InputText.tsx`) — **tetap**                      |
| Providers      | `components/providers/{index,theme-provider}.tsx` + hotkey `d` + Toaster | `app/providers.tsx` (ThemeProvider aja)                       |
| Utils          | `lib/utils.ts` (`cn`)                                                    | pakai `cn` dari `@heroui/react` langsung                      |
| Palette        | cyan primary, navy dark (OKLCH)                                          | teal accent, palette sendiri — **tetap, gak diubah**          |
| Style override | `cva` di dalam komponen                                                  | `styles/*.style.ts` (wrap `*Variants` HeroUI) — dipertahankan |
| Layout         | Sidebar + header + SidebarTrigger                                        | belum ada                                                     |
| Demo           | `app/page.tsx` + `page-client.tsx`                                       | `app/page.tsx` (template CNA) + `app/docs/page.tsx`           |
| Prettier       | + `prettier-plugin-tailwindcss` (`cn`, `cva`)                            | import sort aja                                               |
| Scripts        | dev, dev:turbo, build, start, lint, format, typecheck                    | dev, build, start, lint, format                               |
| Registry       | `registry.json` + `public/r/*.json`                                      | belum ada                                                     |
| Komponen       | 14 form component + 26 primitive                                         | Button, InputText, InputNumber, Switch                        |

## Keputusan (locked)

1. **Next 16** tetap (Turbopack default → gak ada `dev:turbo`).
2. **Konvensi prop React Aria** (`isRequired`, `isDisabled`, `isInvalid`), shape API luar sama dengan shadcn:
   `label`, `description`, `errorMessage`, `classNames`, `startContent`/`endContent`, `options`. `errorMessage` ada → otomatis `isInvalid`.
3. **Superset**: `labelPlacement="left"` dan `descriptionPlacement` dipertahankan.
4. **Tanggal**: wrapper terima & emit `Date`, konversi ke `CalendarDate` di dalam.
5. **Nama file**: komponen PascalCase (`components/ui/InputNumber.tsx`), hooks camelCase (`hooks/useMounted.ts`); path import beda dari shadcn, tapi nama komponen & API sama.
6. **Export style** ikut shadcn: `export default` untuk Input*, named export untuk primitive.
7. **Palette** herouiv3 gak diubah. Prinsip umum: yang udah ada dipertahankan, cuma nambahin yang belum ada.
8. **Gak ada file re-export**: komponen HeroUI yang gak ditambahin apa-apa di-import langsung dari `@heroui/react`. File di `components/ui/` cuma buat wrapper yang nambah API/default/behaviour.
9. **ESLint**: `eslint-config-prettier` aja (prettier gak jalan sebagai lint rule), sama seperti shadcn.

## Phase 0 — Fondasi & tooling ✅

- [x] Nama file di `components/` tetap PascalCase (`InputNumber.tsx`, `ThemeProvider.tsx`), hooks camelCase (`useMounted.ts`) — sempat di-rename ke kebab-case, dibalikin
- [x] Pindah `app/providers.tsx` → `components/providers/index.tsx` + `ThemeProvider.tsx` (port `ThemeHotkey` tombol `d`)
- [x] Bikin `lib/utils.ts` (re-export / wrap `cn`) biar import path sama
- [x] Prettier: tambah `prettier-plugin-tailwindcss`, `tailwindStylesheet: "app/globals.css"`, `tailwindFunctions: ["cn", "tv"]`; tambah `.prettierignore`; format script → `"**/*.{ts,tsx}"`
- [x] ESLint: samakan rule (`sort-imports`/`import/order` off); ganti `eslint-plugin-prettier` → `eslint-config-prettier`
- [x] Complexity limit (dari `telescope/boilerplate-nextjs`): `complexity` ≤ 15 + `sonarjs/cognitive-complexity` ≤ 15 sebagai error, aturan fix di `CLAUDE.md`
- [x] Fix urutan plugin Prettier: `prettier-plugin-tailwindcss` harus terakhir, kalau nggak class gak ke-sort
- [x] Scripts: tambah `typecheck`, `NODE_OPTIONS` memory di `dev`
- [x] `package.json` metadata (name, version, license MIT, `type: module`) + `LICENSE.md`
- [x] Bersihin template CNA (`public/*.svg`, page default), tambah `.gitkeep` di folder kosong
- [x] Theme tokens di `globals.css`: **palette herouiv3 dipertahankan** (gak ikut shadcn). Pengecualian: `--field-background` dark diganti putih tipis (`oklch(100% 0 0 / 6%)`). Token lain (`*-hover`, `*-soft`, `*-secondary`, ...) diturunkan otomatis oleh `@heroui/styles` via `color-mix`, jadi gak perlu ditambah

**Done when:** `lint`, `typecheck`, `build` hijau; struktur folder identik dengan shadcn.

## Phase 1 — Primitive & field shell ✅

- [x] **FieldShell** di `components/ui/Field.tsx`: label + description + error + `labelPlacement`, plus helper
      `fieldRootClassName` dan `resolveInvalid` (`errorMessage` → `isInvalid`). `InputText` & `InputNumber` udah pakai ini.
      Description pakai slot HeroUI (`aria-describedby` otomatis) dan tetap tampil saat invalid (HeroUI default-nya nyembunyiin).
- [x] `Button` — `variant` (nama variant HeroUI: `primary`, `secondary`, `tertiary`, `outline`, `ghost`, `danger`, `danger-soft`),
      `size`, `isLoading`, `loadingText`, `startContent`, `endContent`; spinner gantiin `startContent` saat loading.
      Export `{ Button, buttonVariants }` (`buttonVariants` = `buttonStyle` dari `styles/`).
- [x] `Icon` — `DynamicIcon` dari `lucide-react/dynamic`, default size 18. **Cuma buat nama icon dari data (DB)**; icon statis import langsung dari `lucide-react` (dijaga ESLint `no-restricted-syntax`, beda dari shadcn yang pakai `<Icon>` di mana-mana)
- [x] `Spinner`, `Label`, `Separator`, `Skeleton` — **gak dibikin file**, import langsung dari `@heroui/react` (file yang cuma nerusin export gak dibikin)

## Phase 2 — Text input ✅

| shadcn                 | HeroUI basis                                     | Catatan                                                                                                                                        |
| ---------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `InputText`            | `TextField` + `InputGroup`                       | ✅ pakai FieldShell                                                                                                                            |
| `InputTextarea`        | `TextField` + `TextArea`                         | ✅                                                                                                                                             |
| `InputNumber`          | `NumberField`                                    | ✅ `hideStepper`, `startContent`, `endContent`, `placeholder`; kolom grid group di-set manual karena HeroUI cuma ngitung kolom stepper         |
| `InputFormattedNumber` | `InputNumber` + `I18nProvider` + `formatOptions` | ✅ `locale` (default `id-ID` → `1.250.000,5`), `maximumFractionDigits` (2), `allowNegative`; format & parsing dari Intl, gak ada parser manual |

Beda API dari shadcn: value-nya tetap pakai NumberField (`value: number`, kosong = `NaN`, `onChange`), bukan `number | null` + `onValueChange`.

## Phase 3 — Selection

| shadcn                  | HeroUI basis                | Catatan                                                                                                      |
| ----------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `InputSelect`           | `Select` + `ListBox`        | prop `options` + fallback `children`                                                                         |
| `InputCombobox`         | `ComboBox` / `Autocomplete` | `defaultValue` string                                                                                        |
| `InputComboboxMultiple` | `Autocomplete` + `TagGroup` | **riset dulu**: cek dukungan `selectionMode="multiple"` di v3.2.6; fallback custom pakai ComboBox + TagGroup |

## Phase 4 — Toggle & choice

- [ ] `InputCheckbox` (label + description), `InputCheckboxGroup` (`options`) — `Checkbox`, `CheckboxGroup`
- [ ] `InputRadioGroup` — `RadioGroup` + `Radio`
- [ ] `InputSwitch` — refactor `Switch.tsx` sekarang; hack `useMounted` khusus theme dipindah ke komponen `ThemeSwitch` terpisah

## Phase 5 — Range & tanggal

- [ ] `InputSlider` — `Slider`, support single & range (`defaultValue={[20, 80]}`), `showValue`
- [ ] `DatePicker` — HeroUI `DatePicker` (+ `Calendar`), adaptor `Date` ↔ `CalendarDate`
- [ ] `DateRangePicker` — HeroUI `DateRangePicker` (+ `RangeCalendar`)

## Phase 6 — Overlay & feedback

| shadcn    | HeroUI basis                                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Dialog`  | `Modal` (+ `styles/modal.style.ts`) — bikin wrapper cuma kalau nambah default/API, kalau nggak pakai langsung          |
| `Sheet`   | `Drawer` — sama, wrapper cuma kalau nambah sesuatu                                                                     |
| `Popover` | langsung `Popover` dari `@heroui/react`, gak bikin file                                                                |
| `Tooltip` | langsung `Tooltip` dari `@heroui/react`, gak bikin file                                                                |
| `Sonner`  | `Toast` bawaan HeroUI (gak perlu sonner); pasang provider/region di Providers, bikin helper `toast()` dengan API mirip |

## Phase 7 — App shell & demo

- [ ] `components/AppSidebar.tsx` — HeroUI v3 **gak punya Sidebar**, bikin custom: collapsible ke icon di desktop, `Drawer` di mobile, port `hooks/useMobile.ts`
- [ ] `app/layout.tsx` — font Inter + Geist Mono, sticky header + trigger, sama seperti shadcn
- [ ] `app/page.tsx` + `page-client.tsx` — demo semua komponen dengan urutan & contoh yang sama kayak shadcn (gabung isi `app/docs/page.tsx`, lalu hapus)

## Phase 8 — Docs & distribusi

- [ ] README dengan struktur yang sama: Stack, Getting Started, Scripts, UI Components, Component Usage, Formatting, Linting (termasuk complexity limit), Theme
- [ ] (Opsional) `registry.json` + build `public/r/*.json` supaya bisa `npx shadcn add <url>` — `registry:ui` bisa ngirim file apa aja, dependencies diisi `@heroui/react`/`@heroui/styles`

## Urutan kerja yang disarankan

Phase 0 → 1 wajib duluan (semua komponen bergantung ke FieldShell & konvensi). Setelah itu Phase 2–6 bisa per komponen,
satu commit per komponen (gaya commit shadcn: `feat: add InputTextarea ...`), dan tiap komponen langsung ditambah ke demo page.
Phase 7 bisa dikerjain paralel setelah Phase 1. Phase 8 terakhir.
