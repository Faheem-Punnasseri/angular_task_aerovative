import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'; 
import {MatDialogModule} from '@angular/material/dialog'; 


const materialComponents = [MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialComponents
  ],
  exports: [
    materialComponents
  ]
})
export class MaterialModule { }
