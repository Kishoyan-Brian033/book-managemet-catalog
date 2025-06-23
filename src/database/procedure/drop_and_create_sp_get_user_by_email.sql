DROP FUNCTION IF EXISTS sp_get_user_by_email(VARCHAR);

CREATE OR REPLACE FUNCTION sp_get_user_by_email(
    p_email VARCHAR
)
RETURNS TABLE(
    user_id INTEGER,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT id AS user_id, name, email, password, created_at, updated_at
    FROM users
    WHERE email = p_email;
END;
$$ LANGUAGE plpgsql;
