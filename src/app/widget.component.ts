import { Component, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Exporter } from './exporter';
import { BaseWidget } from './widget';
import { MatButton } from '@angular/material/button';

/*
Single-Responsibility: 
  Displays weather information and provides a button to export the data as JSON
Open/Closed: 
  Open for extension by allowing different content to be passed via `<ng-content>` 
  Closed for modification as its structure and behavior do not need to change when new widgets are added.
L: Liskov Substitution Principle
  By implelmenting BaseWidget we ensure this "widget" can be used interchangeably with other widgets.
Interface Segregation: 
  Does not enforce unnecessary methods on child components, allowing them to implement only the interfaces they need.
D: 
*/

@Component({
  selector: 'widget',
  imports: [MatDivider, MatButton],
  template: `
    <div class="header">
      <h1>{{ title }}</h1>
      <button mat-stroked-button (click)="onExport()">
        Export as JSON
      </button>
    </div>
    <mat-divider></mat-divider>
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        display: block;
        border: #f0ebeb solid 1px;
        border-radius: 5px;
        padding: 15px;
        background-color: #fafafa;
        width: 400px;
        margin-left: 20px;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `,
  ],
})
export class WidgetComponent implements BaseWidget {
  @Input({ required: true }) public title!: string;
  @Input({ required: true }) public data!: any;

  constructor(private exporter: Exporter) {}

  onExport() {
    this.exporter.export(this.data);
  }
}
