# Full Stack Open - Part 0 Exercises

## 0.4: New Note Diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes note and clicks Save

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: HTTP redirect (302) to /notes
    deactivate server

    browser->>server: GET /notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET main.css
    server-->>browser: CSS file

    browser->>server: GET main.js
    server-->>browser: JS file

    browser->>server: GET data.json
    server-->>browser: Updated notes JSON

    Note right of browser: Browser renders updated notes list
```

## 0.5: Single Page App Diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET /spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET main.css
    server-->>browser: CSS file

    browser->>server: GET spa.js
    server-->>browser: JavaScript file

    Note right of browser: JS runs and fetches data

    browser->>server: GET data.json
    activate server
    server-->>browser: Notes JSON
    deactivate server

    Note right of browser: Notes rendered dynamically (no reload)
```

## 0.6: New Note in SPA Diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes note and clicks Save

    browser->>server: POST /new_note_spa
    activate server
    server-->>browser: JSON response (success)
    deactivate server

    Note right of browser: JS updates notes list without reload
```
