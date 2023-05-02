### Detailed Setup Instructions
Please follow the steps below to run the application locally:
1.  In your terminal/command line interface, navigate to the directory you want the app to be, and create/activate your virtual environment if needed.
2. Clone this repository using the link above. 
3.  Run the command `cd finalyearproject/finalyearproject` 
4. Run the command `pip install -r requirements.txt`
5. Run the command `python manage.py runserver`

If you are facing issues at step 5, please  follow the additional steps below:

6. Open another terminal alongside the one currently open. 
7. In one terminal run the command `pwd` and ensure the path is `yourdir/finalyearproject/finalyearproject`
8. In the other terminal, run the command `cd mainapp/frontend` if you are already in the same directory as step 7, or if not, `cd finalyearproject/finalyearproject/mainapp/frontend`
9. In the frontend terminal, run the command `npm install`
10.  After this has completed, run `npm run build`
11.  Now, using a file manager and copy the build folder located at `finalyearproject/finalyearproject/mainapp/frontend/build`
12.  Navigate back to the `finalyearproject/finalyearproject` directory and paste this build folder here.
13. Run the `python manage.py runserver` command again, and all should be working. 

## Test User Credentials
username: QMUL 

password: queenmary
