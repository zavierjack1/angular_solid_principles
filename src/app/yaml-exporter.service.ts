import { Injectable } from '@angular/core';
import * as yaml from 'js-yaml';
import { Exporter } from './exporter';

/*
Single-Responsibility: It encapsulates the logic for creating and downloading a JSON file
O:
Liskov Substitution: 
  Implements the Exporter interface. It can be replaced with any other service (e.g., YamlExporterService) that also implements Exporter without requiring changes to the components that depend on it (e.g., WidgetComponent).
  This ensures that the export functionality is flexible and extensible.
I:
D: 
*/
@Injectable({
  providedIn: 'root',
})
export class YamlExporterService extends Exporter {
  export(data: any): void {
    const yamlData = yaml.dump(data); // Convert JSON to YAML
    const dataUri = 'data:text/yaml;charset=utf-8,' + encodeURIComponent(yamlData);
    const exportFileName = 'data.yaml';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  }
}