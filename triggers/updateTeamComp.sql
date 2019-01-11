CREATE TRIGGER updateResultForTeam
AFTER UPDATE ON `placements` for each row
begin
  declare teamid int;
  declare teamid2 int;
  declare personid int;
  declare competitionid int;
  declare teampoints float;
  declare finished boolean default false;
  declare ranking integer default 1;
  -- join competitiion id in order to filter out all placements in individual competitions
  declare crs2 CURSOR FOR SELECT team_id FROM `placements` join `people` using(person_id) join `team-competitions` using(competition_id) WHERE competition_id = new.competition_id group by team_id order by sum(points) DESC;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

  select team_id into teamid from `people` where person_id = new.person_id;

  -- if inserted record is for team competition...
  if ((select count(*) from `team-competitions` where competition_id = new.competition_id)) then
  begin

    -- create new result if team doesn't exists
    if ((select count(*) from `results` where team_id = teamid) = 0) then
      insert into results(team_id, competition_id) values(teamid, new.competition_id);
    end if;

    -- calculate points for team (results)
    select sum(points) into teampoints from `placements` join `people` using(person_id) where competition_id = new.competition_id and team_id = teamid;
    update `results` set points = teampoints where competition_id = new.competition_id and team_id = teamid;

    -- recalculate place for all team (results)
    OPEN crs2;
    resultloop: LOOP
      FETCH crs2 INTO teamid2; 
      IF finished THEN
        LEAVE resultloop;
      END IF;

      UPDATE `results` set place = ranking where team_id = teamid2 AND competition_id = new.competition_id;
      set ranking := ranking + 1;
      
    END LOOP;
    CLOSE crs2;

  end;
  end if;
END;