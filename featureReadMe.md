User
1. POST /api/users/register - dONE
2. POST /api/users/login - dONE
3. PATCH /api/users/updateProfile - dONE (iMPROVEMENT nEEDED)
4. DELETE /api/users/deleteUser - Done
5. PATCH /api/users/logoutUser - dONE
6. POST /api/users/refreshAccessToken - Done
7. POST /api/users/resetPassword - Done
8. GET /api/users/getCurrentUser - is /me - done
9. PATCH /api/users/updateProfilePic -Done
10. POST /api/users/verify-email![alt text](image.png)  - while go with otp based varification, AWS SES, AWS SDK
11. POST /api/users/forgot-password - https://gitlab.com/users/password/edit?reset_password_token=h96DcoxQaxoSNZAmNQAX, Link based forgot password
12. GET /api/users/bookmarks
13. GET /api/users/activity
14. GET /api/users/search?q=...... search user by username, name, id

Blog
1. POST /api/blogs ![alt text](image-1.png) - image upload in medium and also it have auto save feature
the UI have a add button the image get uploaded to db and then added to UI (blog) see image to understand
generally, when user click on create blog the blog is created with id then the content is added and image uploaded to db is linked with blog id - refer to chatgpt option 2.

document all this decision in readme
2. DELETE /api/blogs/:id
3. PATCH /api/blogs/:id - Done
4. PATCH /api/blog/:id/publish - publishBlog   ![alt text](image-2.png) limit set to publish in a day (https://medium.com/p/3f49846d5ad9/publish)
5. GET /api/blogs/search?q=...... -  blog by title, author, content (Use Search Params)
6. GET /api/blogs - get all the blogs
7. GET /api/blogs/:id - get specific blog
8. POST /api/blogs/:id/bookmark - bookmark a blog
9. POST /api/blogs/:id/link - like a blog
10. POST /api/blogs/comments/:id/link - like a comment
11. POST /api/blogs/:id/comments - post a comment, reply to comment
12. GET /api/blogs/:id/comments - get all comments
13. PATCH /api/blogs/:id/unpublish
14. PATCH /api/blogs/:id/thumbnail
15. GET /api/blogs/drafts
16. POST /api/blogs/save-draft
17. GET /api/blogs?tag=tech
18. CRON JOB to notify subscriber of new blog publish from user
19. POST /api/v1/blog/:id/upload - upload images added in the blog - Done

20. /api/v1/blogs/explore-topic - return all the topics like: life, self-improvement, etc with sub-topics and also allow to search a tag/topic and this will get them to /api/v1/blogs/tag/topics(career, etc) route.
21. /api/v1/blogs/tag/topics(career, etc) - return all the blogs under this category/tag
22. /api/v1/blogs/tag/topics(career, etc) - add a option to follow the tag/topics/category
23. 

Todo
1. GET /api/todos
2. POST /api/todos - CreateTodo
3. DELETE /api/todos/:id - DeleteTodo
4. PATCH /api/todos/:id - UpdateTodo
5. GET /api/todos/:id - getTodobyID
6. GET /api/todos/search?q=........  - search todo by title or content (Use Search Params)
7. GET /api/todos?priority=high&sortBy=deadline - filter/sort todo by priority, deadline, category, last updated, created, user (Use Query Params)
8. PATCH /api/todos/:id/toggle-complete
9. PATCH /api/todos/:id/reminder
10. PATCH /api/todos/:id/archive
11. GET /api/todos?status=completed 

Finance
1. GET /api/finance/transactions/:id - get transaction by id
2. POST /api/finance/transactions - Create transaction
3. PATCH /api/finance/transactions/:id - Update transaction
4. DELETE /api/finance/transactions/:id - Delete transaction
5. GET /api/finance/transactions?month=....&Catrgory=...... - Filter and get transaction by month, quarter, year, category
6. GET /api/finance/transactions?month=....  - Generate monthly report and mail 
7. Send notification to enter daily transaction (Cron job/scheduler)
8. POST /api/finance/transaction/import - Feature to load CSV with transaction data
9. GET /api/finance/transactions/export?format=csv|xlsx
10. POST /api/finance/transactions/recurring
11. GET /api/finance/summary?month=...
12. GET /api/finance/categories
13. POST /api/finance/categories
14. PATCH /api/finance/categories
15. DELETE /api/finance/categories

Resume
1. POST api/resume/education - add education, certification, experience, project, etc details
2. POST api/resume/certification
3. POST api/resume/experience
4. POST api/resume/project
5. POST api/resume/skills
6. DELETE api/resume/education 
7. DELETE api/resume/certification
8. DELETE api/resume/experience
9. DELETE api/resume/project
10. PATCH api/resume/skills  
11. PATCH api/resume/education 
12. PATCH api/resume/certification
13. PATCH api/resume/experience
14. PATCH api/resume/project
15. PATCH api/resume/skills  
16. GET api/resume - get all the data about a user
17. GET api/resume/:SECTION  - get specific data about a user
18. GET /api/resume/preview
19. GET /api/resume/export?format=pdf|docx
20. POST /api/resume/upload

Github
GET /github - Show your data, like numbers of followers, number of following, list of your personal repositories, ets - https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
GET /github/{repo-name} - Show data about that particular project. - https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#update-a-repository
POST /github/{repo-name}/issues - Take in the title and body, create an issue in the repo, and return the Github issue URL - https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#create-an-issue

1. Controller - 
2. db - 
3. middlewares - 
4. repositories - 
5. routes - 
6. services - 
7. types - 
8. utils - 


Spotify

https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback
https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback


integrating password login with oauth login:
1. 



