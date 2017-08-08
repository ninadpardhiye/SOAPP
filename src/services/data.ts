import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

@Injectable()
export class DataProvider {
  constructor(private db: AngularFireDatabase) {}

  push(path: string, data: any): Observable<any> {
    return Observable.create(observer => {
      this.db.list(path).push(data).then(firebaseNewData => {
        // Return the uid created
        let newData: any = firebaseNewData;
        observer.next(newData.path.o[newData.path.o.length - 1]);
      }, error => {
        observer.error(error);
      });
    });
  }

  update(path: string, data: any) {
    this.db.object(path).update(data);
  }

  list(path: string): FirebaseListObservable<any> {
    return this.db.list(path);
  }

  object(path: string): FirebaseObjectObservable<any> {
    return this.db.object(path);
  }

  ref(path: string): firebase.database.Reference{
    return firebase.database().ref(path);
  }

  remove(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ref(path).remove().then(data => {
        resolve();
      }).catch(() => {
        reject();
      });
    });
  }
}
