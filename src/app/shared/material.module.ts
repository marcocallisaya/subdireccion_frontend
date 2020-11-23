import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
    declarations: [],
    imports: [MatButtonModule, MatTableModule, MatPaginatorModule, MatInputModule,
              MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule,
              MatAutocompleteModule],
    exports: [MatButtonModule, MatTableModule, MatPaginatorModule, MatInputModule,
              MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule,
              MatAutocompleteModule]
})
export class MaterialModule { }
