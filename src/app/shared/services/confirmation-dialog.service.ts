import { Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar produto</h2>
    <mat-dialog-content>Tem certeza que quer deletar esse produto?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNo()">Não</button>
      <button mat-raised-button color="primary" (click)="onYes()" cdkFocusInitial>Sim</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})

export class ConfirmationDialogComponent{
  matDialogRef = inject(MatDialogRef);

  onNo(){
    this.matDialogRef.close(false);
  }

  onYes(){
    this.matDialogRef.close(true);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  products: Product[] = [];
  productsService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog)

  constructor() { }

  openDialog(): Observable<boolean>{
    return this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed();
  }
}
