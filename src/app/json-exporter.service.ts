import { Injectable } from '@angular/core';

/*
Single-Responsibility: It encapsulates the logic for creating and downloading a JSON file

O:
L:
I:
D: 
*/

@Injectable({
  providedIn: 'root',
})
export class JsonExporterService {
  constructor() {}

  export() {
    let data = JSON.stringify({ weather: { is_sunny: true, temp: '+25' } });
    let dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(data);
    let exportFileName = 'weather.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  }
}
