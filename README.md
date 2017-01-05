[![Build Status](https://travis-ci.org/FoodDudes/WikiDiet.svg?branch=testing)](https://travis-ci.org/FoodDudes/WikiDiet)
[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge&style=flat)](https://wikidiet.herokuapp.com/projects.html)

# WikiDiet
Enter, track and report on food you eat

#### Authors
[John Gothro](https://github.com/JPGothro), [Mugsy Carter](https://github.com/MugsyCarter), [Nathan Pickard](https://github.com/NathanPickard), and [AJ Reel](https://github.com/Waxhoya)

### Purpose 

This App is designed to make tracking the foods you eat easy. 

### Continious Integration/Continious Deployment

Our app makes use of git webhooks, travis-ci, and Heroku pipelines to automate testing and deployment. 

### Database 

Our database self populates itself based on user requests. If an item is not in our DB it attempts to get information from a third party and if successful a new entry is created.


