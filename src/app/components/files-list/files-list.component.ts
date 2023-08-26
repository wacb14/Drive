import { Component, OnInit } from '@angular/core';
import { Item, ItemType } from 'src/app/models/item.model';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css'],
})
export class FilesListComponent implements OnInit {
  folderPath = 'elefantes\\elefante1';
  filesList: Array<Item> = [];
  filesInfo: Array<any> = [];
  constructor(private fileService: FileService) {}
  ngOnInit(): void {
    this.updateFilesList();
    this.fileService.updateFilesList.subscribe((path) => {
      this.folderPath = path;
      this.updateFilesList();
    });
  }
  updateMenuNav() {
    this.fileService.updatePath.emit(this.folderPath);
  }
  fileOrFolder(name: string) {
    let index = name.indexOf('.dir');
    if (index == -1) return ItemType.File;
    else return ItemType.Folder;
  }
  updateFilesList() {
    this.fileService.GetFolderContent(this.folderPath).subscribe((res) => {
      this.filesInfo = res.files;
      this.filesList = [];
      for (const item of res.content) {
        if (this.fileOrFolder(item) == ItemType.Folder) {
          let name = item.split('.dir')[0];
          let itemMod = new Item(
            name,
            ItemType.Folder,
            0,
            '',
            '',
            new Date('2023-08-26T03:48:06.526'),
            new Date('2023-08-26T03:49:06.527')
          );
          this.filesList.push(itemMod);
        } else {
          let index = this.lookForItemInfoByName(item);
          if (index != -1) {
            let itemMod = new Item(
              this.filesInfo[index].name,
              ItemType.File,
              this.filesInfo[index].id,
              this.filesInfo[index].extension,
              this.filesInfo[index].folderPath,
              new Date(this.filesInfo[index].creationDate),
              new Date(this.filesInfo[index].modificationDate)
            );
            this.filesList.push(itemMod);
          }
        }
      }
      this.updateMenuNav();
    });
  }
  lookForItemInfoByName(name: string) {
    let i = 0,
      found = false,
      index = -1;
    while (i < this.filesInfo.length && !found) {
      if (this.filesInfo[i].name + this.filesInfo[i].extension == name) {
        found = true;
        index = i;
      }
      i++;
    }
    return index;
  }
  isFolder(item: Item) {
    return item.type == ItemType.Folder ? true : false;
  }

  // Adds the new path only if it's a folder
  navigateToFolder(i: number) {
    if (this.isFolder(this.filesList[i])) {
      this.folderPath = this.folderPath + '\\' + this.filesList[i].name;
      this.updateFilesList();
    }
  }
}
