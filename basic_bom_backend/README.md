# Basic Bom Backend

A more detailed description of the basic bom project to come!

For now, have a look at the [API v1 docs](API_v1.md) to get a feel of what is possible!

Boring stuff below...
### Ruby version
v3.0.2

### System dependencies
- Postgress v1.2.3

### Configuration

### Database creation
```
cd basic_bom_backend
rake db:setup
```

### Database initialization
```
ruby bin/rails db:setup
```

### How to run the test suite


* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions


## Other

### Creation
This app was created with:
```
rails new basic_bom_backend --api -d=postgresql
```

### Change of database
The command `rails db:system:change --to=postgresql` was used to migrate the getting started sqlite3 database to the postgresql database adaptor thanks to [this guide](https://gorails.com/episodes/rails-6-db-system-change-command)
