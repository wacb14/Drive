import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFolderModalComponent } from './new-folder-modal.component';

describe('NewFolderModalComponent', () => {
  let component: NewFolderModalComponent;
  let fixture: ComponentFixture<NewFolderModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewFolderModalComponent]
    });
    fixture = TestBed.createComponent(NewFolderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
