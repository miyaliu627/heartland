## Inspiration
We were inspired by the Pixar movie "Inside Out," specifically how they structured memories in different locations in Riley's mind world.

## What it does
Heartland is a online, visual world that stores memories in the form of journal entries and/or photographs. Upon logging in, you enter your own private world of floating islands, each island representing a core aspect of your identity -- culture, community, or personal growth, for instance. You can choose to browse and relive the memories residing on each island, reconnecting with your formative experiences. Or, you can add new meaningful memories as well.

## How we built it
**Frontend**: 
The beating heart of this application is the rotating 3D map for the homepage. This interface was made possible with the help of ThreeJS. We used Blender to modify the images and React for the web framework. We also used Tailwind CSS for simpler styling.

**Backend**: 
All of the data is stored safely in the cloud. We use Microsoft Azure for communication with the cloud, Firebase for user authentication, and Postgres for our database.

## Challenges we ran into
One of the first challenges we ran into was getting the 3D map rendered in React. React is not known for being a game-friendly framework, especially with rendering 3D models, and we were worried about the integration of complex visuals with React components. One of our members, Iris, spent many hours doing research on the best libraries to use, and finally settled on ThreeJS. It took even more time to get the entire 3D world to display on a webpage, but eventually, it was accomplished!

We ran into a major challenge on the first day, deep into our project. One of our team members was having issues with the repository after rebasing the main branch, to the point where she had to entirely delete and re-clone the repository. Even this approach didn't work: After cloning the repository, the terminal would give an error saying that it was unable to check into the branch. It took several painstaking hours of tedious debugging, constant restarts, and fruitless Google searches to find out that the issue was actually that the last member who had pushed to the main branch had included a folder that should've been in a gitignore. This would not have truly been an issue if everyone's laptops had been working on the same operating system; the one team member who was struggling, however, was the only person using Windows instead of MacOS. We finally were able to delete the troublesome folder and establish a .gitignore so we wouldn't run into that issue again.

## Accomplishments that we're proud of
We are incredibly proud that we were able to figure out such a complex interface in such a short amount of time. Iris, who is interested in game development, is proud of her ability to quickly learn how to work with 3D models using Blender and ThreeJS. Elysia is proud of learning how to center a div (most of the time). Miya is proud of getting to practice her backend skills, trying out a new database (Postgres) and cloud services application (Microsoft Azure). Chelsey is proud of the breadth of the knowledge she was able to contribute, from front-end work, to back-end support, to a masterful creation of a stunning demo video.

## What we learned
We learned that we can accomplish a lot of things pretty fast, with enough dedication. We also grew more confidence in our abilities to learn and implement new tools.

## What's next for Heartland
We plan on adding the option for customization of island categories, so users have more creativity to explore different facets of their identity.

Credits to https://www.youtube.com/watch?v=FkowOdMjvYo&t=5544s for the tutorial on building a website with ThreeJS!
