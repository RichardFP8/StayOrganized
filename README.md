# StayOrganized

### TODO Page
- A single dropdown that displays all the users from the _api/users_ API, including those added from the _new_user page_(later)
- 3 buttons
1. Go home
2. Add a course
3. Add a new user
- Some lorem impsum text
- Once a user is selected display the tasks of _that_ users and only show two properties of it(description & deadline)
- Add a third cell for each task that takes the user to a new page, displaying all the details of that page,

### Details of a todo Task Page
- Display the detals of the task using the HTML form
- Show them non-edited 
- Include a button to mark the task complete
- On its **onclick** event make a **PUT** request to mark task complete 

### Add a course Page
- 3 dropdowns
1. Select the users from the _users API_
2. Select the type of category the task is
3. Select the level of priority the new task is(hard-coded)
- A textarea input box to describe the task
- An input box with the type _text_ but it's for a date(deadline of the task)
- Button to add the task to the API through its **onclick** event

### Add a user
- Inlcude 4 input boxes
1. Name
2. Username
3. Password
4. Confirm password
- A button to add use to the API
- On its **onclick** event, add the user but test if there's any empty values and if the passwords match