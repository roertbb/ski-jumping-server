CREATE TRIGGER insertResultForTeam
AFTER INSERT ON `series-results` for each row
begin
  declare teamid int;
  declare personid int;
  declare competitionid int;
  declare teampoints int;

  -- create new result if team doesn't exists
  select team_id into teamid from `people` where person_id = new.person_id;
  if ((select count(*) from `results` where team_id = teamid) = 0) then
    insert into results(team_id, competition_id) values(teamid, new.competition_id);
  end if;

  -- calculate points for team (results)
  -- calculate place for team (results)
  -- calculate classification for team (team)
END