CREATE OR REPLACE FUNCTION sp_get_user_by_id(
    p_user_id INTEGER
)
RETURNS TABLE(
    id INTEGER,
    email VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT id, email, created_at, updated_at
    FROM users
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;
