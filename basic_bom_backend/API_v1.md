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
    "location": int - location_id
    "supplier": int - supplier_id
    "material": int - material_id,
    "bom_type": ["component", "assembly", "installation"],
    "source": ["internal", "external"]
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
    "bom_type": ["component", "assembly", "installation"],
    "source": ["internal", "external"]
    "created_at": string,
    "updated_at": string
}
```

# REST API

The REST API to v1 of the basic bom backend.

Note that this document is only for api version v1 and the paths described below are assumed to all be prefixed with `{domain}/api/v1/{method}` where `method` is described as below


|TYPE       |PATH                           | DESCRIPTION                                       |QUERY PARAMETERS           |BODY                                   |Response                               |
|-----------|-----------------------        |-----------------------------------                |---------------------------|-----------------------                |---------------------------------------|
|GET        |`/parts`                       |Gets a list of all parts                           |None                       |None                                   |List of json parts                     |
|POST       |`/parts`                       |Creates a new part                                 |None                       |All attributes of a part               |The created object or error object     |
|GET        |`/parts/:id`                   |Get a specific part                                |None                       |None                                   ||
|PATCH      |`/parts/:id`                   |Updates a specific part                            |None                       |The attributes of the part to update   ||
|DELETE     |`/parts/:id`                   |Delete a specific part                             |None                       |None                                   ||
|GET        |`/parts/:part_id/children`     |Gets a list of all child parts for a given part id |None                       |None                                   ||
|PUT        |`/parts/:part_id/children`     |Create a new child for a given part                |None                       |`child_id: int`                        ||
|DELETE     |`/parts/:part_id/children`     |Deletes a child and relation of part.              |None                       |`child_id: int`                        ||
|GET        |`/parts/:part_id/parents`      |Gets a list of all parent parts for a given part id|None                       |None                                   ||
|PUT        |`/parts/:part_id/parents`      |Create a new parent for a given part               |None                       |`parent_id: int`                       ||
|DELETE     |`/parts/:part_id/parents`      |Deletes a parent and relation of part              |None                       |`parent_id: int`                       ||
|           |                               |                                                   |None                       |                                       ||
|GET        |`/materials`                   |Get a list of all materials                        |None                       |None                                   ||
|POST       |`/materials`                   |Create a new material                              |None                       |All attributes of a material           ||
|GET        |`/materials/:id`               |Get a specific material                            |None                       |None                                   ||
|PATCH      |`/materials/:id`               |Update a specific material                         |None                       |Attributes of the material to update   ||
|DELETE     |`/materials/:id`               |Delete a specific material                         |None                       |None                                   ||
|GET        |`/materials/:material_id/parts`|Get a list of all parts with this material         |None                       |None                                   ||
|           |                               |                                                   |None                       |                                       ||
|GET        |`/locations`                   |Get a list of all locations                        |None                       |None                                   ||
|POST       |`/locations`                   |Create a new location                              |None                       |All attributes of a location           ||
|GET        |`/locations/:id`               |Get a specific location                            |None                       |None                                   ||
|PATCH      |`/locations/:id`               |Update a specific location                         |None                       |Attributes of the location to update   ||
|DELETE     |`/locations/:id`               |Delete a specific location                         |None                       |None                                   ||
|GET        |`/locations/:location_id/parts`|Get a list of all parts with this location         |None                       |None                                   ||
|           |                               |                                                   |None                       |                                       ||
|GET        |`/suppliers`                   |Get a list of all suppliers                        |None                       |None                                   ||
|POST       |`/suppliers`                   |Create a new supplier                              |None                       |All Attributes of a supplier           ||
|GET        |`/suppliers/:id`               |Get a specific supplier                            |None                       |None                                   ||
|PATCH      |`/suppliers/:id`               |Update a specific supplier                         |None                       |Attributes of a supplier to update     ||
|DELETE     |`/suppliers/:id`               |Delete a specific supplier                         |None                       |None                                   ||
|GET        |`/suppliers/:supplier_id/parts`|Get a list of all parts with this supplier         |None                       |None                                   ||
|           |                               |                                                   |None                       |                                       ||

