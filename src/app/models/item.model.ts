export enum ItemType {
  File = 'file',
  Folder = 'folder',
}
export class Item {
  checked: boolean;
  name: string;
  type: ItemType;
  id: number;
  extension: string;
  folderPath: string;
  creationDate: Date;
  modificationDate: Date;
  constructor(
    name: string,
    type: ItemType,
    id: number,
    extension: string,
    folderPath: string,
    creationDate: Date,
    modificationDate: Date
  ) {
    this.checked = false;
    this.name = name;
    this.type = type;
    this.id = id;
    this.extension = extension;
    this.folderPath = folderPath;
    this.creationDate = creationDate;
    this.modificationDate = modificationDate;
  }
}
