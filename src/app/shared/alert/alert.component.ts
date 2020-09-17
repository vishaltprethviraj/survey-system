import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector:'app-alert',
    templateUrl:'./alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertComponent {
    @Input() message: string;
    @Output() close = new EventEmitter<void>();

    faExclamationCircle = faExclamationCircle;
    
    onClose() {
        this.close.emit();
    }

}