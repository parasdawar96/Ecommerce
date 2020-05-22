import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    @Input() showModal;
    @Input() modalHeader;
    @Output() updateshowModal = new EventEmitter<any>();
    constructor() { }

    ngOnInit(): void {
    }

    closeModal() {
        this.showModal = false;
        this.updateshowModal.emit(this.showModal);
    }

}
