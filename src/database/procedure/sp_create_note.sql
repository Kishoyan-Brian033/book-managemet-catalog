CREATE OR REPLACE FUNCTION sp_create_note(
    p_text TEXT
)
RETURNS TABLE(id INTEGER, text TEXT, created_at TIMESTAMP, updated_at TIMESTAMP) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO notes (text)
    VALUES (p_text)
    RETURNING notes.id, notes.text, notes.created_at, notes.updated_at;
END;
$$ LANGUAGE plpgsql; 