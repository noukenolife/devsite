import { IFileIOOptions } from '@/filesystem/IFileIOOptions';
import * as fs from 'fs';
import * as path from 'path';
import { FileNotFoundException } from '@/filesystem/FileNotFoundException';

export class FileIO {

  public constructor(protected _options: IFileIOOptions) {}

  public async readJSON(relativeFilePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.resolve(this._options.dir, relativeFilePath),
        { encoding: this._options.encoding },
        (err, data) => {
          if (err) {
            return err.code === 'ENOENT' ? reject(new FileNotFoundException()) : reject(err);
          }

          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
    });
  }

  public async writeJSON(relativeFilePath: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      let json: string;

      try {
        json = JSON.stringify(data);
      } catch (e) {
        return reject(e);
      }

      fs.writeFile(
        path.resolve(this._options.dir, relativeFilePath),
        json,
        { encoding: this._options.encoding },
        (err) => {
          if (err) { reject(err); } else { resolve(); }
        });
    });
  }

  public async unlink(relativeFilePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(
        path.resolve(this._options.dir, relativeFilePath),
        (err) => {
          if (err) {
            reject(err.code === 'ENOENT' ? new FileNotFoundException() : err);
          } else {
            resolve();
          }
        });
    });
  }

}
