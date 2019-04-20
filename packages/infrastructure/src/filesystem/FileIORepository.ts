import { IFileIOOptions } from '@/filesystem/IFileIOOptions';
import { IFileObject } from '@/filesystem/IFileObject';
import * as fs from 'fs';
import * as path from 'path';
import { domain } from '@devsite/core';
import { IFileConverter } from '@/filesystem/IFileConverter';

export abstract class FileIORepository
  <ID extends domain.support.Id<any>, E extends domain.support.Entity<ID>, F extends IFileObject>
  implements domain.support.IRepository<ID, E> {

  protected _options!: IFileIOOptions;
  protected _converter!: IFileConverter<E, F>;

  public constructor(options: IFileIOOptions) {
    this._options = options;
  }

  public abstract async nextId(): Promise<ID>;

  public async findById(id: ID): Promise<E | undefined> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.resolve(this._options.dir, `${id.value}.json`),
        { encoding: this._options.encoding },
        (err, data) => {
          if (err) {
            err.code === 'ENOENT' ? resolve(undefined) : reject(err);
          } else {
            resolve(this._converter.toEntity(JSON.parse(data)));
          }
        });
    });
  }

  public async save(entity: E): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.resolve(this._options.dir, `${entity.id.value}.json`),
        JSON.stringify(this._converter.fromEntity(entity)),
        { encoding: this._options.encoding },
        (err) => {
          if (err) { reject(err); } else { resolve(); }
        });
    });
  }

  public async saveAll(entities: E[]): Promise<void> {
    await Promise.all(entities.map(entity => this.save(entity)));
  }

  async remove(id: ID): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(
        path.resolve(this._options.dir, `${id.value}.json`),
        (err) => {
          if (err) {
            reject(err.code === 'ENOENT' ? new domain.support.EntityNotFound() : err);
          } else {
            resolve();
          }
        });
    });
  }

  async removeAll(ids: ID[]): Promise<void> {
    await Promise.all(ids.map(id => this.remove(id)));
  }
}
