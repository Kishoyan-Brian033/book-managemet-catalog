#!/bin/bash

echo " Setting up Book catalog......"

# Create database 
psql -U postgres -h localhost -c "CREATE DATABASE book_catalog_db;"

# Run-migration
psql -U postgres -h localhost -d book_catalog_db -f src/database/migration/001_initial_schema.sql

# Create stored procedures for books
psql -U postgres -h localhost -d book_catalog_db -f src/database/procedure/sp_create_book.sql
psql -U postgres -h localhost -d book_catalog_db -f src/database/procedure/sp_get_book.sql
psql -U postgres -h localhost -d book_catalog_db -f src/database/procedure/sp_delete_book.sql
psql -U postgres -h localhost -d book_catalog_db -f src/database/procedure/sp_update_book.sql

# Create stored procedures for users
psql -U postgres -h localhost -d book_catalog_db -f src/database/procedure/sp_get_user_by_id.sql
psql -U postgres -h localhost -d book_catalog_db -f src/database/procedure/sp_get_user_by_email.sql

# Create stored procedures for notes
psql -U postgres -h localhost -d book_catalog_db -f src/database/procedure/sp_create_note.sql
psql -U postgres -h localhost -d book_catalog_db -f src/database/procedure/sp_get_notes.sql
psql -U postgres -h localhost -d book_catalog_db -f src/database/procedure/sp_update_note.sql
psql -U postgres -h localhost -d book_catalog_db -f src/database/procedure/sp_delete_note.sql

echo "Database setup complete....."

echo "You can now run : npm run start:dev"
