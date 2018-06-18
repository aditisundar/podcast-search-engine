App is live at: [ohmypod.herokuapp.com](https://ohmypod.herokuapp.com/)

# Guidelines:

To solve this challenge, build a web application that provides:

**Data Visuals**: Display the podcasts returned via search function, as well as key information about each podcast returned. Similarly, display the podcasts a user is subscribed to, as well as information that user might want to know at a glance about the subscriptions.

**Smart Searching**: Give users the ability to search for podcasts by genre and by popularity.

**Smart Sorting**: Based on how frequently each subscribed podcast has new episodes, which subscribed podcasts should the user listen to first in order to avoid falling behind? Assume the user is subscribed to the top 25 podcasts.


## (Optional) Bonus features you may want to include:

* The ability to see podcasts that have gained the most subscribers in a given period of time.
* Recommendations within a genre.
* Recommendations based on similarity to a user's subscriptions.
* Generate a sample user's listening habits and subscriptions. How often 
would the user run out of podcasts to listen to? Which action would you take in response to that conclusion?
* Whatever interesting and helpful features you can come up with!

## My solution

I created the search engine using React (create-react-app) for the front end. I chose to use mygpoclient, the python library that the gpodder.net api offered, in the backend, along with python Flask to run a server. To connect the two, I used fetch from the front end to display the results nicely. Here's a more detailed list of what I used:

**Front end (JS)**
* create-react-app
* react-router
* fetch, to make requests to the server

**Back end (python)**
* mygpoclient, for all api/podcast-related methods
* Flask, to run a server locally (later deployed as a standalone server to heroku)
* flask-cors
* podcastparser, for speedy parsing of podcasts' RSS feeds
* urllib, to obtain url stream for podcast parsing
