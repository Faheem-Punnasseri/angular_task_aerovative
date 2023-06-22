import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  animations: [
    trigger('searchAnimation', [
      state('hidden', style({ opacity: 0, height: '0' })),
      state('visible', style({ opacity: 1, height: '*' })),
      transition('hidden <=> visible', animate('300ms ease-in-out')),
    ]),
  ]
})
export class LandingpageComponent implements OnInit {

  constructor(private activityService: ActivityService) {
    this.filteredData = [];
  }

  selectLevelType = '';
  selectActvityType = '';
  selectModeType = '';
  data: any;
  dupData: any[] = [];
  isChecked = false;
  filteredData: any;
  searchQuery = '';
  searchState = 'hidden';
  showNoResult = true;

  ngOnInit(): void {
    this.loadData();
  }

  getUniqueValues(propertyName: string): string[] {
    const uniqueValues = new Set<string>();
    let arrayDatacheck = this.filteredData;
    for (const item of arrayDatacheck) {
      uniqueValues.add(item[propertyName]);
    }
    return Array.from(uniqueValues);
  }

  loadData() {
    this.activityService.getData().subscribe((response) => {
      this.data = response.landingContent;
      this.dupData = this.data;
      this.filteredData = this.data;
    });
  }

  getBackgroundStyle(value: any) {
    if (value.difficultyText == 'Easy') {
      return { 'background-color': 'green' };
    } else if (value.difficultyText == 'Medium') {
      return { 'background-color': '#4287f5' };
    } else {
      return { 'background-color': '#f54248' }; // Default style if none of the conditions match
    }
  }

  filterData(value: any, property: string): void {
    let dom = value.target.value;
    if (dom) {
      let newArray = this.filteredData.filter((item: any) => item[property] == dom);
      this.filteredData = newArray;
    }
  }

  resetFilter() {
    this.filteredData = this.data;
    this.selectLevelType = '';
    this.selectActvityType = '';
    this.selectModeType = '';
    this.searchQuery = '';
  }

  toggleSearch() {
    this.searchQuery = '';
    this.searchState = this.searchState === 'hidden' ? 'visible' : 'hidden';
    this.resetFilter();
  }

  performSearch(): any {
    this.showNoResult = true
    this.filteredData = this.data;
    this.selectLevelType = '';
    this.selectActvityType = '';
    this.selectModeType = '';
    if (this.searchQuery) {
      if (this.isChecked == false) {
        let newArray = this.filteredData.filter((item: any) => { return item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) });
        this.filteredData = newArray;
        this.isChecked = true;
      } else {
        this.filteredData = this.data;
        let newArray = this.filteredData.filter((item: any) => { return item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) });
        this.filteredData = newArray;
      }
      if (this.filteredData.length == 0) {
        this.showNoResult = false
      }
    }
    else {
      this.filteredData = this.data;
    }
  }

}
