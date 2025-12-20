Set rules to maintain consistency in error message, success messaged and data return to frontend. Also 


IMP:   Before start write business logic and controllers, please write test condition for the same. As this will help in building better error handling and getting through the edge cases which can be exploited or lead to a bug in program.

https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/


Code	Constant
100	CONTINUE
101	SWITCHING_PROTOCOLS
102	PROCESSING
103	EARLY_HINTS
200	OK
201	CREATED
202	ACCEPTED
203	NON_AUTHORITATIVE_INFORMATION
204	NO_CONTENT
205	RESET_CONTENT
206	PARTIAL_CONTENT
207	MULTI_STATUS
300	MULTIPLE_CHOICES
301	MOVED_PERMANENTLY
302	MOVED_TEMPORARILY
303	SEE_OTHER
304	NOT_MODIFIED
305	USE_PROXY
307	TEMPORARY_REDIRECT
308	PERMANENT_REDIRECT
400	BAD_REQUEST
401	UNAUTHORIZED
402	PAYMENT_REQUIRED
403	FORBIDDEN
404	NOT_FOUND
405	METHOD_NOT_ALLOWED
406	NOT_ACCEPTABLE
407	PROXY_AUTHENTICATION_REQUIRED
408	REQUEST_TIMEOUT
409	CONFLICT
410	GONE
411	LENGTH_REQUIRED
412	PRECONDITION_FAILED
413	REQUEST_TOO_LONG
414	REQUEST_URI_TOO_LONG
415	UNSUPPORTED_MEDIA_TYPE
416	REQUESTED_RANGE_NOT_SATISFIABLE
417	EXPECTATION_FAILED
418	IM_A_TEAPOT
419	INSUFFICIENT_SPACE_ON_RESOURCE
420	METHOD_FAILURE
421	MISDIRECTED_REQUEST
422	UNPROCESSABLE_ENTITY
423	LOCKED
424	FAILED_DEPENDENCY
426	UPGRADE_REQUIRED
428	PRECONDITION_REQUIRED
429	TOO_MANY_REQUESTS
431	REQUEST_HEADER_FIELDS_TOO_LARGE
451	UNAVAILABLE_FOR_LEGAL_REASONS
500	INTERNAL_SERVER_ERROR
501	NOT_IMPLEMENTED
502	BAD_GATEWAY
503	SERVICE_UNAVAILABLE
504	GATEWAY_TIMEOUT
505	HTTP_VERSION_NOT_SUPPORTED
507	INSUFFICIENT_STORAGE
511	NETWORK_AUTHENTICATION_REQUIRED



REST API route naming conventions focus on clarity, consistency, and resource-oriented design. Adhering to these conventions improves readability and ease of use for developers interacting with the API.
Key Principles:

    Use Nouns for Resources:
    URIs should represent resources (entities) using nouns, not verbs. HTTP methods (GET, POST, PUT, DELETE) define the action.
        Good: /users, /products
        Bad: /getUsers, /createProduct 
    Use Plural Nouns for Collections:
    When representing a collection of resources, use plural nouns. For a single instance, either use a singular noun (if the resource is inherently singular) or access it via its ID within the plural collection.
        Collection: /users, /products
        Single Resource: /users/{id}, /products/{id} 
    Use Lowercase and Hyphens:
    All URI paths should be lowercase. Use hyphens (-) to separate words for improved readability (kebab-case). Avoid underscores (_) or camelCase.
        Good: /user-profiles, /order-items
        Bad: /user_profiles, /userProfiles 
    Structure Hierarchically:
    Reflect the relationships between resources using forward slashes (/) to indicate hierarchy.
        Example: /users/{userId}/orders, /products/{productId}/reviews 
    Avoid File Extensions:
    Do not include file extensions (e.g., .json, .xml) in the URI. Content type negotiation using the Accept header handles data format.
    Version Your API:
    Include a version in the base path to allow for future API evolution without breaking existing clients.
        Example: /v1/users, /api/v2/products 
    Use Query Parameters for Filtering, Sorting, and Pagination:
    These operations should be handled through query parameters, not by creating separate endpoints.
        Example: /products?category=electronics&sort=price_asc, /users?page=2&limit=10

       how to update:
       1. ssh into serve
       2. cd to the project folder
       3. git pull origin
       4. pm2 kill
       5. npm install
       6. tsc
       7. pm2 start ./dist/src/index.js



       
/* Register
    1. User click on sign-up
    2. user given option to create profile with details like username, email, password, etc (include info necessary for login)
    3. this info will be send through body
    4. take the info from body into variables
    5. search the db with given details to find existing user
    6. if not found then create the user
    7. and store the data in db
    8. send back the necessary info back to user    
    */

/* Login:
1. user send email/username and password through header or body
2. we will verify the username/email and password
3. then if the user is available and password is correct then generate a access and refresh token
4. save the refresh token in db
5. send the access and refresh t
 through cookies
*/

/* updateProfile
    1. here useR can update his/
    profile info like: email, bio, username, first and last name 
    2. then check for the update
    de the user
    3. and make update in db 
    4. return the changes and de
    s with success message

*/