# Getir Assignment

This App is Hosted on Heroku and demonstrate a Node Application using Express and Mongo 

<hr>

## Prerequisites

- [NodeJS](https://nodejs.org/en/blog/release/v12.4.0/)
- [MongoDB](https://www.mongodb.org/) 

<hr>

## NPM Packages

Application

- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)

Testing

- [jest](https://www.npmjs.com/package/jest)
- [mockingoose](https://www.npmjs.com/package/mockingoose)
- [supertest](https://www.npmjs.com/package/supertest)

<hr>

## End Point

<hr>

Get Records

Hosted URL `https://getir-assignment-anas.herokuapp.com/getir/v1/getRecords`

<hr>

## Running the application on Local Machine

*Set these vars in .env* 

```shell
PORT=3000
MONGODB_URL=MONGODB_URI
```

```shell
npm i
npm run dev
```
for lint errors

```shell
npm run lint:fix
```

## Test

```shell
npm run test
```
<hr>

## Request Documentation - getir/v1/getRecords


<details>
    <summary>Success Case Get Records . Click to Expand!</summary>

Request Body
```
{
	"startDate": "2000-1-03",
	"endDate": "2020-1-03",
	"minCount": 3000,
	"maxCount": 10500
}
```
Response Body
```
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "PVLFLSNw",
            "createdAt": "2016-12-30T04:51:57.295Z",
            "totalCount": 4184
        }
    ]
}    
```
</details>


<details>
    <summary>Failure Case Not Found End Point. Click to Expand!</summary>

Request Body
```
{
	"startDate": "2000-1-03",
	"endDate": "2020-1-03",
	"minCount": 3000,
	"maxCount": 10500
}
```
Response Body
```
{
    "code": -1,
    "msg": "Not Found"
}
```
</details>

<details>
    <summary>Failure Case Get Records - Invalid Body. Click to Expand!</summary>

Request Body
```
{
	"startDate": "2016-11-022",
	"endDate": "2017-12-09"
}
```
Response Body
```
{
    "code": 4,
    "msg": "Validation Error!",
    records: [],
    "error": "\"minCount\" is required"
}
```
</details>

<hr>

## Error Codes

| Error Code  | Explanation  |
| ------------- | -----------
| 0  | Success |
| 4  | Validation Error | 
| 5  | Internal Server Error | 
| -1 | Not Found |



