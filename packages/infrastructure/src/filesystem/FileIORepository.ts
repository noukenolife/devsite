import { IFileObject } from '@/filesystem/IFileObject';
import { domain } from '@devsite/core';
import { IFileConverter } from '@/filesystem/IFileConverter';
import { FileIO } from '@/filesystem/FileIO';
import { FileNotFoundException } from '@/filesystem/FileNotFoundException';

export abstract class FileIORepository
  <ID extends domain.support.Id<any>, E extends domain.support.Entity<ID>, F extends IFileObject>
  implements domain.support.IRepository<ID, E> {

  protected _converter!: IFileConverter<E, F>;

  public constructor(protected _fileIO: FileIO) {}

  public abstract async nextId(): Promise<ID>;

  public async findById(id: ID): Promise<E | undefined> {
    let data: any;
    try {
      data = await this._fileIO.readJSON(`${id.value}.json`);
      return this._converter.toEntity(data);
    } catch (e) {
      if (e instanceof FileNotFoundException) return undefined;
      throw e;
    }
  }

  public async save(entity: E): Promise<void> {
    return this._fileIO.writeJSON(
      `${entity.id.value}.json`,
      this._converter.fromEntity(entity),
    );
  }

  public async saveAll(entities: E[]): Promise<void> {
    await Promise.all(entities.map(entity => this.save(entity)));
  }

  async remove(id: ID): Promise<void> {
    try {
      await this._fileIO.unlink(`${id.value}.json`);
    } catch (e) {
      if (e instanceof FileNotFoundException) throw new domain.support.EntityNotFound();
      throw e;
    }
  }

  async removeAll(ids: ID[]): Promise<void> {
    await Promise.all(ids.map(id => this.remove(id)));
  }
}
