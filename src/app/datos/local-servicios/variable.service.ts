import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  private menus: Subject<any[]> = new Subject();
  menuLista$ = this.menus.asObservable();

  constructor() { }

  setMenus(list: any[]) {
    this.menus.next(list);
  }

}
