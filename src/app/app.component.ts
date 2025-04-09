import { Component } from '@angular/core';
import { WeatherWidgetComponent } from './weather-widget.component';
import { VelocityWidgetComponent } from './velocity-widget.component';

/*
Single-Responsibility: It is responsible for rendering the main layout
O:
L:
I:
D: 
*/

@Component({
  selector: 'app-root',
  imports: [WeatherWidgetComponent, VelocityWidgetComponent],
  template: `
    <main class="content">
       <weather-widget/>
       <velocity-widget/>
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
})
export class AppComponent {
}
