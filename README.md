# Lerna - Monorepo

## Using pnpm with Lerna

### Install
 Install pnpm globally
```shell
npm install -g pnpm

pnpm install
```


## Adding More Workspaces to Project

To include additional workspaces in your project, update your pnpm-workspace.yaml file with the following configuration:

```yaml
# pnpm-workspace.yaml
packages:
  - 'integrations/*'
  - 'packages/*'
```
This configuration tells pnpm that your workspace includes all directories in the apps and packages folders.

## Create a new lerna-managed package
`lerna create <name> [loc]`

### Positionals

- **name**: Unique and public package name (including scope). [string][required]  
- **loc**: Custom package location, matching a configured packages directory. [string]
  
### Example
```shell
lerna create lib1 packages
```

## Adds a dependency to a specific package.
```
pnpm add --filter lib1 react  
pnpm add --filter lib1 typescript -D
```
By passing `--filter lib1` to the installation command, we install these NPM packages locally to the `lib1` .

## Building our library

```
pnpm --filter lib1 build
```
You can add more scripts as needed:

```json
# monorepo/packages/lib1/package.json 
{
  "private": true,
  "name": "lib1",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "scripts": {
    "build": "rm -rf dist && tsc"
  },
  "license": "ISC",
  "devDependencies": {
    "typescript": "^5.5.4"
  }
}
```


## Consuming our shared package within the integrations or another package
 To use this library inside our `lib1` in the `integrations` directory, you can add it using pnpm or manually.

 ```
pnpm add lib1 --filter gars --workspace
```
Using `--filter lib1` with the installation command installs these NPM packages locally in the `gars` directory.

This adds the library package as a website dependency
```json
{
  "name": "website",
  "version": "0.1.0",
  "private": true,
  ...,
  "dependencies": {
    "library": "workspace:*",
    ...
  },
  "devDependencies": {
    ...  
  }
}
```

We are almost done. Let us update the library dependency value to `"workspace:*"` . This means we want to resolve the package locally rather than from a registry like NPM, and `*` means we want to always use the latest version.

Here’s a shorter explanation:

- **`workspace:*`**: Always uses the exact version from the local workspace.  
- **`workspace:~`**: Uses the local version compatible with the `~` range (e.g., `1.2.x` if `1.2.3` exists).  
- **`workspace:^`**: Uses the local version compatible with the `^` range (e.g., `1.x.x` if `1.2.3` exists).  
- **`workspace:^1.5.0`**: Uses the local version matching `^1.5.0` (e.g., `1.5.x`, but not `2.0.0`).  

This ensures dependencies are resolved locally instead of fetching from the registry.


