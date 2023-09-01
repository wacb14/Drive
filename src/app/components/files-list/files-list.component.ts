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
  uploadedFiles: Array<File> = [];

  // Visual and functional vars

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
  // Verifies if the name of file and returns it's Item object
  fileOrFolder(item: string) {
    let index = item.indexOf('.dir');
    let itemMod: Item;
    if (index == -1) {
      let index = this.lookForItemInfoByName(item);
      itemMod = new Item(
        this.filesInfo[index].name,
        ItemType.File,
        this.filesInfo[index].id,
        this.filesInfo[index].extension,
        this.filesInfo[index].folderPath,
        new Date(this.filesInfo[index].creationDate),
        new Date(this.filesInfo[index].modificationDate)
      );
    } else {
      let name = item.replace('.dir', '');
      itemMod = new Item(
        name,
        ItemType.Folder,
        0,
        '',
        '',
        new Date('2023-08-26T03:48:06.526'),
        new Date('2023-08-26T03:49:06.527')
      );
    }
    return itemMod;
  }
  updateFilesList() {
    this.fileService.GetFolderContent(this.folderPath).subscribe((res) => {
      // Always goes first
      this.filesInfo = res.files;
      this.filesList = [];

      for (const element of res.content) {
        let item = this.fileOrFolder(element);
        this.filesList.push(item!);
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
  navigatePreviusFolder() {
    let pathComplete = this.folderPath.split('\\');
    let newPath = '';
    for (let i = 0; i < pathComplete.length - 1; i++) {
      if (i == 0) newPath += pathComplete[i];
      else newPath += '\\' + pathComplete[i];
    }
    this.folderPath = newPath;
    this.updateFilesList();
  }
  openInputFile(fileInput: HTMLInputElement) {
    fileInput.click();
  }
  makeChkBoxVisible(index:number){
    let chkb = <HTMLInputElement> document.getElementById('chkb-'+index);
    chkb.classList.remove('hidden');
  }
  makeChkBoxInvisible(index:number){
    let chkb = <HTMLInputElement> document.getElementById('chkb-'+index);
    chkb.classList.add('hidden');
  }
  captureFiles(event: any) {
    this.uploadedFiles = event.target.files;
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      let data = new FormData();
      data.append('id', '0');
      data.append('folderPath', this.folderPath);
      data.append('creationDate', new Date(Date.now()).toISOString());
      data.append('modificationDate', new Date(Date.now()).toISOString());
      data.append('file', this.uploadedFiles[i]);
      this.fileService.PostFile(data).subscribe((res) => {
        this.filesInfo.push(res);
        // Update the local data when the last file has been uploaded
        if (i == this.uploadedFiles.length - 1) {
          this.uploadedFiles = [];
          this.updateFilesList();
        }
      });
    }
  }
  captureDirectory(event: any) {
    this.uploadedFiles = event.target.files;
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      let fileName = this.uploadedFiles[i].name;
      let relativePath: string = this.uploadedFiles[
        i
      ].webkitRelativePath.replace('/' + fileName, '');
      relativePath = relativePath.replace('/', '\\');
      let data = new FormData();
      data.append('id', '0');
      data.append('folderPath', this.folderPath + '\\' + relativePath);
      data.append('creationDate', new Date(Date.now()).toISOString());
      data.append('modificationDate', new Date(Date.now()).toISOString());
      data.append('file', this.uploadedFiles[i]);
      this.fileService.PostFile(data).subscribe((res) => {
        this.filesInfo.push(res);
        // Update the local data when the last file has been uploaded
        if (i == this.uploadedFiles.length - 1) {
          this.uploadedFiles = [];
          this.updateFilesList();
        }
      });
    }
  }
}
