GET /github - Show your data, like numbers of followers, number of following, list of your personal repositories, ets
GET /github/{repo-name} - Show data about that particular project.
POST /github/{repo-name}/issues - Take in the title and body, create an issue in the repo, and return the Github issue URL