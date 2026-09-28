CREATE TABLE teacher_problem (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  district VARCHAR(40) NOT NULL,
  school VARCHAR(300),
  topic VARCHAR(80) NOT NULL,
  detail TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE news_story (
  id VARCHAR(40) PRIMARY KEY,
  title_mr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_mr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  banner VARCHAR(300) NOT NULL,
  story_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE news_image (
  id BIGSERIAL PRIMARY KEY,
  story_id VARCHAR(40) NOT NULL REFERENCES news_story(id) ON DELETE CASCADE,
  path VARCHAR(300) NOT NULL,
  sort_order INT NOT NULL
);

CREATE TABLE voter (
  id BIGSERIAL PRIMARY KEY,
  district VARCHAR(40) NOT NULL,
  part_no VARCHAR(20) NOT NULL,
  serial_no INT NOT NULL,
  name VARCHAR(300) NOT NULL,
  relative_name VARCHAR(300),
  address TEXT,
  institute VARCHAR(400),
  age INT,
  gender VARCHAR(10),
  epic_no VARCHAR(30),
  CONSTRAINT voter_part_serial UNIQUE (district, part_no, serial_no)
);

CREATE INDEX voter_name_idx ON voter (lower(name));
CREATE INDEX voter_part_idx ON voter (district, part_no);
