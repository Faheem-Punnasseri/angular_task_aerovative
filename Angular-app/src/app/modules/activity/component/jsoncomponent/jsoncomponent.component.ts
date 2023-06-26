import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import * as prettyjson from 'prettyjson';

@Component({
  selector: 'app-jsoncomponent',
  templateUrl: './jsoncomponent.component.html',
  styleUrls: ['./jsoncomponent.component.css']
})
export class JsoncomponentComponent {
  jsonData: any;
  prettyPrintedJson: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.jsonData = this.data.jsonData;
  }
}
