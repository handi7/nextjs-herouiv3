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
