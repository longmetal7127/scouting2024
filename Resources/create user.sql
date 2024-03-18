USE [master]
GO

/* For security reasons the login is created disabled and with a random password. */
/****** Object:  Login [teams7127]    Script Date: 3/18/2024 11:14:03 AM ******/
CREATE LOGIN [teams7127] WITH PASSWORD=N'YAOnnO4/odkU0sQpXWcQzDYp2BQCVULxX8EEkrv6+ug=', DEFAULT_DATABASE=[master], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

ALTER LOGIN [teams7127] DISABLE
GO


