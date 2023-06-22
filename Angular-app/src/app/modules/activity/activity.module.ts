import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityCreationComponent } from './pages/activity-creation/activity-creation.component';
import { MaterialModule } from '../material/material.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormTestComponent } from './component/form-test/form-test.component';
import { MmsspipePipe } from 'src/app/pipes/mmsspipe.pipe';
import { DurationSumPipe } from 'src/app/pipes/duration-sum.pipe';
import { JsoncomponentComponent } from './component/jsoncomponent/jsoncomponent.component';
import { JsonformatterPipe } from 'src/app/pipes/jsonformatter.pipe';

@NgModule({
  declarations: [
    ActivityComponent,
    LandingpageComponent,
    ActivityCreationComponent,
    FormTestComponent,
    MmsspipePipe,
    DurationSumPipe,
    JsoncomponentComponent,
    JsonformatterPipe
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe

  ], providers: [provideNgxMask()]
})
export class ActivityModule { }
