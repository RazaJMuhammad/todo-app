USE TodoDB;
GO

IF OBJECT_ID('dbo.Todos', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Todos (
        Id          INT IDENTITY(1,1)  PRIMARY KEY,
        Title       NVARCHAR(200)      NOT NULL,
        Description NVARCHAR(1000)     NULL,
        Priority    INT                NOT NULL DEFAULT 1,
        IsComplete  BIT                NOT NULL DEFAULT 0,
        CreatedAt   DATETIME           NOT NULL DEFAULT GETDATE()
    );
END
GO