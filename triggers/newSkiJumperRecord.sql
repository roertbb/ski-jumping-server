create procedure newSkiJumperRecord(IN person_id INTEGER, IN distnace FLOAT)
begin
	declare skijumperid int;
	select person_id INTO @skijumperid from `ski-jumpers` where person_id = new.person_id;
	IF (new.distance>(SELECT MAX(coalesce(personal_best,0)) FROM `ski-jumpers` where person_id = @skijumperid)) THEN
		UPDATE `ski-jumpers` SET personal_best=new.distance where person_id = @skijumperid;
	END IF;
end