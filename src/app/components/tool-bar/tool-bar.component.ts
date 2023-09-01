import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
})
export class ToolBarComponent {
  @Input() selected: number = 0;
  @Output() action = new EventEmitter<number>();
  @Output() close = new EventEmitter<number>();

  sendAction(index:number){
    this.action.emit(index);
  }
  closeToolBar(){
    this.close.emit(0);
  }
}
