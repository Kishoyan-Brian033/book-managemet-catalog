-- Create user http role
DO
\$do\$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE rolname = 'http'
   ) THEN
      CREATE ROLE http LOGIN PASSWORD 'http_password';
   END IF;
END
\$do\$;

-- Create user auth_http role
DO
\$do\$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE rolname = 'auth_http'
   ) THEN
      CREATE ROLE auth_http LOGIN PASSWORD 'auth_http_password';
   END IF;
END
\$do\$;
