# SOLID Design Principles in Angular
## Presentation Overview
By using an interactive rebase we'll be going step by step through the S.O.L.I.D principles and how to apply them in Angular. 

### How to view progress
`git rebase -i main`, set each commit to `edit`, step through the progress of the presentation by using `git rebase --continue`

## The Widgets App
The app we are going to be building displays a series of widgets. As the requirements change we'll see how using a more SOLID approach makes our code more manageable. 

### Requirements 
- Display a weather widget than can export its data to json

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
