CREATE OR REPLACE FUNCTION sp_delete_note(
    p_id INTEGER
)
RETURNS TABLE(id INTEGER, text TEXT, created_at TIMESTAMP, updated_at TIMESTAMP) AS $$
BEGIN
    RETURN QUERY
    DELETE FROM notes
    WHERE id = p_id
    RETURNING notes.id, notes.text, notes.created_at, notes.updated_at;
END;
$$ LANGUAGE plpgsql; 