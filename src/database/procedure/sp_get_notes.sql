CREATE OR REPLACE FUNCTION sp_get_notes()
RETURNS TABLE(id INTEGER, text TEXT, created_at TIMESTAMP, updated_at TIMESTAMP) AS $$
BEGIN
    RETURN QUERY
    SELECT notes.id, notes.text, notes.created_at, notes.updated_at FROM notes ORDER BY notes.created_at DESC;
END;
$$ LANGUAGE plpgsql; 