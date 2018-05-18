import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  printErrorMessage(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  constructor() { }
}
