
# HealConnect

This is the Web Service for a website Heal Connect. Heal Connect is  a website that connects the health care professionals to the people who are in need of a health care. 

- this is the backend code of the the website HealConnect

- This Webservice has a fully functional REST api that is build using the MVC architecture which also contains the advanced API features like Advanced Filtering , sorting 

- In this payments are integrated using stripe(a third party payment gateway) which is used by the users for hiring the health care professionals

- In this we also included the Phone Number authentication which is enabled to verify users.

- this webservice is depolyed on Render
## API Reference

### RESTful API of Nurses

#### Get all nurses

```http
  GET /api/nurses
```


#### Get Nurse By Id

```http
/api/nurses/${id}
```

#### Recieving data of nurse from  frontend after the Registration of Nurse

```http
  POST /api/nurses
```

```json
 {
        "name": "",
        "age": ,
        "sex": "",
        "address": {
            "street": "",
            "city": "",
            "state": "",
            "zip": ""
        },
        "email": "",
        "aadharCard": "",
        "previousWorkExperience": "",
        "typeofcare":"",
        "subcare":[""],
        "cv": "Link to CV or CV data 1",
        "education": [
            {
                "collegeName": "",
                "yearOfPassing": 
            }
        ],
        "stateCouncil": "",
        "councilRegistrationNumber": ""
}
```

#### Editing the Data of Nurse

```http
  PATCH /api/nurses/${id}
```

#### Deletion of Nurse Profile

```http
  DELETE /api/nurses/
```


### Twilio API Reference

#### Signup for Users
```http
  POST /api/user/signup
```

```json
{
    "username":"",
    "number":""
}
```

#### Signup/ Verify

```http
  POST /api/user/signup/verify
```

```json
{
    "otp":""
}
```

#### Signin For Users


```http
  POST /api/user/signin
```

```json
{
    "number":""
}
```

#### Signin / Verify

```http
  POST /api/user/signin/verify
```

```json
{
    "otp":""
}
```

### Stripe API

```http
  POST /api/create-checkout-session
```

```json
{
"nurse":{
   "_id": "",
    "name": ""
}
}
```
## Authors

- [@neelamnagarajgithub(me)](https://www.github.com/neelamnagarajgithub)


## Deployment

The project is Depoyed on Render.



[https://healconnectserver.onrender.com/](https://healconnectserver.onrender.com/)


To run this project locally ,run the following command in your terminal

```bash
  npm start
```
