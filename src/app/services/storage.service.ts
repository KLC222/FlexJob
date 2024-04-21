import { Injectable } from '@angular/core';
import { Drivers } from '@ionic/storage';
import { Storage } from '@ionic/storage-angular';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Create a promise to ensure storage is ready
  private _storageReady: Promise<Storage>;

  constructor() {
    // Initialize storage
    this._storageReady = this.init();
  }

  async init() {
    const storage = new Storage({
      // CordovaSQLite does not work in the browser, so we need to add a fallback driver
      driverOrder: [
        CordovaSQLiteDriver._driver,
        Drivers.IndexedDB,
        Drivers.LocalStorage,
      ],
    });
    // Add the CordovaSQLite driver
    await storage.defineDriver(CordovaSQLiteDriver);
    // Create the storage
    await storage.create();
    return storage;
  }

  // Get a value from storage
  public async get(key: string) {
    const storage = await this._storageReady; // Wait for storage to be ready
    return await storage.get(key);
  }

  // Set a value in storage
  public async set(key: string, value: any) {
    const storage = await this._storageReady; // Wait for storage to be ready
    // Set the value for the key
    await storage.set(key, value);
  }
}
