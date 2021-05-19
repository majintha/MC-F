import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UnavailabilityService {

  constructor(
    private http: HttpClient
  ) { }

  public addBatchUnavailability(subject1,subject, batchId, day, startTime, endTime) {
    return this.http.post(`${AppConfig.environment}/nabatch`,{subject1,subject,batchId,day,startTime,endTime});
  }

  public addLecturerUnavailability(lecturerId, day, startTime, endTime) {
    return this.http.post(`${AppConfig.environment}/nalecturer`,{lecturerId,day,startTime,endTime});
  }

  public addSessionUnavailability(sessionId, day, startTime, endTime) {
    return this.http.post(`${AppConfig.environment}/nasession`,{sessionId,day,startTime,endTime});
  }

  public viewUnavailabilityById(id) {
    return this.http.get(`${AppConfig.environment}/Unavailability/${id}`);
  }

  public viewUnavailabilitysById(id) {
    return this.http.get(`${AppConfig.environment}/nasession/${id}`);
  } 

  public viewUnavailabilitys() {
    return this.http.get(`${AppConfig.environment}/nasession`);
  }
//lec
  public viewUnavailabilityl() {
    return this.http.get(`${AppConfig.environment}/nalecturer`);
  }

  public viewUnavailabilitylById(id) {
    return this.http.get(`${AppConfig.environment}/nalecturer/${id}`);
  } 

  public viewAllLecturers() {
    return this.http.get(`${AppConfig.environment}/lecturers`);
  }
  public deleteunavailabilitylById(id) {
    return this.http.delete(`${AppConfig.environment}/nalecturer/${id}`);
  }

//

//batch
public viewUnavailabilityb() {
  return this.http.get(`${AppConfig.environment}/nabatch`);
}

public viewUnavailabilitybById(id) {
  return this.http.get(`${AppConfig.environment}/nabatch/${id}`);
} 

public viewAllBatchs() {
  return this.http.get(`${AppConfig.environment}/batches`);
}

public deleteunavailabilitybById(id) {
  return this.http.delete(`${AppConfig.environment}/nabatch/${id}`);
}
//

  public viewAllSessions() {
    return this.http.get(`${AppConfig.environment}/sessions`);
  }

  public viewSelectedLecturerbyID(lecId){
    return this.http.get(`${AppConfig.environment}/lecturers/${lecId}`);

  }

  public deleteunavailabilitysById(id) {
    return this.http.delete(`${AppConfig.environment}/nasession/${id}`);
  }

  // public viewUnavailabilityb() {
  //   return this.http.get(`${AppConfig.environment}/nabatch`);
  // }
}
