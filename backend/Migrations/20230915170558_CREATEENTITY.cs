using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class CREATEENTITY : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tour_Transportation_TransportationId",
                table: "Tour");

            migrationBuilder.RenameColumn(
                name: "TransportationId",
                table: "Tour",
                newName: "transportationId");

            migrationBuilder.RenameIndex(
                name: "IX_Tour_TransportationId",
                table: "Tour",
                newName: "IX_Tour_transportationId");

            migrationBuilder.AddColumn<int>(
                name: "quantity_limit",
                table: "Tour",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Tour_Transportation_transportationId",
                table: "Tour",
                column: "transportationId",
                principalTable: "Transportation",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tour_Transportation_transportationId",
                table: "Tour");

            migrationBuilder.DropColumn(
                name: "quantity_limit",
                table: "Tour");

            migrationBuilder.RenameColumn(
                name: "transportationId",
                table: "Tour",
                newName: "TransportationId");

            migrationBuilder.RenameIndex(
                name: "IX_Tour_transportationId",
                table: "Tour",
                newName: "IX_Tour_TransportationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tour_Transportation_TransportationId",
                table: "Tour",
                column: "TransportationId",
                principalTable: "Transportation",
                principalColumn: "Id");
        }
    }
}
