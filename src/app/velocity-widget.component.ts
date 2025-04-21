import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { WidgetComponent } from './widget.component';
import { BaseWidget } from './widget';

/*
Single-Responsibility: 
  Displays weather information and provides a button to export the data as JSON
O:
L: Liskov Substitution Principle
  By implelmenting BaseWidget we ensure this "widget" can be used interchangeably with other widgets.
Interface Segregation: 
  Does not implement `Reloadable` because it does not require reloading functionality, adhering to separation of concerns.
D: 
*/

@Component({
  selector: 'velocity-widget',
  imports: [WidgetComponent, MatIcon],
  template: `
    <widget title='Velocity' [data]="data">
      <h5>Last sprint</h5>
      <section class="widget-content">
        <mat-icon class="widget-icon">assessment</mat-icon>
        <div class="value">Planned: <strong>{{data.planned}}</strong></div>
        <div class="value">Achieved: <strong>{{data.achieved}}</strong></div>
      </section>
    </widget>
  `,
  styleUrls: ['./widget-content.scss'],
})
export class VelocityWidgetComponent implements BaseWidget {
  public title = 'Velocity';
  @Input({ required: true }) public data!: any;
}
