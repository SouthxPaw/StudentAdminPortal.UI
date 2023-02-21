import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:44352';

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/Students');
  }

  getStudent(studentId: string) : Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/Students/' + studentId);
  }

  updateStudent(studentId: string, studentToUpdate: Student) : Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentToUpdate.firstName,
      lastName: studentToUpdate.lastName,
      dateOfBirth: studentToUpdate.dateOfBirth,
      email: studentToUpdate.email,
      mobile: studentToUpdate.mobile,
      genderId: studentToUpdate.genderId,
      physicalAddress: studentToUpdate.address.physicalAddress,
      postalAddress: studentToUpdate.address.postalAddress
    }

    return this.httpClient.put<Student>(this.baseApiUrl + '/Students/' + studentId, updateStudentRequest);
  }
}
