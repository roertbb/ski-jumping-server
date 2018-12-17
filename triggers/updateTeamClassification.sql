CREATE PROCEDURE updateTeamClassification()
begin
  declare teamid integer;
  declare ranking integer default 1;
  declare finished boolean default false;
  declare crs CURSOR FOR select team_id from `results` group by team_id order by (sum(points)) desc;
  declare crs2 CURSOR FOR select team_id from teams order by classification DESC;
  declare continue handler for not found set finished = true;
  
  -- classification points according to weird table
  -- loop over all teams - update classification points
  OPEN crs;
  classificationpointsloop: LOOP
    FETCH crs INTO teamid;
    IF finished THEN
      LEAVE classificationpointsloop;
    END IF;

    update `teams` set classification_points = (
        SELECT sum(team_points.points) from `results` join `team_points` on results.place = team_points.place where team_id = teamid
    ) where team_id = teamid;
    
  END LOOP;
  CLOSE crs;

  set finished := false;
  -- after that loop over all of them and update their place according to classification points
  OPEN crs2;
  classificationloop: LOOP
    FETCH crs2 INTO teamid;
    IF finished THEN
      LEAVE classificationloop;
    END IF;

    UPDATE `teams` set classification = ranking where team_id = teamid; 
    set ranking := ranking + 1;
    
  END LOOP;
  CLOSE crs2;

end;