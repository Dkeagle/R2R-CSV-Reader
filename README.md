# R2R-CSV-Reader

Road 2 Riches CSV Reader is an AJAX website used to read and go through a CSV file generated on spansh.co.uk/riches/.
It will display information about the route system after system, planet after planet and save your actual position in the browser cache.
As it's made with AJAX (JS + PHP), you'll need a working web server to use this project.

USAGE:
- Generate a route on spansh.co.uk/riches/.
- Download the CSV file for that route and rename it "list.csv".
- Place the "list.csv" file in the project folder.
- You're good to go Commander!

WIP & known issues:
- The "list.csv" file need to include the mapping value at the moment, if that value is not in the CSV file then the code will crash.
=> Need to check the value exists before trying to read it, i'm on it!
- The CSS might not be fully responsive on small screens / tablets / smartphones.
=> As CSS is far from my mains skills, any advice on "how to make it look good" would be appreciated! 