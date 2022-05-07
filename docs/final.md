## Final Report

**Title:** teamthree

**Subtitle:** Petstagram

**Semester:** Spring 2022

**Overview:** Petstagram is an innovative image-sharing application, similar to Instagram, but exclusively for users to share pictures of their pets. Users can like and comment on posted photos, as well as add descriptions and tags to their images when they upload them. Users can also update their own information through the profile page.

**Team Members:** Youmna Alnasrallah (@YoumnaAlNasrallah), Lucas Bertoni (@lucas-bertoni), Yuri Kim (@flffamlln), Emily Torok (@zeldagirl113)

**User Interface:** *A final up-to-date list/table describing your application’s user interface. This should include the name of the UI view and its purpose. You should include a screenshot of each of your UI views.*

**APIs:** *A final up-to-date list/table describing your application’s API*

**Database:**
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

**URL Routes/Mappings:** *A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.*

**Authentication/Authorization:** *A final up-to-date description of how users are authenticated and any permissions for specific users (if any) that you used in your application. You should mention how they relate to which UI views are accessible.*

<ins>**Breakdown of Labor for the entire project**</ins> <br>

* Lucas Bertoni
* Youmna Alnasrallah
* Yuri Kim
* Emily Torok

**Conclusion:** *A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered.*
