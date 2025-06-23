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
    SELECT 
        users.id AS user_id, 
        users.name, 
        users.email, 
        users.password, 
        users.created_at, 
        users.updated_at
    FROM users
    WHERE users.email = p_email;
END;
$$ LANGUAGE plpgsql;