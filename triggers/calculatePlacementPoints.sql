CREATE TRIGGER calculatePlacementPoints 
AFTER INSERT ON `series-results` for each row
begin
  declare series_points float;
  declare person integer;
  declare competition integer;
  declare ranking integer default 1;
  declare finished boolean default false;
  declare crs CURSOR FOR SELECT person_id, competition_id FROM `placements` ORDER BY points DESC;
  declare continue handler for not found set finished = true;
  
  SELECT SUM(style_points+distance_points+gate_points+wind_points) into series_points
  FROM `series-results`
  WHERE person_id=new.person_id AND competition_id=new.competition_id;

  update `placements` set points = series_points where person_id=new.person_id AND competition_id=new.competition_id;

  OPEN crs;
  placementloop: LOOP
    FETCH crs INTO person, competition;
    IF finished THEN
      LEAVE placementloop;
    END IF;

    UPDATE `placements` set place = ranking where person_id = person AND competition_id = competition;
    set ranking := ranking + 1;
    
  END LOOP;
  CLOSE crs;
END