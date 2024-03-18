USE [scouting_7127]
GO

/****** Object:  Table [dbo].[Teams]    Script Date: 3/18/2024 11:13:51 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Teams](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[teamname] [nvarchar](250) NOT NULL,
	[globalid] [nvarchar](50) NOT NULL,
	[teamnumber] [nvarchar](50) NULL,
	[teamschool] [nvarchar](250) NULL,
	[alliancescore] [int] NULL,
	[indexid] [int] NULL,
	[localtimestamp] [datetime] NULL,
	[clienttimestamp] [datetime] NULL,
	[active] [bit] NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Teams] ADD  DEFAULT (getdate()) FOR [localtimestamp]
GO

CREATE TABLE [dbo].[Preferences](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[globalid] [nvarchar](50) NOT NULL,
	[match] [int] NOT NULL,
	[startingpos] [nchar](50) NULL,
	[Leaveszone] [nchar](10) NULL,
	[scores1amp] [nchar](10) NULL,
	[scores1speaker] [nchar](10) NULL,
	[picksup] [nchar](10) NULL,
	[scores2amp] [nchar](10) NULL,
	[scores2speaker] [nchar](10) NULL,
	[preferredScoringMethod] [nchar](10) NULL,
	[preferredIntakeMethod] [nchar](10) NULL,
	[prefintake] [nchar](10) NULL,
	[spotlight] [nchar](10) NULL,
	[trap] [nchar](10) NULL,
	[alone] [nchar](10) NULL,
	[hangsWithAnother] [nchar](10) NULL,
	[attemptsSpotlight] [nchar](10) NULL,
	[coop] [nchar](10) NULL,
	[moreinfo] [nvarchar](max) NULL,
	[localtimestamp] [datetime] NOT NULL,
	[clienttimestamp] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Preferences] ADD  CONSTRAINT [DF_Preferences_localtimestamp]  DEFAULT (getdate()) FOR [localtimestamp]
GO

CREATE TABLE [dbo].[Matches](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[rank] [nchar](10) NULL,
	[matchnumber] [nchar](10) NULL,
	[count1] [int] NULL,
	[count2] [int] NULL,
	[count3] [int] NULL,
	[count4] [int] NULL,
	[count5] [int] NULL,
	[count6] [int] NULL,
	[count7] [int] NULL,
	[stage] [nvarchar](50) NULL,
	[hangs] [nchar](10) NULL,
	[harmony] [nchar](10) NULL,
	[otherinfo] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


