# set-git-user

Easy way to set git environment variables 🤩

## Install 📦

```bash
pnpm add -g set-git-user
```
It will auto declare the `set-git-user` command in your terminal.

## Usage 🔨
### Add an env user 👨‍💻

```bash
set-git-user add
```
You will be prompted to enter the env key and the git user information. The key will be used to identify the user information.

If you have already set the env key, you can choose to overwrite the user information or exit it.

### Set the git user 📝
**💡Tips: You need to execute the command in a git repository.**

```bash
set-git-user
```

Yep, it's that simple. You can search the env key to set the git user.

Checkout your local config file to see the user information.
```bash
cat .git/config
```

### List all env users 🧾

```bash
set-git-user list
```

### Search an env user 🔍

```bash
set-git-user search
```
You can search the env key to find the user information.

### Delete an env user 🗑️

```bash
set-git-user delete
```
It will delete the specific env in the local storage. \***NOT**\* the git config.

### Checkout the local storage location of the env file 📁

```bash
set-git-user where
```

### Clear the local envs 🧹
It will delete all the envs in the local storage. \***NOT**\* the git config.
```bash
set-git-user clear
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [SimbaOvO](https://github.com/SimbaOvO)
