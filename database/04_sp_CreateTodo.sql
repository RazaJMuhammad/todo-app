USE TodoDB;
GO

CREATE OR ALTER PROCEDURE CreateTodo
    @Title       NVARCHAR(200),
    @Description NVARCHAR(1000) = NULL,
    @Priority    INT            = 1
AS
BEGIN
    INSERT INTO Todos (Title, Description, Priority)
    VALUES (@Title, @Description, @Priority);

    SELECT SCOPE_IDENTITY() AS NewId;
END
GO