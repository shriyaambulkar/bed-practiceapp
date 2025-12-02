# Mock Test Instructions

This repository contains the source code and assets for the Mock Test. The mock test is designed to assess your understanding and skills in implementing endpoints related to planting and managing digital trees using Node.js, Express, and MySQL.

**Duration of Test: 2 hours**

Follow the instructions below to complete the mock test:

## Folder Structure
```
bed-mock-test             
├─ src                       
│  ├─ configs                
│  │  ├─ createSchema.js     
│  │  └─ initTables.js       
│  ├─ controllers            
│  │  ├─ treesController.js  
│  │  └─ usersController.js  
│  ├─ models                 
│  │  ├─ treesModel.js       
│  │  └─ usersModel.js       
│  ├─ routes                 
│  │  ├─ mainRoutes.js       
│  │  ├─ treesRoutes.js      
│  │  └─ usersRoutes.js      
│  ├─ services               
│  │  └─ db.js               
│  └─ app.js   
├─ .gitignore                 
├─ index.js                  
├─ package.json              
└─ readme.md                 
```

## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/ST0503-BED/your-repository-name.git`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Set Up the Environment

1. In the project root directory, create a new file named `.env`.

2. Open the `.env` file in a text editor.

3. Copy the following example environment variables into the `.env` file:

   ```plaintext
   DB_HOST="localhost"
   DB_USER="root"
   DB_PASSWORD="1234"
   DB_DATABASE="trees"
   ```

   Update the values of the environment variables according to your MySQL database configuration.

## Install Dependencies

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   npm install
   ```

## Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   npm run init_tables
   ```

## Complete the Tasks

The mock test consists of three sections: Section A, Section B, and Section C. Each section contains specific tasks related to the implementation of endpoints, middleware functions, and advanced features.

Open the project in VSCode and navigate to the respective files for each section and task. Read the instructions provided in the test document and implement the required functionality according to the specifications.

## Commit and Sync Changes

1. Open the Source Control view in VSCode by clicking on the "Source Control" icon in the left sidebar.

2. Review the changes you made to the files.

3. Enter a commit message summarizing your changes in the input field at the top of the Source Control view.

4. Click on "Commit" to commit the changes.

5. Click on "Sync" to push your changes to the remote repository.

   Note: Make sure you have the necessary permissions to push changes to the repository.

## Submission

Once you have completed the mock test and synchronized your changes, notify the invigilator about your submission.