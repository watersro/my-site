# Project general coding guidelines

## Code Style
- Use semantic HTML5 elements (header, main, section, article, etc.)
- Prefer modern JavaScript (ES6+) features like const/let, arrow functions, and template literals

## Naming Conventions:

### File Naming Convention:
- All files: kebab-case (background-animation.js, og-image.webp)
- Directories: kebab-case with underscores for special dirs (_includes, _data)

### Code Naming Convention:
- JavaScript variables/functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- CSS classes/IDs: kebab-case
- HTML attributes: kebab-case
- Template variables: camelCase

## Code Quality
- Use meaningful variable and function names that clearly describe their purpose
- Include helpful comments for complex logic, otherwise keep code self-explanatory and don't over-comment
- Write modular and reusable code by breaking down large functions into smaller ones
- Follow DRY (Don't Repeat Yourself) principle to avoid code duplication
- Ensure proper indentation and spacing for better readability
- Add error handling for user inputs and API calls
- Use best practices for performance optimization, such as debouncing and throttling where necessary
- Avoid using the important flag in CSS