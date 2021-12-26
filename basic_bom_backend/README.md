# Basic Bom Backend

A more detailed description of the basic bom project to come!

For now, have a look at the [API v1 docs](API_v1.md) to get a feel of what is possible!

Boring stuff below...
### Ruby version
v3.0.2

### System dependencies
- Postgress v1.2.3
- Ruby 


## Setup
1. Install all gem dependencies
```
cd basic_bom_backend
bundle install
```
> Note: sometimes the pggem (postgress gem) doesn't install correctly, have a ook at this fix here which installed via migwin [TODO]

2. Configure the database according to the login information in `config/database.yml`
3. initialise the database with the required schema
```
ruby bin/rails db:setup
```
4. Run the server
```
ruby bin/rails server
```

> use the `-p 3001` flag to set the port to 3001


### How to run the test suite [TODO]


* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions


## API Doumentation
The documentation for this project uses the swagger standard. The project uses the `rswag` gem library to generate specification files in `spec/requests/<controllers>`. 

This project ships with a built in version of the swagger UI avaliable at `localhost:3000/api-docs` after starting the application.

The lastest version of the API can also be found here. [TODO]

### Changing the API Documentation
1. Adjust the documentation in `config/requests/<controller>.rb`
2. Regenerate the spec file
```
ruby bin/rails rswag
```

Once starting the server, the documentation should now be avaliable on `/api-docs`

### Creation
This app was created with:
```
rails new basic_bom_backend --api -d=postgresql
```

### Change of database
The command `rails db:system:change --to=postgresql` was used to migrate the getting started sqlite3 database to the postgresql database adaptor thanks to [this guide](https://gorails.com/episodes/rails-6-db-system-change-command)


