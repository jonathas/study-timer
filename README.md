# Study Timer

Electron app which helps you to keep track of your study time.

Based on "Alura Timer" while studying the Electron course by [Alura](https://alura.com.br).

I've extended the idea by refactoring it using OOP, TypeScript, eslint and prettier.

## Running

In order to run it, first build it:

```bash
npm run build
```

and run:

```bash
npm start
```

You can switch courses in the tray menu.

## Packaging for deployment

Windows:

```bash
npm run pack:win
```

MacOS:

```bash
npm run pack:mac
```

Linux:

```bash
npm run pack:linux
```

For the 3 platforms at once:

```bash
npm run pack:all
```
