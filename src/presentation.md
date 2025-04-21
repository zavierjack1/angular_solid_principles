# SOLID Design Principles in Angular
## Presentation Overview
By using an interactive rebase we'll be going step by step through the S.O.L.I.D principles and how to apply them in Angular. 

### How to view progress
`git rebase -i main`, set each commit to `edit`, step through the progress of the presentation by using `git rebase --continue`

## The Widgets App
The app we are going to be building displays a series of widgets. As the requirements change we'll see how using a more SOLID approach makes our code more manageable. 

### Requirements 
- ~~Display a weather widget than can export its data to json~~
- ~~Display **different** types of widgets (Velocity and Weather) that can export their data to json~~
- ~~Display **different** types of widgets (Velocity and Weather) that can export their data to json OR yaml~~
- Display different types of widgets that can: 
  - that can export their data to json OR yaml
  - potentially be "reloaded"
  - reloadable widgets should be refreshed on page load

## S.O.L.I.D. Principles
SOLID represents a set of object-oriented design principles designed by Robert C. Martin (also known as Uncle Bob) in the early 2000's aimed at helping developers create code that is:
- Manageable: Easier to understand, maintain, and extend over time.
- Reusable: Components and modules can be reused in different parts of the application or even in other projects.
- Flexible: Code can adapt to changing requirements with minimal modifications.
- Scalable: Supports growth and complexity without becoming unmanageable.

(I wrongly assumed this was a Gang of Four (Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides) concept Design Patterns: Elements of Reusable Object-Oriented Software, 1994, if you havent read that you should give it a look.)

### S: Single Responsibility Principle
The Single Responsibility Principle states that a class, module, or function should have only one reason to change. 
- **Credit**: Coined by Uncle Bob himself.
- **Definition**: Each component or class should focus on a single responsibility or functionality.
- **Why It Matters**:
  - Improves maintainability by isolating changes to specific parts of the code.
  - Reduces the risk of introducing bugs when modifying functionality.
  - Makes the code easier to understand and test.
- **Example**:
  - A class responsible for formatting data should not also handle saving it to a database.
  - In our case, we've created a `WidgetComponent` & `JsonExporterService` to seperate the responsibily of displaying Widget data from the main app layout, and the logic for exporting to a dedicated class. 
- **Things to look for**: 
  - Ask yourself "what does this component or service do?" if you need to use the word "AND" to descibe it, then you may want to consider breaking that component down.

By adhering to SRP, you ensure that your codebase remains modular, easier to extend, and less prone to errors.

### O: Open/Closed Principle
The Open/Closed Principle states that software entities (classes, modules, functions) should be **open for extension** but **closed for modification**.
- **Credit**: Coined by Bertrand Meyer in 1988
- **Definition**: You should be able to add new functionality to a class or module without modifying its existing code.
- **Why It Matters**:
  - Reduces the risk of breaking existing functionality when adding new features.
  - Encourages the use of abstractions, making the code more flexible and reusable.
  - Improves scalability by allowing new behavior to be added without altering the core logic.
- **Example**:
  - Libraries are a good example of the open/closed principle. As consumers we usually can not edit the code of an external library, so the functionality provided by the library needs to be open to expansion but is inherently closed to modification. 
  - In this case, by using `<ng-content></ng-content>` in our `WidgetComponent` we're able to expand our Widget's functionality without changing the `WidgetComponent` as seen in `VelocityWidget` and `WeatherWidget`. We could create any amount of widgets and the `WidgetComponent` would stay closed.

By adhering to OCP, you ensure that your codebase is easier to maintain, extend, and scale over time.

### L: Liskov Substitution Principle
The Liskov Substitution Principle states that objects of a superclass should be replaceable with objects of a subclass without altering the correctness of the program.
- **Credit**: Barbara Liskov, 1987, Turing Award–winning computer scientist
- **Definition**: Subtypes must be substitutable for their base types. This ensures that derived classes extend the behavior of the base class without changing its expected functionality.
- **Why It Matters**:
  - Promotes reusability by ensuring that derived classes can be used interchangeably with their base class.
  - Prevents unexpected behavior when replacing one implementation with another.
  - Encourages adherence to contracts defined by interfaces or base classes.
  - LSP is less about syntax and more about semantics — “Don’t surprise the caller.”
  - A `Square` should not be a subclass of `Rectangle` if changing its width also changes its height, violating expected behavior.

- **Example**:
  - In our case we use the `BaseWidget` interface to enforce Widgets have `title` and `data`. Therefore, any widget (e.g., `WeatherWidget`, `VelocityWidget`) implementing `BaseWidget` can expected to support those fields without breaking our app.
  - Similarly, we use the `Exporter` interface to enforce that any Exporter implementing it has an `export` method, allowing us to use
  `JsonExporterService` and `YamlExporterService` interchangably.

By adhering to LSP, you ensure that your code remains flexible, predictable, and easy to extend.

### I: Interface Segregation Principle
The Interface Segregation Principle states that no client should be forced to depend on methods it does not use.
- **Credit**: Another Uncle Bob original.
- **Definition**: Interfaces should be small and focused, containing only the methods that are relevant to the specific client.
- **Why It Matters**:
  - Prevents "fat interfaces" that force classes to implement unnecessary methods.
  - Improves flexibility by allowing clients to depend only on the functionality they need.
  - Makes the code easier to maintain and extend by reducing coupling.

- **Example**:
  - Instead of having a single `Widget` interface with methods like `reload()` and `export()`, split it into smaller, focused interfaces:
    - `BaseWidget` for core widget properties like `title` and `data`.
    - `Reloadable` for widgets that support reloading functionality.
  - This ensures that widgets like `WeatherWidget` implement only the `Reloadable` interface, while `VelocityWidget` avoids unnecessary dependencies.

By adhering to ISP, you ensure that your code remains modular, focused, and easier to work with.

### D: Dependency Inversion Principle
The Dependency Inversion Principle states that high-level modules should not depend on low-level modules. Both should depend on abstractions.

- **Definition**: 
  - High-level modules (e.g., business logic) should not depend on low-level modules (e.g., utility classes or services). 
  - Instead, both should depend on abstractions (e.g., interfaces or abstract classes).

- **Why It Matters**:
  - Decouples high-level logic from low-level implementations, making the code more flexible and easier to extend.
  - Allows swapping out implementations (e.g., replacing a service) without modifying the dependent code.
  - Encourages the use of dependency injection, improving testability.

- **Examples**:
  1. **Exporter Abstraction**:
     - **High-Level Module**: Components like `WidgetComponent` depend on the `Exporter` abstraction rather than a specific implementation (e.g., `JsonExporterService` or `YamlExporterService`). This ensures that the export functionality can be swapped or extended without modifying the `WidgetComponent`.
     - **Low-Level Modules**: Services like `JsonExporterService` and `YamlExporterService` implement the `Exporter` abstraction, ensuring they are decoupled from the components that use them. These services depend on the `Exporter` interface, not on the components.

     ```typescript
     export interface Exporter {
       export(data: any): void;
     }

     export class JsonExporterService implements Exporter {
       export(data: any): void {
         console.log('Exporting data as JSON:', JSON.stringify(data));
       }
     }

     export class WidgetComponent {
       constructor(private exporter: Exporter) {}

       exportData(data: any): void {
         this.exporter.export(data); // Depends on abstraction
       }
     }
     ```

  2. **Reloadable Widget Abstraction**:
     - **High-Level Module**: The `WidgetBoardComponent` depends on the `Reloadable` abstraction (via the `RELOADABLE_WIDGET` token) rather than specific widget implementations like `WeatherWidget` or `VelocityWidget`. This allows any widget that implements `Reloadable` to be used without modifying the `WidgetBoardComponent`.
     - **Low-Level Modules**: Widgets like `WeatherWidget` and `VelocityWidget` implement the `Reloadable` abstraction and provide themselves via the `RELOADABLE_WIDGET` token. This ensures they are decoupled from the `WidgetBoardComponent`.

     ```typescript
     export interface Reloadable {
       reload(): void;
     }

     export const RELOADABLE_WIDGET = new InjectionToken<Reloadable>('ReloadableWidget');

     @Component({
       selector: 'widget-board',
       template: `<div><ng-content></ng-content></div>`,
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

     @Component({
       selector: 'weather-widget',
       providers: [{ provide: RELOADABLE_WIDGET, useExisting: WeatherWidgetComponent }],
     })
     export class WeatherWidgetComponent implements Reloadable {
       reload(): void {
         console.log('Reloading Weather Widget...');
       }
     }
     ```
  3. **Unit Testing**:
     - **Isolation**: The `WidgetComponent` is tested independently of the actual `JsonExporterService` or `YamlExporterService`.
    The mock `Exporter` ensures the test focuses solely on the behavior of the `WidgetComponent`.
     - **Flexibility**: You can easily swap out the mock implementation for another one if needed, without modifying the test or the component.
     - **No External Dependencies**: The test does not rely on the actual implementation of the Exporter, making it faster and more reliable.

        ```typescript
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
        ```

By adhering to DIP:
- High-level modules (`WidgetComponent`, `WidgetBoardComponent`) depend on abstractions (`Exporter`, `Reloadable`) rather than concrete implementations.
- Low-level modules (`JsonExporterService`, `WeatherWidgetComponent`) implement these abstractions, ensuring flexibility and decoupling.

**Relationship betwen Liskov Subsitution and Dependency Inversion:**
- **LSP** ensures that abstractions (e.g., interfaces) are implemented correctly by their subtypes, so substituting one implementation for another does not break the program. This guarantees that all implementations behave consistently and adhere to the expected contract.
  - Focuses on low-level modules depending on abstractions
- **DIP** ensures that high-level modules depend on those abstractions, not on specific implementations, enabling flexibility and decoupling. By relying on abstractions, high-level modules can seamlessly work with any implementation that satisfies the abstraction.
  - Focuses on ensuring that high-level modules depend on abstractions, allowing them to work with any valid implementation.

Together, they create a system where:
1. High-level modules are decoupled from low-level implementations (DIP).
2. Low-level implementations can be substituted without breaking the system (LSP).
