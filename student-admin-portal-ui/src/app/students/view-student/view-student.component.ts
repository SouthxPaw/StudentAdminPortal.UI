import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }
  genderList: Gender [] = [];
  isNewStudent = false;
  header = '';

  constructor(private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly genderService: GenderService,
    private snackbar: MatSnackBar) { }

  ngOnInit() : void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');
    });

    if (this.studentId) {

      if (this.studentId.toLowerCase() === 'Add'.toLowerCase()){
        this.isNewStudent = true;
        this.header = 'Add New Student';


      }
      else {
        this.isNewStudent = false;
        this.header = 'Edit Student';

        this.studentService.getStudent(this.studentId)
        .subscribe(
          (successResponse) => {
            this.student = successResponse;
          },
        );

        this.genderService.getGenderList()
        .subscribe(
          (successResponse) => {
            this.genderList = successResponse;
          }
        );

      }
    }


  }

  onUpdate(): void {
    this.studentService.updateStudent(this.student.id, this.student)
    .subscribe(
    (successReponse) => {
      console.log(successReponse);
      //Show a notification
      this.snackbar.open('Student successfully updated!', undefined, {
        duration: 2000
      });
    },
    (errorResponse) => {
      //Log it
      console.log(errorResponse);
    }
    );
  }

  onDelete(): void {
    this.studentService.deleteStudent(this.student.id)
    .subscribe(
    (successReponse) => {
      console.log(successReponse);
      //Show a notification
      this.snackbar.open('Student successfully deleted!', undefined, {
        duration: 2000
      });

      setTimeout(() => {
        this.router.navigateByUrl(`students`);
      }, 2000);
    },
    (errorResponse) => {
      //Log it
      console.log(errorResponse);
    }
    );
  }

  onAdd(): void {
    this.studentService.addStudent(this.student)
    .subscribe(
      (successResponse) => {
        console.log(successResponse);
        //Show a notification
        this.snackbar.open('Student successfully added!', undefined, {
          duration: 2000
        });

        setTimeout(() => {
          this.router.navigateByUrl(`students/${successResponse.id}`);
        }, 2000);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    )
  }

}
