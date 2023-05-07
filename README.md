### Detailed Setup Instructions
Please follow the steps below to run the application locally:
1.  In your terminal/command line interface, navigate to the directory you want the app to be, and create/activate your virtual environment if needed.
2. Clone this repository using the link above. 
3.  Run the command `cd finalyearproject/finalyearproject` 
4. Run the command `pip install -r requirements.txt`

5. Open another terminal alongside the one currently open. In this terminal, run the command `pwd` and ensure the path is `yourdir/finalyearproject/finalyearproject`
6. Run the command `cd mainapp/frontend` in this same terminal
7. Then, run the command `npm install`
8.  After this has completed, run `npm run build`
9.  Now, using a file manager and copy the build folder located at `finalyearproject/finalyearproject/mainapp/frontend/build`
10. Navigate back to the `finalyearproject/finalyearproject` directory and paste this build folder here.
11. Returning back to the initial terminal opened with the command in step 4, Run the `python manage.py runserver` command 

## Test User Credentials
username: QMUL 

password: queenmary
