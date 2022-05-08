## Final Report

**Title:** teamthree

**Subtitle:** Petstagram

**Semester:** Spring 2022

**Overview:** Petstagram is an innovative image-sharing application, similar to Instagram, but exclusively for users to share pictures of their pets. Users can like and comment on posted photos, as well as add descriptions and tags to their images when they upload them. Users can also update their own information through the profile page.

**Team Members:** Youmna Alnasrallah (@YoumnaAlNasrallah), Lucas Bertoni (@lucas-bertoni), Yuri Kim (@flffamlln), Emily Torok (@zeldagirl113)

**User Interface:** <br>
Login: Login page a user is redirected to if they are not loggined in yet. <br>
<img src="..\final-UI\login.PNG" width="500"><br> <br>

Sign up: Sign up page a user is redirected to if sign up button clicked. <br>
<img src="..\final-UI\signup.PNG" width="500"><br> <br>

Forgot password: A page a user is redirected to if forgot password button clicked. <br>
<img src="..\final-UI\forgotPassword.PNG" width="500"><br> <br>

Feed: A page a user is shown once logged in. Shows all posts every created. Allows users to sort posts by tag.<br>
<img src="..\final-UI\feed.PNG" width="500"><br>
<img src="..\final-UI\feed1.PNG" width="500"><br>
<img src="..\final-UI\feed2.PNG" width="500"><br> <br>

Post View: A page where a user can view a specific post's data and like a post or add a comment to it. <br>
<img src="..\final-UI\postView.PNG" width="500"><br> <br>

Upload Photo: A page where a user can create a post with their image, description and tag. <br>
<img src="..\final-UI\uploadPhoto.PNG" width="500"><br> <br>

Profile: A profile page of the user that is loggined in displaying their user data. Can click on a post to view post data. <br>
<img src="..\final-UI\profile.PNG" width="500"><br> <br>
<img src="..\final-UI\editProfile.PNG" width="500"><br> <br>
<img src="..\final-UI\profilePostView.PNG" width="500"><br> <br>

**APIs:**
<img src="..\api planning\POSTS_FINAL.png"><br>
<img src="..\api planning\USER_FINAL.png"><br>

**Database:**
Users table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| user_id      | integer   | The id of a user         |
| email | string   | The email of a user |
| password | string | The password of a user |
| first_name | string | The first name of a user |
| last_name | string | The last name of a user |
| username | string | The username of a user |
| pp_path | string | The path to the user's profile photo |
| created_on | timestamp | The date the user was created |

Posts table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| post_id      | integer   | The id of a post         |
| user_id | integer   | The user id of the poster |
| picture_path | string   | The path to the post image |
| description | string | The caption of the post |
| tag | string | The animal the post image contains |

Comments table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| comment_id      | integer   | The id of a comment         |
| post_id | integer   | The post id of the post it was commented on |
| user_id | integer | The user id of the commenter |
| comment | string | The comment message |

Likes table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| like_id      | integer   | The id of a like         |
| post_id | integer   | The post id of the post the like is for |
| user_id | integer | The user id of the person who liked the post |

**URL Routes/Mappings:** <br>
<img src="..\URLroutes\get.PNG" width="350"><br>
<img src="..\URLroutes\post.PNG" width="350"><br>
<img src="..\URLroutes\put.PNG" width="350"><br>

**Authentication/Authorization:** <br>
*A final up-to-date description of how users are authenticated and any permissions for specific users (if any) that you used in your application. You should mention how they relate to which UI views are accessible.*
- In our application, users can sign up with a username, first name, last name, and password. We save the users information in a query database. A few things that are not allowed when signing up are using the email more than once or using a password that contains less than 6 characters. I struglled with the authentication part for the login part so it is not completly functional. However, the attempt was to make sure the email used to login matches the email we have in our database and check if the hashedpassword matches that user. Then we get the password from the user and ensure that it matches the email to log in. 

<ins>**Breakdown of Labor for the entire project**</ins> <br>

* Lucas Bertoni - Implemented all functionality related to the user's profile page as well as HTML/CSS
   - Updating a user's profile information (first name, last name, email, password, profile picture)
   - Displaying a user's posts
   - Displaying previews of a user's posts when one is clicked on
* Youmna Alnasrallah - Implemented the functionality related to the login and sign up page and the HTML/CSS for these pages
* Yuri Kim - Implemented functionality to uploading a post (image saving, description, tag, poster), viewing a post's details (postingPhoto), likes and comments
* Emily Torok - Implemented all functionality relating to the home page - CSS/HTML, server + CRUD operations, and back-end functionality.

**Conclusion:** Through developing Petstagram for our CS326 final project, we were able to learn so much about how a fullstack application is developed from start to finish including interactions from client to server to database as well as how to develop software in a team setting. Some struggles we faced throughout this semester included merge conflicts and finding time that aligns with everyone's schedules along with learning PSQL + using PGAdmin, node.js, ExpressJS and deployment for Heroku as these were new to many of us and working through debugging our API. However, we have learned a ton about building software and to have it working is a huge win for us, despite not having user authentication work completely. <br>

**Rubric:**
<img src="..\final-UI\gradingrubric.png">
