import { Batch } from './batch.model';
import { Subject } from './subject.model';
import { Lecturer } from 'app/models/lecturer.model';
import { Building } from 'app/models/building';

export class Session {
  selectedLecturer: Lecturer[];
  selectedSubject: Subject[];
  selectedTag: string;
  selectedGroup: Batch[];
  selectedbuilding: Building[];
  studentCount: string;
  duration: string;
}
