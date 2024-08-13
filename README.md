# SWAPI Search Application

## Overview

This project is a React application that allows users to search through various Star Wars entities (such as people, films, planets, etc.) using the Star Wars API (SWAPI). The application features a search page that displays results categorized by entity type, as well as a dedicated "People" page where users can view, edit, and delete individual records.

## Features

- **Search Functionality**:

  - Users can search for Star Wars entities across multiple categories: people, films, planets, species, vehicles, and starships.
  - The search results are categorized, displaying the top 3 matches for each category.
  - Each category section includes a "View All" button that links to a dedicated page for that category.

- **People Page**:

  - Displays a table of people from the Star Wars universe with options to edit or delete each row.
  - Editing a row opens a modal where the user can update the details (name, height, and mass) and save the changes.
  - Deleting a row removes the person from the table.

- **Responsive Design**:
  - The application is built with Material-UI, ensuring a responsive and modern UI.

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ildevelop/starwars.git
   cd starwars

   ```

2. Install dependencies:

```bash
  yarn
```

3. Running the Application:

```bash
  yarn dev
```

The application will be available at `http://localhost:5173`

### Functionality Overview

1. Search Page:

- The search page features a search bar where users can input their search terms.
- The search results are displayed in categories (people, films, etc.), showing the top 3 results for each.
- A "View All" button under each category links to a full list page for that category.

1. Category Page:

- The People page displays a table of people from the Star Wars universe.
- Users can edit a person's details by clicking the "Edit" button, which opens a modal.
- Users can delete a person from the table by clicking the "Delete" button.
- The table automatically updates when changes are made.

### Future Enhancements

- Implement full functionality for other category pages similar to the People page.
- Add more advanced search options, such as filters and sorting.
- Improve the error handling and loading states for a smoother user experience.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgements

- [SWAPI](https://swapi.dev/) - The Star Wars API used for this project.
- [Material-UI](https://mui.com/) - The UI framework used to style the application.
