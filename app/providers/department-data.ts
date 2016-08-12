import { Injectable } from '@angular/core';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import {Events,Storage, LocalStorage} from 'ionic-angular';
/*
 Generated class for the DepartmentData provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DepartmentData {
  private laCityFireKey:string = "LAFD";
  private storage:Storage;
  private shifts:Array<Object>;
  //eventually move this to SQLStorage
  constructor(private af:AngularFire) {
    this.storage = new Storage(LocalStorage);
  }
  //resolves true if the key exists in firebase
  private KeyExists:Function = function (key:string) {
    return new Promise((resolve) => {
      var sub = this.af.database.object(key, {preserveSnapshot: true}).subscribe((snapshot) => {
        sub.unsubscribe();
        console.log("Key: " + key + " exists: " + (snapshot && snapshot.exists()));
        resolve(snapshot && snapshot.exists());
      });
    });
  };
  //writes the current shifts object to the users storage
  private WriteCurrentShiftsToStorage:Function = function () {
    return new Promise((resolve) => {
      //write the shifts to storage
      if (this.shifts) {
        try {
          var shiftsAsJson = JSON.stringify(this.shifts);
          this.storage.set(this.laCityFireKey + "_shifts", shiftsAsJson).then(()=> {
            resolve()
          });
        }
        catch (e) {
          resolve();
        }
      }
      else {
        resolve();
      }
    })
  };
  //called when the users client side calendar does not contain the current year that the calendar is requesting
  private AddShiftYear:Function = function (year:number, shiftsToMerge:Array<Object>) {
    return new Promise((resolve) => {
      if (!shiftsToMerge) {
        resolve();
      }
      this.storage.get(this.laCityFireKey + "_shifts").then((storedShifts)=> {
        if (storedShifts) {
          try {
            let shiftsObject = JSON.parse(storedShifts);
            shiftsObject[year] = shiftsToMerge;
            this.shifts = shiftsObject;
            this.WriteCurrentShiftsToStorage().then(()=> {
              resolve()
            });
          }
          catch (e) {
          }
        }
        else {
          this.shifts = [];
          this.shifts[year] = shiftsToMerge;
          this.WriteCurrentShiftsToStorage().then(()=> {
            resolve()
          });
        }
      });
    });
  };
  //loads shifts from firebase and stores them in local storage.
  public LoadShiftsFromServer:Function = function () {
    return new Promise((resolve) => {
      var deptKey = "/departments/" + this.laCityFireKey + "/shifts";
      console.log(deptKey);
      //make sure the key exists
      this.KeyExists(deptKey).then((exists)=> {
        if (exists) {
          console.log("Loading shifts from server");
          //it exists, load from server
          var sub = this.af.database.object(deptKey).subscribe((dat) => {
            sub.unsubscribe();
            if (dat) {
              try {
                this.shifts = dat;
                //write to storage then resolve
                this.WriteCurrentShiftsToStorage().then(()=> {
                  resolve()
                });
              }
              catch (e) {
                resolve();
              }
            }
            else {
              resolve();
            }

          });
        }
        else {
          resolve();
        }
      });
    });
  };
  //called when the year doesn't exist in the users client side calendar object
  public PopulateShiftsForYear:Function = function (year:number):Promise<Array<Object>> {
    let deptKey = "/departments/" + this.laCityFireKey + "/shifts/" + year;
    return new Promise((resolve) => {
      this.KeyExists(deptKey).then((exists) => {
        if (exists) {
          console.log(deptKey);
          var sub = this.af.database.object(deptKey).subscribe((shiftsForYear) => {
            console.log("shifts for year:");
            console.dir(shiftsForYear);
            sub.unsubscribe();
            if (shiftsForYear) {
              this.AddShiftYear(year, shiftsForYear).then(()=> {
                resolve(this.shifts)
              });
            }
            else {
              resolve(this.shifts)
            }
          });
        }
        else {
          resolve(this.shifts);
        }
      })
    })
  };
  //returns shifts from either local storage or firebase. if loaded from firebase it will store the users client side object
  public RetrieveDepartmentShifts:Function = function ():Promise<Array<Object>> {
    //will eventually read the la city key off the users object
    return new Promise((resolve) => {
      this.storage.get(this.laCityFireKey + "_shifts").then((shifts)=> {
        if (shifts) {
          console.log("Found shifts in storage");
          try {
            this.shifts = JSON.parse(shifts);
          }
          catch (e) {
          }
          if (!this.shifts) {
            this.LoadShiftsFromServer().then(()=> {
              resolve(this.shifts)
            });
          }
          else {
            resolve(this.shifts)
          }
        }
        else {
          this.LoadShiftsFromServer().then(()=> {
            resolve(this.shifts)
          });
        }
      });
    });
  };
}

