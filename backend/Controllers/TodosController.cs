using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using TodoApp.Models;

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly string _connection;
        public TodosController(IConfiguration config)
            => _connection = config.GetConnectionString("DefaultConnection")!;

        [HttpGet]
        public async Task<IEnumerable<Todo>> GetAll()
        {
            using var db = new SqlConnection(_connection);
            return await db.QueryAsync<Todo>("GetAllTodos", commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
