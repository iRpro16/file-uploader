# File Uploader App

This project is part of The Odin Project curriculum. It involves uploading files and creating folders, while implementing CRUD operations. It is similar to a super basic version of Google Drive.

## Features
* Log-in user authentication using passportjs.
* Create a profile.
* Creating folders and files.
* Renaming folders, and downloading files.

## Installaion
To run this project locally, follow these steps:
1. Clone the repository
```
git clone [https://github.com/iRpro16/file-uploader]
```

2. Navigate to the project directory:
```
cd file-uploader
```

3. Install dependencies:
```
npm install
```

4. Start the development server:
```
npm start
```

## Usage
1. Open the application in your browser on PORT=3000.
2. Create an account and login.
3. Create folders and upload files that gets stored in Supabase.

## Learning outcomes
* Account creation: Using EJS to create a form and using the body parameters to insert into a table by querying.
* Log-in feature: Using passportjs to authenticate a user with a username and password (local strategy).
* Download files: Using basic JavaScript to download a file into a user's downloads folder on their local drive.
* Prisma use: Learned to use Prisma, and query to it for basic CRUD operations, as opposed to regular PSQL queries.
* Using file URL: Storing file URL after Supabase generated the URL path for it.

## Challenges and solutions:
### Modularity
Challenge: Making code more modular with express and passport.\
Solution: Putting the passport config in a "config.js" file and then exporting it as a function with the "passport" argument.\
          Also putting the supabase config in a "config.js" file. Which handles connecting to the database to store data.

### Prisma Schemas
Challenge: Understanding Prisma Schemas.\
Solution: Reading lots of documentation + trial & error.

## Future Improvements
* More advanced authentication (e.g. OAuth).
* Filter the files and folders alphabetically or latest.
* Drag and drop for files, or upload many files at once.

## Conclusion
This project was a great learning experience, enhancing my skills in express, and prisma.

## Acknowledgments
Thanks to The Odin Project for providing comprehensive resources and project ideas.
