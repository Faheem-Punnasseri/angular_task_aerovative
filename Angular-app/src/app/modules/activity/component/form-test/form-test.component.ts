import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.css']
})

export class FormTestComponent {
  @Input() formGroup!: FormGroup;
  @Input() selectMediaValues!: any[];
  @Input() selectlinkedMediaValues!: any[];
  @Input() questionsModal!: any[];
  @Input() displayQuestion!: any[];
  @Input() tableData!: boolean;
  @Input() noOfquestions: number = 0;
  @Input() totalscore: number = 0;
  @Input() testNmbr: number = 0;
  @Input() totalTimeFormatted: any = 0;
  @Input() mediaTime: any = "00:00";
  @Input() instructionTime: any = "00:00";

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  get instructionTimechild() {
    return this.formGroup.get('instructionTime')
  }

  get mediaTimechild() {
    return this.formGroup.get('mediaTime')
  }

  onFileMediaChange(event: any) {
    const file = event.target.files[0];
    this.formGroup.patchValue({
      fileofActivity: file
    });
    this.formGroup.get('coverImageForMedia')?.updateValueAndValidity();
  }

}
