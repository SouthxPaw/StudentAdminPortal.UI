import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile',
  'gender', 'edit'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort !: MatSort;
  filterString = '';

  constructor(private studentService: StudentService) { }

  ngOnInit() : void{
    // Fetch students
    this.studentService.getStudents()
    .subscribe(
      (successResponse) => {
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<Student>(this.students);

        if(this.matPaginator){
          this.dataSource.paginator = this.matPaginator;
        }

        if(this.matSort){
          this.dataSource.sort = this.matSort;
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  filterStudents(){
    const displayedGenders: string[] = ['male', 'female', 'other'];
    var filterStringTrimmed = this.filterString.trim().toLowerCase();

    if (filterStringTrimmed.length > 2)
    {
      switch(displayedGenders.includes(filterStringTrimmed))
      {
        case filterStringTrimmed.includes('female'):
          filterStringTrimmed = '54182038-4abf-42ff-b05a-0f4c414cbc8b';
          break;
        case filterStringTrimmed.includes('male') && !filterStringTrimmed.includes('fe'):
          filterStringTrimmed = '6f08fab6-c62e-4306-9d77-c82c9c6a23ac';
          break;
        case filterStringTrimmed.includes('other'):
          filterStringTrimmed = '177a07f2-3493-49a4-a720-ac96c51c7c43'
          break;
        default:
          break;
      }
    }
    this.dataSource.filter = filterStringTrimmed;
  }
}
