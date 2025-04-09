import { JsonExporterService } from './json-exporter.service';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { WidgetComponent } from './widget.component';
import { BaseWidget } from './widget';

/*
Single-Responsibility: Displays weather information and provides a button to export the data as JSON
O: 
L: Liskov Substitution Principle
  By implelmenting BaseWidget we ensure this "widget" can be used interchangeably with other widgets.
I:
D: 
*/

@Component({
  selector: 'weather-widget',
  imports: [WidgetComponent, MatIcon],
  template: `
    <widget title="Weather" [data]="data">
      <h5>Currently</h5>
      <section class="widget-content">
        <mat-icon class="widget-icon">wb_sunny</mat-icon>
        <div class="value">{{data.temperature}}</div>
      </section>
    </widget>
  `,
  styleUrls: ['./widget-content.scss'],
})
export class WeatherWidgetComponent implements BaseWidget {
  @Input({ required: true }) public data!: any;
  public title = 'Weather';
}
