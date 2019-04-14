import { domain } from '@devsite/core';
import { FileIORepository } from '@/filesystem/FileIORepository';
import { IFileObject } from '@/filesystem/IFileObject';
import * as uuid from 'uuid';
import { IFileConverter } from '@/filesystem/IFileConverter';
import { IFileIOOptions } from '@/filesystem/IFileIOOptions';
import * as path from 'path';

class TestId extends domain.support.Id<string> {
}

class TestEntity extends domain.support.Entity<TestId> {
  constructor(
    protected _id: TestId,
    protected _value: string,
  ) {
    super(_id);
  }
  get value() { return this._value; }
}

class TestFile implements IFileObject {
  constructor(
    public id: string,
    public value: string,
  ) {}
}

class TestFileConverter implements IFileConverter<TestEntity, TestFile> {
  public fromEntity(entity: TestEntity): TestFile {
    return new TestFile(entity.id.value, entity.value);
  }

  public toEntity(obj: TestFile): TestEntity {
    return new TestEntity(
      new TestId(obj.id),
      obj.value,
    );
  }
}

class TestFileIORepository extends FileIORepository<TestId, TestEntity, TestFile> {

  protected _converter: TestFileConverter = new TestFileConverter();

  public async nextId(): Promise<TestId> {
    return new TestId(uuid.v4());
  }
}

describe('FileIORepository', () => {
  const options: IFileIOOptions = {
    encoding: 'utf8',
    dir: path.resolve(__dirname, './'),
  };

  const repository = new TestFileIORepository(options);

  const id = new TestId('1');
  const entity = new TestEntity(id, 'Test');

  it('save an entity', async () => {
    await repository.save(entity);
    return expect(repository.findById(id)).resolves.toEqual(entity);
  });

  it('remove the entity by the id', async () => {
    await repository.remove(id);
    return expect(repository.findById(id)).rejects.toThrow();
  });

  const id1 = new TestId('1');
  const id2 = new TestId('2');
  const id3 = new TestId('3');
  const entity1 = new TestEntity(id1, 'Test1');
  const entity2 = new TestEntity(id2, 'Test2');
  const entity3 = new TestEntity(id3, 'Test3');

  it('save all entities', async () => {
    await repository.saveAll([entity1, entity2, entity3]);
    await expect(repository.findById(id1)).resolves.toEqual(entity1);
    await expect(repository.findById(id2)).resolves.toEqual(entity2);
    await expect(repository.findById(id3)).resolves.toEqual(entity3);
  });

  it('remove all the entities by ids', async () => {
    await repository.removeAll([id1, id2, id3]);
    await expect(repository.findById(id1)).rejects.toThrow();
    await expect(repository.findById(id2)).rejects.toThrow();
    await expect(repository.findById(id3)).rejects.toThrow();
  });

});
