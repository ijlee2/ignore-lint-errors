[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ignore-lint-errors/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/ignore-lint-errors/actions/workflows/ci.yml)

# ignore-lint-errors

_Codemod to ignore lint errors per line_


## Why?

In large production projects, ignoring lint errors for existing code is the most pragmatic, quickest approach to complete these tasks:

- Introduce a new lint rule.
- Update a linter to the next minor or major version.
- Migrate code to a different format, e.g. convert `*.{gjs,js}` (JavaScript) to `*.{gts,ts}` (TypeScript).

For the sake of reducing noise, some prefer disabling linting for the entire file. They do so by adding a global directive (e.g. `eslint-disable`) or creating a special file to "suppress" files with many errors.

Instead, `ignore-lint-error` takes the honest approach: It adds a local directive (e.g. `eslint-disable-next-line`) for every line that has an error. This way, we can easily see and show others (including non-engineers),

- How bad our code is in order to create the urgency to fix issues. The number of local ignores (1 per line) always estimates the actual number of errors better than the number of global ignores (1 per file).
- Which parts of our code are good and should be replicated, and which parts are bad and to be avoided. When there is a global ignore, a linter doesn't check the file for the given rule(s).


## Usage

### Arguments

You must pass `--linter` to indicate which linter to run.

```sh
pnpx ignore-lint-errors --linter eslint
pnpx ignore-lint-errors --linter stylelint
pnpx ignore-lint-errors --linter typescript
```

<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod somewhere else (i.e. not in the current directory).

```sh
pnpx ignore-lint-errors --root <path/to/your/project>
```

</details>


### Limitations

The codemod is designed to cover typical cases. It is not designed to cover one-off cases.

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ignore-lint-errors.js --root <path/to/your/project>
```


## Compatibility

- Node.js v22 or above
- Tested against `eslint@v9`, `stylelint@v17`, `typescript@v5`


## Contributing

See the [Contributing](./CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](./LICENSE.md).
