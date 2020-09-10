import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations:[        
        FooterComponent,  
    ],

    imports: [ CommonModule,FontAwesomeModule ],

    exports: [
        FooterComponent,  
        CommonModule,
        FontAwesomeModule
    ]
})

export class SharedModule {

}