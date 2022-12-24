class Template {
  public generateTrayTemplate(app: Electron.App): Electron.MenuItem[] {
    return [
      { label: 'Courses', type: 'radio' },
      { label: '', type: 'separator' },
      { label: 'Quit', click: () => app.quit() }
    ] as unknown as Electron.MenuItem[];
  }
}

export default new Template();
