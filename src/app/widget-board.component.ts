import { Component, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { Exporter } from './exporter';
import { YamlExporterService } from './yaml-exporter.service';
import { RELOADABLE_WIDGET } from './widget-token';
import { Reloadable } from './widget';

/*
Single-Responsibility:
  Responsible for displaying widgets and reloading them on initialization
O:
L:
I:
Dependency Inversion: 
  Depends on the `Reloadable` abstraction (via the `RELOADABLE_WIDGET` token) instead of specific widget components.
  Allowing any widget that implements `Reloadable` to be used without modifying the `WidgetBoardComponent`.
*/

@Component({
  selector: 'widget-board',
  template: `<div>
    <ng-content></ng-content>
  </div>`,
  styles: [
    `
      div {
        padding: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to bottom right, #3f51b5, #f06292);
      }
    `,
  ],
  providers: [{ provide: Exporter, useClass: YamlExporterService }],
})
export class WidgetBoardComponent {
  @ContentChildren(RELOADABLE_WIDGET) reloadableWidgets!: QueryList<Reloadable>;

  /**
   * Load the content of any reloadable widget after the view has been initialized
   */
  ngAfterViewInit(): void {
    this.reloadableWidgets.forEach((widget) => widget.reload());
  }
}
