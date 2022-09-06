class FallbackStorage {
  private fallbackStorage = new Map<string, string>();
  private valid: boolean = this.checkStorage();

  private checkStorage() {
    try {
      localStorage.setItem('check', 'check');
      localStorage.removeItem('check');
      return true;
    } catch (e) {
      return false;
    }
  }

  setItem(key: string, value: any) {
    const string = JSON.stringify(value);
    if (this.valid) {
      localStorage.setItem(key, string);
      return;
    }
    this.fallbackStorage.set(key, string);
  }

  getItem(key: string) {
    const value = this.valid
      ? localStorage.getItem(key)
      : this.fallbackStorage.get(key);
    try {
      const parsed = JSON.parse(value || '');
      return parsed;
    } catch (e) {
      return null;
    }
  }

  removeItem(key: string) {
    if (this.valid) {
      localStorage.removeItem(key);
      return;
    }
    this.fallbackStorage.delete(key);
  }
}

const Storage = new FallbackStorage();

export default Storage;
