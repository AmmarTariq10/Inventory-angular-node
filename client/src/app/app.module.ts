import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// tslint:disable-next-line:max-line-length
import { MatDialogModule, MatToolbarModule, MatSnackBarModule, MatDividerModule, MatIconModule, MatButtonModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { InterceptorService } from './interceptor.service';
import { InvEditComponent } from './inv-edit/inv-edit.component';
import { InvAddComponent } from './inv-add/inv-add.component';
import { NewSaleComponent } from './new-sale/new-sale.component';
import { ReceiptViewerComponent } from './receipt-viewer/receipt-viewer.component';
import { LoadingDotsComponent } from './loading-dots/loading-dots.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InvEditComponent,
    InvAddComponent,
    NewSaleComponent,
    ReceiptViewerComponent,
    LoadingDotsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InvEditComponent,
    InvAddComponent,
    NewSaleComponent,
    ReceiptViewerComponent
  ]
})
export class AppModule { }
