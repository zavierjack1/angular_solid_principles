import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { WidgetComponent } from './widget.component';
import { BaseWidget, Reloadable } from './widget';
import { MatButton } from '@angular/material/button';
import { RELOADABLE_WIDGET } from './widget-token';

/*
Single-Responsibility: Displays weather information and provides a button to export the data as JSON
O: 
L: Liskov Substitution Principle
  By implelmenting BaseWidget we ensure this "widget" can be used interchangeably with other widgets.
Interface Segregation: 
  Implements the `Reloadable` interface because it requires reloading functionality
D: 
*/

@Component({
  selector: 'weather-widget',
  imports: [WidgetComponent, MatIcon, MatProgressSpinner, MatButton],
  template: `
    <widget title="Weather" [data]="data">
      <h5>Currently</h5>
      <section class="widget-content">
        <mat-icon class="widget-icon">wb_sunny</mat-icon>
        <div class="value">{{ data.temperature }}</div>
      </section>

      @if(loading){
        <mat-spinner color="blue"></mat-spinner>
      } @else {
        <button mat-stroked-button (click)="reload()">Reload</button>
      }
    </widget>
  `,
  styleUrls: ['./widget-content.scss'],
  providers: [
    { provide: RELOADABLE_WIDGET, useExisting: WeatherWidgetComponent },
  ],
})
export class WeatherWidgetComponent implements BaseWidget, Reloadable {
  @Input({ required: true }) public data!: any;
  public title = 'Weather';

  public loading = false;
  public reload() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
