CREATE PROCEDURE updatePlacement(IN comp_id INTEGER)
begin
  declare person integer;
  declare competition integer;
  declare ranking integer default 1;
  declare finished boolean default false;
  declare crs CURSOR FOR SELECT person_id FROM `placements` WHERE competition_id = comp_id and points is not null ORDER BY points DESC;
  declare continue handler for not found set finished = true;
  OPEN crs;
  placementloop: LOOP
    FETCH crs INTO person;
    IF finished THEN
      LEAVE placementloop;
    END IF;

    UPDATE `placements` set place = ranking where person_id = person AND competition_id = comp_id;
    set ranking := ranking + 1;
    
  END LOOP;
  CLOSE crs;
end;