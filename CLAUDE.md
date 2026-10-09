@AGENTS.md

## Lint limits are errors

- `complexity` ≤ 15 — counts every `?.`, `??`, `&&`, ternary.
- `sonarjs/cognitive-complexity` ≤ 15 — weights nesting; display fallbacks are free.

Fix by extracting a named helper (row mapper, payload builder, label helper) or a presentational
subcomponent **in the same file**. Never `eslint-disable`, never drop a `?? "-"` fallback to win
points. A component gets its own file only when it is reused or has its own state/hooks/data.

To see every function's score instead of only the ones over the limit:

```bash
npx eslint app components hooks lib styles --rule '{"complexity":["warn",0],"sonarjs/cognitive-complexity":["warn",0]}'
```

## Icons

- Static icons: import the component from `lucide-react` directly (`import { PlusIcon } from "lucide-react"`).
- `components/ui/Icon.tsx` (lucide `DynamicIcon`) is **only** for icon names that come from data,
  e.g. a menu or category icon stored in the database. It loads icons at runtime, so using it for a
  fixed icon costs a request and loses type-checking.
- ESLint enforces this: `<Icon name="...">` with a literal name is an error.

## components/ui

- Only add a file when it adds something: a new API (`label`, `errorMessage`, `options`, ...),
  defaults, or behavior. A HeroUI component used as-is is imported straight from `@heroui/react`
  (`import { Spinner } from "@heroui/react"`), never through a file that only re-exports it.
- File names: components PascalCase (`InputNumber.tsx`), hooks camelCase (`useMounted.ts`).

## Props destructuring

When destructuring props no longer fits on one line (Prettier breaks it), take `props` and
destructure in the body; name the remainder `rest`:

```tsx
function Button(props: ButtonProps) {
  const { variant = "primary", isLoading = false, className, children, ...rest } = props;
  // ...
}
```

Small components whose destructuring fits on one line keep it in the signature
(`function Icon({ className, ...props }: IconProps)`).
