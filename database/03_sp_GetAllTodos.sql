USE TodoDB;
GO

CREATE OR ALTER PROCEDURE GetAllTodos
AS
BEGIN
    SELECT Id, Title, Description, Priority, IsComplete, CreatedAt
    FROM   Todos
    ORDER  BY Priority DESC, CreatedAt DESC;
END
GO