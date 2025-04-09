import { JsonExporterService } from './json-exporter.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

/*
Single-Responsibility: 
  Displays weather information and provides a button to export the data as JSON
Open/Closed: 
  Open for extension by allowing different content to be passed via `<ng-content>` 
  Closed for modification as its structure and behavior do not need to change when new widgets are added.
L:
I:
D: 
*/

@Component({
  selector: 'widget',
  imports: [MatDivider],
  template: `
    <div class="header">
      <h1>{{ title }}</h1>
      <button mat-stroked-button (click)="onExportJson()">
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
export class WidgetComponent {
  @Input({ required: true }) public title!: string;

  constructor(private jsonExporter: JsonExporterService) {}

  onExportJson() {
    this.jsonExporter.export();
  }
}
