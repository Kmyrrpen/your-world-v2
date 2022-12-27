# your-world

A note-editing app built with react and typescript, bootstrapped with vite.

## Folder Structure

This project mostly groups files by features, files that are used through-out the application or are considered miscelleneous are grouped by type in the `src` folder. Most folders are pretty obvious, but some notable folders are explained below.

- The `src/app` folder is responsible for the business logic of the application, this is where stores, store-related types, and IDB logic is located.

- In a way, the components inside the `src/loading` folder are just like `Suspense` components in React. They will open DB connections whilst showing a loading fallback and an error UI if we are having trouble opening the connection.

### Conventions

Components are usually singular files but once you require multiple files then it is valid to create a new folder for that component. It is the developer's choice whether or not to create folder or to have it be placed somewhere else.