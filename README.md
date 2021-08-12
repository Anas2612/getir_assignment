# Getir Assignment

## Prerequisites

- [NodeJS](https://nodejs.org/en/blog/release/v12.4.0/)
- [MongoDB](https://www.mongodb.org/) 

## NPM Packages

Application

- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)

Testing

- [jest](https://www.npmjs.com/package/jest)
- [mockingoose](https://www.npmjs.com/package/mockingoose)
- [supertest](https://www.npmjs.com/package/supertest)

## End Point

Get Records
-URL `http://localhost:3000/getir/v1/getRecords`

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

**Request**


<details>
    <summary>Success Case. Click to Expand!</summary>

```
{
	"startDate": "2000-1-03",
	"endDate": "2020-1-03",
	"minCount": 3000,
	"maxCount": 10500
}
```
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
    <summary>Failure Case. Click to Expand!</summary>

```
{
	"startDate": "2016-11-022",
	"endDate": "2017-12-09"
}
```

```
{
    "code": 4,
    "msg": "Validation Error!",
    records: [],
    "error": "\"minCount\" is required"
}
```
</details>


