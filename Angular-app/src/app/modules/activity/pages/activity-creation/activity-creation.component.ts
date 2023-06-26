import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivityService } from '../../services/activity.service';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { JsoncomponentComponent } from '../../component/jsoncomponent/jsoncomponent.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-activity-creation',
  templateUrl: './activity-creation.component.html',
  styleUrls: ['./activity-creation.component.css']
})

export class ActivityCreationComponent implements OnInit {

  constructor(private el: ElementRef, private addActvivtyService: ActivityService, private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog) { }
  forms: FormGroup[] = [];
  selectedTabIndex: number = 0;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  selectedFile: File | null = null;
  tableData: boolean = false;
  selectModeValues: any;
  selectTypeValues: any;
  selectDifficultyValues: any;
  selectMediaValues: any;
  selectlinkedMediaValues: any;
  questionsModal: any;
  selectedAll: boolean = false;
  selectedItems: any = [];
  selectedOverallTabIndex: any;
  tab: any = [];
  displayQuestionsMain: { [key: string]: any[] } = {};
  displayQuestion: any;
  noOfquestions: any = 0;
  totalscore = 0;
  totalTimeFormatted: any = "";
  selectedIndex: any = 0;
  overAllObj: any = [];
  overAllarr: any = [];
  testingVal: any;
  testLength: any = 0;
  forToggleTabId = 0;
  activityArraytopush: any;
  questionTotalScore: any;
  totalQuestionsofAll: any;
  testdetaisArray: any = [];
  matTabselectedIndexValue: number = 0;
  presentArray: any;
  questioneachTotaleachquest: number[] = [];
  questioneachTotalTime: any[] = [];
  questioneachTotalScoreRev: any[] = [];
  getTotalallTimeatRevSumVal: any;
  tabSelectedId: any = 0;
  displayJson: any = 0;

  ngOnInit() {
    this.selectedOverallTabIndex = 0;
    this.filetoLoad();
    const newForm = this.createForm();
    this.forms.push(newForm);
  }

  ngAfterViewInit() {
    this.initializeSelectedItems();
    this.testdetaisArray = [];
  }

  filetoLoad() {
    this.addActvivtyService.getData().subscribe((response) => {
      this.selectModeValues = response.activityModes;
      this.selectTypeValues = response.activityTypes;
      this.selectDifficultyValues = response.difficultyLevels;
      this.selectMediaValues = response.mediaTypes;
      this.selectlinkedMediaValues = response.linkedMedias;
      this.questionsModal = response.questions;
      this.tosetSelected();
    })
  }

  createObjoverAll() {
    this.overAllObj = {
      activity: this.activityArraytopush,
      test: this.testdetaisArray
    }
    const jsonString = JSON.stringify(this.overAllObj, null, 2);
    this.displayJson = jsonString;
  }

  tosetSelected() {
    const arrayOfSet = this.questionsModal;
    for (let index = 0; index < arrayOfSet.length; index++) {
      const element = arrayOfSet[index];
      element.selected = false;
    }
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      testTitle: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      testDescription: new FormControl('', [Validators.required, Validators.maxLength(999)]),
      mediaSelectedValue: new FormControl('', [Validators.required]),
      medialinkedValue: new FormControl('', [Validators.required]),
      mediaIntroduction: new FormControl('', [Validators.required]),
      mediaTime: new FormControl('', [Validators.required]),
      instructionTime: new FormControl('', [Validators.required]),
      coverImageForMedia: new FormControl(null)
    });
  }

  addTab() {
    const newForm = this.createForm();
    this.forms.push(newForm);
    setTimeout(() => {
      this.selectedIndex = this.forms.length - 1;
    }, 50);
  }

  submitSecondary() {
    setTimeout(() => {
      let jsonData = this.displayJson;
      const dialogRef = this.dialog.open(JsoncomponentComponent, {
        data: { jsonData },
        width: '850px',
        height: '700px',
      });
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/activity/landingpage']);
      });
    }, 1);
  }

  handleButtonClick() {
    this.setCheckedFalseAll(false);
  }

  getTabLabel(index: number) {
    this.forToggleTabId = this.tabSelectedId;
    const actvivtyArray = this.activityForm.value;
    this.activityArraytopush = actvivtyArray;
    this.todisplayActvityReview();
    return `Test ${index + 2}`
  }

  getTotalLength(): number {
    const valuesArray = Object.values(this.displayQuestionsMain);
    const totalLength = valuesArray.reduce((sum, value) => sum + value.length, 0);
    return totalLength;
  }

  geteachTotalquestionsLength(): number[] {
    const lengthArray: number[] = [];
    for (const key of Object.keys(this.displayQuestionsMain)) {
      const array = this.displayQuestionsMain[key];
      lengthArray.push(array.length);
    }
    return lengthArray;
  }

  getTotalScore(): number {
    let totalScoreactivivty = 0;
    Object.keys(this.displayQuestionsMain).forEach(key => {
      if (key.startsWith('displayQuestion')) {
        const questionArray = this.displayQuestionsMain[key];
        questionArray.forEach(question => {
          totalScoreactivivty += question.score;
        });
      }
    });
    return totalScoreactivivty;
  }

  todisplayActvityReview() {
    const formArrayValues: any[] = [];
    this.forms.forEach((control: FormGroup) => {
      formArrayValues.push(control.value);
      this.testdetaisArray = formArrayValues
    });
  }

  removeTab(index: number) {
    let earaseInd = index - 1;
    this.forms.splice(earaseInd, 1);
    this.selectedItems.splice(earaseInd, 1);
    this.displayQuestionsMain = this.selectedItems;
    if (this.selectedTabIndex >= this.forms.length) {
      this.selectedTabIndex = this.forms.length - 1;
    }
  }

  activityForm = new FormGroup({
    actvityMode: new FormControl('Practice'),
    difficulty: new FormControl('Easy'),
    typeOfActivity: new FormControl('Listening'),
    activityTitle: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    instructions: new FormControl('', [Validators.required, Validators.maxLength(999)]),
    fileofActivity: new FormControl(null),
    remarks: new FormControl('', [Validators.required])
  });

  get activityTitle() {
    return this.activityForm.get('activityTitle');
  }
  get difficulty() {
    return this.activityForm.get('difficulty');
  }
  get instructions() {
    return this.activityForm.get('instructions');
  }
  get remarks() {
    return this.activityForm.get('remarks');
  }

  get instructionTime(): AbstractControl | null {
    return this.forms.length > 0 ? this.forms[0].get('instructionTime') : null;
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.activityForm.get('fileofActivity')?.setValue(selectedFile.name);
    }
  }

  resetEventValue(event: any) {
    event.target.checked = false;
  }

  selectAll(event: any) {
    let checked = event.target.checked;
    this.selectedOverallTabIndex = this.tabGroup.selectedIndex;
    const selectedIndex = this.selectedOverallTabIndex;
    if (checked) {
      this.selectedAll = true;
      this.selectedItems[selectedIndex] = [...this.questionsModal];
      this.setCheckedFalseAll(true);
    } else {
      this.selectedAll = false;
      this.selectedItems[selectedIndex] = [];
      this.setCheckedFalseAll(false);
    }
  }

  checkIndex() {
    const tabCheck = this.tabGroup.selectedIndex;
    this.tabSelectedId = tabCheck;
    this.setCheckedFalseAll(false);
    this.testDetailsDisplay(tabCheck);
  }

  toggleSelection(itemVal: any, event: any, id: any) {
    itemVal.id = id;
    this.selectedItems[this.tabSelectedId].push(itemVal);
  }

  setCheckedFalseAll(val: any) {
    val == false ? this.selectedAll = false : true;
    for (let index = 0; index < this.questionsModal.length; index++) {
      const element = this.questionsModal[index];
      element.selected = val;
    }
  }

  generateArrayName(tabIndex: number): string {
    return `displayQuestion${tabIndex}`;
  }

  testDetailsDisplay(tabCheck: any) {
    const arrayTodisplay = this.displayQuestionsMain['displayQuestion' + tabCheck];
    if (!arrayTodisplay) {
      this.noOfquestions = 0;
      this.totalscore = 0;
      this.totalTimeFormatted = 0;
    } else {
      this.noOfquestions = this.displayQuestionsMain['displayQuestion' + tabCheck].length;
      this.scoreTotal(arrayTodisplay);
    }
  }

  modalstepthree() {
    this.testLength = this.forms.length;
    this.totalQuestionsofAll = this.getTotalLength();
    this.questionTotalScore = this.getTotalScore();
    this.questioneachTotaleachquest = this.geteachTotalquestionsLength();
    this.questioneachTotalTime = this.getTimeArray();
    this.questioneachTotalScoreRev = this.getScoreArray();
    this.getTotalallTimeatRevSumVal = this.getTotalallTimeatRevSum();
    this.overAllObj = {
      activity: this.activityArraytopush,
      test: this.testdetaisArray
    }
    this.overAllarr = this.overAllObj;
    this.testingVal = this.overAllarr.activity.typeOfActivity;
  }

  submitModalQuestion() {
    const selectedIndexval = this.forToggleTabId;
    const arrayName = this.generateArrayName(selectedIndexval);
    this.selectedItems[arrayName] = [...this.questionsModal];
    if (selectedIndexval !== null) {
      if (!this.displayQuestionsMain[arrayName]) {
        this.displayQuestionsMain[arrayName] = [];
      }
      this.displayQuestionsMain[arrayName] = [...this.questionsModal];
      this.testdetaisArray[selectedIndexval]["questions"] = [...this.questionsModal];
      this.presentArray = this.displayQuestionsMain[arrayName]
    }

    if (this.generateArrayName(this.matTabselectedIndexValue).length == 0) {
      this.tableData = false;
    } else {
      this.tableData = true;
    }
    this.noOfquestions = this.presentArray.length;
    this.calculateTotalTime(this.presentArray)
    this.scoreTotal(this.presentArray);
  }

  getTimeArray(): string[] {
    const timeArray: string[] = [];
    for (const key of Object.keys(this.displayQuestionsMain)) {
      const array = this.displayQuestionsMain[key];
      const totalTime = this.calculateeachTotalTime(array);
      timeArray.push(totalTime);
    }
    return timeArray;
  }

  calculateeachTotalTime(array: any[]): string {
    let totalSeconds = 0;
    for (const item of array) {
      const timeParts = item.timeLimit.split(":");
      const minutes = parseInt(timeParts[0]);
      const seconds = parseInt(timeParts[1]);
      totalSeconds += minutes * 60 + seconds;
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }


  getScoreArray(): number[] {
    const scoreArray: number[] = [];
    for (const key of Object.keys(this.displayQuestionsMain)) {
      const array = this.displayQuestionsMain[key];
      const totalScore = this.calculateTotaleachScore(array);
      scoreArray.push(totalScore);
    }
    return scoreArray;
  }

  calculateTotaleachScore(array: any[]): number {
    let totalScore = 0;
    for (const item of array) {
      totalScore += item.score;
    }
    return totalScore;
  }

  scoreTotal(presentArray: any) {
    this.totalscore = 0;
    for (let i = 0; i < this.presentArray.length; i++) {
      const item = this.presentArray[i];
      if (item.hasOwnProperty('score')) {
        if (typeof item.score === 'number') {
          this.totalscore += item.score;
        }
      }
    }
  }

  calculateTotalTime(presentArray: any): void {
    const totalTimeInSeconds: number = presentArray.reduce(
      (sum: number, obj: any) => sum + this.convertTimeToSeconds(obj.timeLimit),
      0
    );

    const [totalMinutes, totalSeconds] = [
      Math.floor(totalTimeInSeconds / 60),
      totalTimeInSeconds % 60
    ];
    this.totalTimeFormatted = this.formatTime(totalMinutes, totalSeconds);
  }

  convertTimeToSeconds = (time: string): number =>
    time.split(':').reduce((acc, curr) => acc * 60 + parseInt(curr, 10), 0);

  formatTime = (minutes: number, seconds: number): string =>
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  initializeSelectedItems() {
    this.tabGroup._tabs.forEach(() => {
      this.selectedItems.push([]);
    });
  }

  getTotalallTimeatRevSum(): string {
    const totalTimes = [
      ...this.testdetaisArray.map((item: any) => this.parseDuration(item.mediaTime)),
      ...this.testdetaisArray.map((item: any) => this.parseDuration(item.instructionTime)),
      ...this.questioneachTotalTime.map(time => this.parseDuration(time))
    ];
    const totalMilliseconds = totalTimes.reduce((sum, time) => sum + time, 0);
    const totalFormatted = this.formatDuration(totalMilliseconds);
    return totalFormatted;
  }

  private parseDuration(duration: string): number {
    if (duration === null) {
      return 0;
    }

    if (duration.includes(':')) {
      const [min, sec] = duration.split(':').map(Number);
      const totalMilliseconds = min * 60000 + sec * 1000;
      return totalMilliseconds;
    } else {
      const minutes = Math.floor(parseInt(duration.slice(0, 2), 10));
      const seconds = parseInt(duration.slice(2), 10);
      const totalMilliseconds = minutes * 60000 + seconds * 1000;
      return totalMilliseconds;
    }
  }

  private formatDuration(duration: number | string): string {
    const durationInMilliseconds = typeof duration === 'string' ? parseInt(duration, 10) : duration;
    const minutes = Math.floor(durationInMilliseconds / 60000);
    const seconds = Math.floor((durationInMilliseconds % 60000) / 1000);
    const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedDuration;
  }

  submitActivityForm() {
    const formValues = this.forms.map(formGroup => formGroup.value);
    this.createObjoverAll();

    if (this.activityForm.valid) {
    }

  }

}




