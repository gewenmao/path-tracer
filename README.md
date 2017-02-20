# path-tracer
tools to trace path

- getFiles(path [, opt])

  param   |      type     |   description
----------|---------------|----------------
  path    |     String    |
  opt     |     Object    |   `through`, `pattern`
  
  **Example**  
  ```
  getFiles('./_path');
  getFiles('./_path', {pattern: '/html$/g', through: false});
  ```
