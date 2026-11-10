USE TodoDB;
GO

CREATE OR ALTER PROCEDURE UpdateTodo
    @Id          INT,
    @Title       NVARCHAR(200),
    @Description NVARCHAR(1000),
    @Priority    INT,
    @IsComplete  BIT
AS
BEGIN
    UPDATE Todos
    SET    Title       = @Title,
           Description = @Description,
           Priority    = @Priority,
           IsComplete  = @IsComplete
    WHERE  Id = @Id;
END
GO