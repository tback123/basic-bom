## PREAMBLE

The entire application is contained within the `basic_bom_backend` file.

`config/database.yml` outlines the connection to a postgress database.

## Setup
See [README.md](README.md) for setup & startup information

## Models
Below describes some standard models that are used throuhgout the request and response section of this API. Note these models are described in JSON format.

### Part
A part has the following fields that can be created, updated or queried.
```JSON
{
    "description": string,
    "drawing": boolean,
    "part_num": string,
    "revision": int,
    "qty_per": int,
    "order_qty": int,
    "design_eng_comments": string,
    "stock": int,
    "type": ["component", "int_assembly", "ext_assembly", "installation"]
}
```
The database stores this model with some additional fields which are returned when a part model is queried.
``` JSON
{
    "id": int,
    "created_at": string,
    "updated_at": string
}
```
Therefore the total returned model for a part is:
```JSON
{
    "id": int,
    "description": string,
    "drawing": boolean,
    "part_num": string,
    "revision": int,
    "qty_per": int,
    "order_qty": int,
    "design_eng_comments": string,
    "stock_qty": int,
    "type": ["component", "int_assembly", "ext_assembly", "installation"],
    "created_at": string,
    "updated_at": string
}
```

# REST API

The REST API to v1 of the basic bom backend.

Note that this document is only for api version v1 and the paths described below are assumed to all be prefixed with `{domain}/api/v1/{method}` where `method` is described as below

> These examples assume the test developmemt server is run on the same local host as testing

## Get all parts

### Request

|TYPE|PATH|PARAMETRES|BODY|
|----|----|----------|----|
|GET|`/parts`|n/a|n/a|


### Response
JSON List of parts, e.g.
```JSON
[
    {
        "id": 26,
        "description": "this is a test description",
        "drawing": true,
        "created_at": "2021-08-26T11:22:13.471Z",
        "updated_at": "2021-08-26T11:22:13.471Z"
    },
    {
        "id": 27,
        "description": "this is a test description 2",
        "drawing": false,
        "created_at": "2021-08-26T11:22:20.894Z",
        "updated_at": "2021-08-26T11:22:20.894Z"
    }
]

```

## Create a new Part

### Request

|TYPE|PATH|PARAMETRES|BODY|
|----|----|----------|----|
|POST|`/parts`|n/a| Requires all fields of a part|


### Response
The created part. E.g.
```JSON
{
    "id": 28,
    "description": "this is a test description 3",
    "drawing": false,
    "created_at": "2021-08-26T11:23:45.874Z",
    "updated_at": "2021-08-26T11:23:45.874Z"
}
```
## Update a part

### Request

|TYPE|PATH|PARAMETRES|BODY|
|----|----|----------|----|
|PATCH|`/parts/id`|n/a| Key value pairs to update with updated value |


### Response
The updated part. E.g.
```JSON
{
    "description": "updated description",
    "id": 28,
    "drawing": false,
    "created_at": "2021-08-26T11:23:45.874Z",
    "updated_at": "2021-08-26T11:32:14.921Z"
}
```

## Delete a part

### Request

|TYPE|PATH|PARAMETRES|BODY|
|----|----|----------|----|
|DELETE|`/parts/id`|n/a| n/a |


### Response
The updated part. E.g.
```JSON
{
    "status": "success"
}
```