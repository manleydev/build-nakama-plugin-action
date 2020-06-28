![Release Version](https://img.shields.io/github/v/release/josephbmanley/build-nakama-plugin-action) ![Test Action](https://github.com/josephbmanley/build-nakama-plugin-action/workflows/Test%20Action/badge.svg)

# Build Nakama Plugin
This action builds a Go plugin for Nakama in your to easily automate builds.

## Usage

This action will create a go binary in the directory of your Nakama plugin directory.

Example:

```yaml
steps:
- uses: josephbmanley/build-nakama-plugin-action@[VERSION]
  with:
    nakamaVersion: "2.11.1"
    moduleDirectory: test_proj
```

### Inputs

#### nakamaVersion

    The release version of Nakama to build for. Defaults to `latest`.

#### moduleDirectory **required**

    The name of the preset found in `export_presets.cfg` you would like to build.

### Outputs

#### binary

    The location the outputed binary relative to GitHub Workspace.
