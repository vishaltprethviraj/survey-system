import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
@NgModule({
    declarations:[        
        FooterComponent, 
        LoadingSpinnerComponent,
        AlertComponent 
    ],

    imports: [ CommonModule,FontAwesomeModule ],

    exports: [
        FooterComponent, 
        LoadingSpinnerComponent, 
        AlertComponent,
        CommonModule,
        FontAwesomeModule
    ]
})

export class SharedModule {

}