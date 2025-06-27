CREATE OR REPLACE FUNCTION sp_update_note(
    p_id INTEGER,
    p_text TEXT
)
RETURNS TABLE(id INTEGER, text TEXT, created_at TIMESTAMP, updated_at TIMESTAMP) AS $$
BEGIN
    RETURN QUERY
    UPDATE notes
    SET text = p_text, updated_at = CURRENT_TIMESTAMP
    WHERE id = p_id
    RETURNING notes.id, notes.text, notes.created_at, notes.updated_at;
END;
$$ LANGUAGE plpgsql; 