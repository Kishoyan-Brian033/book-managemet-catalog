
#!/bin/bash

echo " Setting up Book catalog......"

# Create database 
psql -U postgres -h localhost -c "CREATE DATABASE book_catalog;"

# Run-migration
psql -U postgres -h localhost -d book_catalog -f src/database/migration/001_initial_schema.sql

# Create stored procedures
psql -U postgres -h localhost -d book_catalog -f src/database/procedure/sp_create_book.sql
psql -U postgres -h localhost -d book_catalog -f src/database/procedure/sp_get_book.sql
psql -U postgres -h localhost -d book_catalog -f src/database/procedure/sp_delete_book.sql
psql -U postgres -h localhost -d book_catalog -f src/database/procedure/sp_update_book.sql



echo "Database setup complete....."

echo "You can now run : npm run start:dev"
