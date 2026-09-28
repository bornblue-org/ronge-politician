ALTER TABLE voter ADD COLUMN row_hash VARCHAR(64);
UPDATE voter SET row_hash = md5(id::text) WHERE row_hash IS NULL;
ALTER TABLE voter ALTER COLUMN row_hash SET NOT NULL;
CREATE UNIQUE INDEX voter_row_hash_idx ON voter (row_hash);
