import { Component } from '@angular/core';
import { WeatherWidgetComponent } from './weather-widget.component';
import { VelocityWidgetComponent } from './velocity-widget.component';
import { Exporter } from './exporter';
import { YamlExporterService } from './yaml-exporter.service';
import { WidgetBoardComponent } from './widget-board.component';

/*
Single-Responsibility: It is responsible for rendering the main layout
O:
L:
I:
D: 
*/

@Component({
  selector: 'app-root',
  imports: [
    WeatherWidgetComponent,
    VelocityWidgetComponent,
    WidgetBoardComponent,
  ],
  template: `
    <main class="content">
      <widget-board>
        <weather-widget [data]="{ temperature: 75 }" />
        <velocity-widget [data]="{ planned: 25, achieved: 20 }" />
      </widget-board>
    </main>
  `,
  styles: [
    `
      .content {
        background-color: #fff;
        padding: 2rem;
        height: calc(100vh - 64px);
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
  providers: [{ provide: Exporter, useClass: YamlExporterService }],
})
export class AppComponent {}
