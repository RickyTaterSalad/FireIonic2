import { Injectable } from '@angular/core';
import {AngularFire,FirebaseListObservable} from 'angularfire2';

/*
  Generated class for the DepartmentData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DepartmentData {
  private laCityFireKey:string = "-KOl1SQdIv9frbFRiPcT";

  private department:FirebaseListObservable<Object>;
  constructor(private af:AngularFire) {

  }

  public RetrieveUsersDepartment:Function = function(): Promise<FirebaseListObservable<Object>>{
    //will eventually read the la city key off the users object
    return new Promise((resolve) => {
      if (!this.department) {
        var deptKey = "/departments/" + this.laCityFireKey;
        console.log(deptKey);
        var sub = this.af.database.object(deptKey).subscribe((dat) => {
          sub.unsubscribe();
          this.department = dat;
          resolve(this.department)
        });
      }
      else {
        resolve(this.department)
      }
    });
  }


}

