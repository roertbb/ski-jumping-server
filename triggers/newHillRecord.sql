CREATE TRIGGER newHillRecord 
AFTER INSERT ON `series-results` for each row
begin
	declare hillid int;
	select ski_jumping_hill_id INTO @hillid from `ski-jumping-hills` join  `competitions` using(ski_jumping_hill_id) where competition_id = new.competition_id;
	IF (new.distance>(SELECT MAX(coalesce(record,0)) FROM `ski-jumping-hills` where ski_jumping_hill_id = @hillid)) THEN
		UPDATE `ski-jumping-hills` SET record=new.distance where ski_jumping_hill_id = @hillid;
	END IF;
END