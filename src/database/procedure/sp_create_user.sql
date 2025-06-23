CREATE OR REPLACE FUNCTION sp_create_user(
    p_name VARCHAR,
    p_email VARCHAR,
    p_password VARCHAR,
    p_created_at TIMESTAMP,
    p_updated_at TIMESTAMP
)
RETURNS TABLE (
    id INT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
    INSERT INTO users (name, email, password, created_at, updated_at)
    VALUES (p_name, p_email, p_password, p_created_at, p_updated_at)
    RETURNING users.id, users.name, users.email, users.password, users.created_at, users.updated_at
    INTO id, name, email, password, created_at, updated_at;
    RETURN NEXT;
END;
$$ LANGUAGE plpgsql;
