# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

### Ruby version
v3.0.2

### System dependencies
- Postgress vX.X.X

### Configuration

### Database creation
`cd basic_bom_backend`
`rake db:setup`

### Database initialization
`rake db:setup`

### How to run the test suite


* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## Other

## Change of database
The command `rails db:system:change --to=postgresql` was used to migrate the getting started sqlite3 database to the postgresql database adaptor thanks to [this guide](https://gorails.com/episodes/rails-6-db-system-change-command)
