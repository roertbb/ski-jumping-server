CREATE PROCEDURE updateClassification()
begin
  declare person integer;
  declare ranking integer default 1;
  declare finished boolean default false;
  declare crs CURSOR FOR select person_id from placements join `ski-jumpers` using (person_id) join `individual-competitions` using(competition_id) group by person_id order by (sum(points)) DESC;
  declare crs2 CURSOR FOR select person_id from `ski-jumpers` order by classification_points DESC;
  declare continue handler for not found set finished = true;
  
  -- classification points according to weird table
  -- loop over all ski jumpers - update classification points
  OPEN crs;
  classificationpointsloop: LOOP
    FETCH crs INTO person;
    IF finished THEN
      LEAVE classificationpointsloop;
    END IF;

    UPDATE `ski-jumpers` set classification_points = (
      SELECT sum(individual_points.points) from `placements` join `individual_points` on placements.place = individual_points.place join `individual-competitions` using(competition_id) where person_id = person
    ) where person_id = person;
    
  END LOOP;
  CLOSE crs;

  set finished := false;
  -- after that loop over all of them and update their place according to classification points
  OPEN crs2;
  classificationloop: LOOP
    FETCH crs2 INTO person;
    IF finished THEN
      LEAVE classificationloop;
    END IF;

    UPDATE `ski-jumpers` set classification = ranking where person_id = person; 
    set ranking := ranking + 1;
    
  END LOOP;
  CLOSE crs2;

end;