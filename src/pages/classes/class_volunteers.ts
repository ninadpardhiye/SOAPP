import {Volunteer} from './volunteer';

export class ClassVolunteer{
  class_number: string;
  class_teachers: Array<Volunteer>;

  constructor(){
    this.class_number ='';
    this.class_teachers = [];
  }
}
