import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css'],
})
export class MenuNavComponent implements OnInit {
  path: Array<string> = [];
  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.fileService.updatePath.subscribe((path) => {
      let arrayPath = path.split('\\');
      this.path = arrayPath;
    });
  }
  changePath(itemOrder: number) {
    this.path = this.path.splice(0, itemOrder + 1);
    let update = '';
    for (let i = 0; i < this.path.length; i++) {
      const element = this.path[i];
      if (i == 0) update += element;
      else update += '\\' + element;
    }
    this.fileService.updateFilesList.emit(update);
  }
}
