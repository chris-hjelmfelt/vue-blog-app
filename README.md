## Vue Blog App
A simple blogging app created using Vue, Express, and Postgres.  
(originally used a Mongodb database on Atlas sandbox at mongodb.com)


**Run backend:**
```console
> npm run dev  
```
View it at localhost:5000/api/posts  


**Run frontend:**
```console
> cd client  
> npm run serve  
```
then go to localhost:8080  


---

### Testing POST without any front end  
If GET is working correctly it should display in browser  
**Using Git Bash:**  
```console
> curl --request POST --header "Content-Type: application/json"  --data '{"title":"I am learning Curl"}' localhost:3000/api/posts  
> curl -X DELETE localhost:3000/api/posts/60a592751c83c23b18403b19  
```

**Using Windows Powershell:**  
```console
> curl --% --request POST --header "Content-Type: application/json" --data  "{\"title\":\"I like Vue\"}" localhost:3000/api/posts  
```
(on Win 10 you may need to run > Remove-item alias:curl )  


---

### Queries to Postgres table vue_blog

**Create a new table:**  
CREATE TABLE blogposts (post_id UUID PRIMARY KEY, title VARCHAR(100), author VARCHAR(100), post_body TEXT, createdAt TIMESTAMP, tags JSON)  


**Select from table:**
SELECT post_id, title, author, post_body, to_char(createdat, 'Mon DD, YYYY') as post_date, tags FROM blogposts


**Insert a new row:**  
CREATE EXTENSION "uuid-ossp";  (this is only needed in pgadmin)
INSERT INTO blogposts VALUES(uuid_generate_v4(), 'I like Vue', 'Chris H', 'Im sure that Vue is better than react for this project Im working on', NOW(), '{"tags":"coding"}')


