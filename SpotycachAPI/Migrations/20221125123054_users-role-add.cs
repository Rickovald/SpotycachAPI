using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpotycachAPI.Migrations
{
    /// <inheritdoc />
    public partial class usersroleadd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Users",
                newName: "Role");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Role",
                table: "Users",
                newName: "Address");
        }
    }
}
