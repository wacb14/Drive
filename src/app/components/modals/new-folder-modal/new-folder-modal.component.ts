import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-new-folder-modal',
  templateUrl: './new-folder-modal.component.html',
  styleUrls: ['./new-folder-modal.component.css'],
})
export class NewFolderModalComponent {
  @Output() folderName = new EventEmitter<string>();
  @Input() confirmation: string = '';
  name: string = '';
  createFolder() {
    this.folderName.emit(this.name);
  }
}
