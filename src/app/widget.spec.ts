import { TestBed } from '@angular/core/testing';
import { Exporter } from './exporter';
import { WidgetComponent } from './widget.component';

// Mock Exporter for Testing
class MockExporter implements Exporter {
  export(data: any): void {
    console.log('Mock Exporter called with data:', data);
  }
}

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: any;
  let mockExporter: MockExporter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WidgetComponent], // Include the standalone component
      providers: [{ provide: Exporter, useClass: MockExporter }], // Provide the mock
    });

    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    mockExporter = TestBed.inject(Exporter); // Inject the mock
  });

  it('should call export on the provided Exporter', () => {
    const mockData = { key: 'value' };
    component.data = mockData; // Set the data input

    const exporterSpy = spyOn(mockExporter, 'export'); // Spy on the mock's export method

    component.onExport(); // Call the method

    expect(exporterSpy).toHaveBeenCalledWith(mockData); // Verify the interaction
  });
});