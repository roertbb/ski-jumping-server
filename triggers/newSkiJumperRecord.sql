create procedure newSkiJumperRecord(IN prsnid INTEGER, IN distance FLOAT)
begin
	declare skijumperid int;
	select person_id INTO @skijumperid from `ski-jumpers` where person_id = prsnid;
	IF (distance>(SELECT MAX(coalesce(personal_best,0)) FROM `ski-jumpers` where person_id = @skijumperid)) THEN
		UPDATE `ski-jumpers` SET personal_best=distance where person_id = @skijumperid;
	END IF;
end