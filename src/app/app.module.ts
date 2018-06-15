import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { PagerService } from './pager.service';



import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule
    // IonicModule.forRoot(MyApp)
  ],
  providers: [HttpClientModule, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
