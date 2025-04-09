import { JsonExporterService } from './json-exporter.service';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { WidgetComponent } from './widget.component';

/*
Single-Responsibility: 
  Displays weather information and provides a button to export the data as JSON
O:
L:
I:
D: 
*/

@Component({
  selector: 'velocity-widget',
  imports: [WidgetComponent, MatIcon],
  template: `
    <widget title='Velocity'>
      <h5>Last sprint</h5>
      <section class="widget-content">
        <mat-icon class="widget-icon">assessment</mat-icon>
        <div class="value">Planned: <strong>25</strong></div>
        <div class="value">Achieved: <strong>20</strong></div>
      </section>
    </widget>
  `,
  styleUrls: ['./widget-content.scss'],
})
export class VelocityWidgetComponent {
}
