This is the second fullstack project from [Freecodecamp](https://www.freecodecamp.com).

## Todo:
 * Add About Page (optional)

## Notes:
 * Keep User-going-to seperate from venue details (in the API)
---
### scenario_1)
 user visits www.myapp.com/venues/some-venue-id directly:
 * On server find venue via yelp request.
 * If found lookup db for users that go there
 * preload those infos into redux store
 * serve page

### scenario_2)
user clicks on venue from search list:
 * Client looks up matching venue and displays it
 * Client makes API request to get users who are also going to the venue
 * Client displays user list

### scenario_3)
 user has selected venue to view in detail in the past, pressed the back button, searched again and found no results (list is now empty) and clicks the forward button again. This time the list and the preloaded venue wont match.
 * Client makes request with the venue-id it searches for
 * Same event as in scenario_1 happen
 * Instead of store preload in server, result is sent via json
---
 * Extend `normalize()` function to take into account which username to diaplay according to the login method of the user
 * The same goes with the username inside the isGoing Array of the venue model when normalize()'d after a user list is requested to see who also goes to a venue.
