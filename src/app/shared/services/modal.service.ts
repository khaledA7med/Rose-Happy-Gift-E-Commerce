import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface ModalState {
  id: string;
  isOpen: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState = new Subject<ModalState>();
  modalState$ = this.modalState.asObservable();

  open(id: string) {
    this.modalState.next({ id, isOpen: true });
  }

  close(id: string) {
    this.modalState.next({ id, isOpen: false });
  }
}
