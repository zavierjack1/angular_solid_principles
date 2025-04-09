import { JsonExporterService } from './json-exporter.service';
import { Component, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

/*
Single-Responsibility: Displays widget information and provides a button to export the data as JSON

O:
L:
I:
D: 
*/

@Component({
  selector: 'widget',
  imports: [MatDivider, MatIcon, MatButton],
  template: `
    <div class="header">
      <h1>Weather</h1>
      <button mat-stroked-button (click)="onExportJson()">
        Export as JSON
      </button>
    </div>
    <mat-divider></mat-divider>
    <h5>Currently</h5>
    <section class="wether-widget">
      <mat-icon class="widget-icon">wb_sunny</mat-icon>
      <div class="value">+25</div>
    </section>
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
      .wether-widget {
        display: block;
        text-align: center;
        position: relative;
        min-width: 190px;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .widget-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: orange;
      }
      .value {
        font-size: 24px;
        opacity: 0.7;
      }
    `,
  ],
})
export class WidgetComponent {
  constructor(private jsonExporter: JsonExporterService) {}

  onExportJson() {
    this.jsonExporter.export();
  }
}
