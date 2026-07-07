# Comet

CLI tool for conventional commits.

## Description

This tool has been created to help you write and automatically generate your commits by following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specifications. Some additional commands have been added to enhance your experience (refer to [this section](#executing-program)).

## Installing

The first step is to clone this repository (or download the project folder).

```shell
git clone https://github.com/antoinedmns/comet.git
```

> [!IMPORTANT]  
> NodeJS is needed to properly install the application. There are no restrictions on the version you choose.

And then execute these commands in your terminal within the project folder to install the application globally.

```shell
npm install
```
```shell
npm run build
```
```shell
npm install -g .
```

> [!TIP]  
> A Makefile is provided, you can easily perform the installation with it instead of the manual process.

## Executing program 

The main command is `comet commit [options] [command]`, below you can find all options currently available.

| Option | Description | Alias |
| ------ | ----------- | ----- |
| `--help` | Display help for command. | `-h` |
| `--dry-run` | Perform a dry run without executing any commands. |
| `--copy`| Copy the commit message to your clipboard instead of committing. | `-c` |
| `--add` | Automatically stage all created, deleted or modified files. | `-a` |
| `--push` | Automatically push staged files from the local to the remote repository. | `-p` |
| `--sign` | Sign your commit. | `-s` |
| `--debug` | Display the debug output. | `-d` |
| `--length <number>` | Set the length limit of the message. | `-l <number>` |

> [!CAUTION]
> Some conflicts exist between some options (for example you can't use `--dry-run` and `--push` at the same time).

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

References and inspiration: 
* [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
* [SemVer](https://semver.org/)
* [Commitizen](https://commitizen-tools.github.io/commitizen/)