import { domain } from '@devsite/core';
import { IFileObject } from '@/filesystem/IFileObject';

export interface IFileConverter<E extends domain.support.Entity<any>, F extends IFileObject> {
  fromEntity(entity: E): F;
  toEntity(obj: F): E;
}
