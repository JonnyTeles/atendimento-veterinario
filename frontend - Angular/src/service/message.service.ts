import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../app/components/views/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) { }


  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  openDialog(title?: string, content?: string, button?: string){
    return this.dialog.open(DialogComponent, {
      width: '300px',
      data: {
        title,
        content,
        button,
      },
      backdropClass: 'dialogBg',
    });
  }
}

