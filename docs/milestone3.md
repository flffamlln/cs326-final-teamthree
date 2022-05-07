## Milestone 3

#### Database documentation:
users table
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

posts table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| post_id      | integer   | The id of a post         |
| user_id | integer   | The user id of the poster |
| picture_path | string   | The path to the post image |
| description | string | The caption of the post |
| tag | string | The animal the post image contains |

comments table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| comment_id      | integer   | The id of a comment         |
| post_id | integer   | The post id of the post it was commented on |
| user_id | integer | The user id of the commenter |
| comment | string | The comment message |

likes table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| like_id      | integer   | The id of a like         |
| post_id | integer   | The post id of the post the like is for |
| user_id | integer | The user id of the person who liked the post |

<ins>**Breakdown of Labor for Milestone 3**</ins> <br>

* Lucas Bertoni
* - Implemented the PostgreSQL database schema
* - Implemented the server connection to the database
* - Implemented uploading a user's profile picture
* - Implemented updating a user's information, including changing password
* - Implemented displaying a feed of a user's posts on their profile page
* - Implemented displaying a specific post (picture, likes, comments) on a user's profile page
* Youmna Alnasrallah - worked on the authentication of the login and sign up pages. 
* Yuri Kim - built fullstack functionality of uploading a post (image saving, description, tag, poster), viewing a post's details (postingPhoto), likes and comments
* Emily Torok
