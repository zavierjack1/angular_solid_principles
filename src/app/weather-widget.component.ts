import { JsonExporterService } from './json-exporter.service';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { WidgetComponent } from './widget.component';

/*
Single-Responsibility: Displays weather information and provides a button to export the data as JSON
O: 
L:
I:
D: 
*/

@Component({
  selector: 'weather-widget',
  imports: [WidgetComponent, MatIcon],
  template: `
    <widget title="Weather">
      <h5>Currently</h5>
      <section class="widget-content">
        <mat-icon class="widget-icon">wb_sunny</mat-icon>
        <div class="value">75</div>
      </section>
    </widget>
  `,
  styleUrls: ['./widget-content.scss'],
})
export class WeatherWidgetComponent {
}
