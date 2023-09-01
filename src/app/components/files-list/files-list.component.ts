import { Component, OnInit } from '@angular/core';
import { SortPipe } from 'src/app/helpers/pipes/sort.pipe';
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
  sorts: Array<boolean> = [true, true, true, true];
  selected: number = 0;
  universalChkBox = false;

  constructor(private fileService: FileService, private sortPipe: SortPipe) {}

  ngOnInit(): void {
    this.updateFilesList();
    this.fileService.updateFilesList.subscribe((path) => {
      this.folderPath = path;
      this.updateFilesList();
    });
  }

  changeSortDirection(index: number) {
    for (let i = 0; i < this.sorts.length; i++) {
      if (i == index) this.sorts[i] = this.sorts[index] ? false : true;
      else this.sorts[i] = true;
    }
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
    this.universalChkBox = false;
    this.selected = 0;
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
  makeChkBoxVisible(index: number) {
    let chkb = <HTMLInputElement>document.getElementById('chkb-' + index);
    chkb.classList.remove('hidden');
  }
  makeChkBoxInvisible(index: number) {
    let chkb = <HTMLInputElement>document.getElementById('chkb-' + index);
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
  sortFiles(index: number) {
    let attributes = ['name', 'extension', 'creationDate', 'modificationDate'];
    this.filesList = this.sortPipe.transform(
      this.filesList,
      this.sorts[index] ? 'desc' : 'asc',
      attributes[index]
    );
    this.changeSortDirection(index);
  }
  isChecked(index: number) {
    let chkb = <HTMLInputElement>document.getElementById('chkb-' + index);
    return chkb.checked;
  }
  selectRow(index: number) {
    if (this.filesList[index].checked) {
      this.filesList[index].checked = false;
      this.selected--;
    } else {
      this.filesList[index].checked = true;
      this.selected++;
    }
    if (this.selected == this.filesList.length) this.universalChkBox = true;
  }
  selectAllRows() {
    if (this.universalChkBox) {
      this.filesList.forEach((file) => {
        file.checked = false;
      });
      this.universalChkBox = false;
      this.selected = 0;
    } else {
      this.filesList.forEach((file) => {
        file.checked = true;
      });
      this.universalChkBox = true;
      this.selected = this.filesList.length;
    }
  }
  getReceivers() {
    let receivers: Array<Item> = [];
    this.filesList.forEach((file) => {
      if (file.checked) receivers.push(file);
    });
    return receivers;
  }
  receiveAction(action: number) {
    let receivers = this.getReceivers();
    for (let i = 0; i < receivers.length; i++) {
      let receiver = receivers[i];
      switch (action) {
        // Delete Case
        case 0:
          this.fileService.DeleteFile(receiver.id).subscribe((res) => {
            if (res != -1) {
              // Show toast or similar in the future
              console.log('Item with id ' + res + ' deleted');
            }
            // Refresh on the last element
            if (i == receivers.length - 1) this.updateFilesList();
          });
          break;
      }
    }
  }
  closeToolBar(close: number) {
    if(this.universalChkBox){
      this.selectAllRows();
    }
    else{
      this.selectAllRows();
      this.selectAllRows();
    }
  }
}
