import { Injectable } from '@angular/core';
import { SharedDataInterface } from '../../interfaces';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public videoItem: any;
  public data: SharedDataInterface = {};
}
