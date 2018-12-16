CREATE PROCEDURE updateClassification()
begin
  declare person integer;
  declare competition integer;
  declare ranking integer default 1;
  declare finished boolean default false;
  declare crs CURSOR FOR select person_id from placements join `ski-jumpers` using (person_id) join `individual-competitions` using(competition_id) group by person_id order by (sum(points)) DESC;
  declare continue handler for not found set finished = true;
  OPEN crs;
  placementloop: LOOP
    FETCH crs INTO person;
    IF finished THEN
      LEAVE placementloop;
    END IF;

    UPDATE `ski-jumpers` set classification = ranking where person_id = person;
    set ranking := ranking + 1;
    
  END LOOP;
  CLOSE crs;
end;