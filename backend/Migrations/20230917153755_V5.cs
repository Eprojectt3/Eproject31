using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class V5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "link",
                table: "Resorts",
                newName: "UpdateBy");

            migrationBuilder.RenameColumn(
                name: "link",
                table: "Hotels",
                newName: "Links");

            migrationBuilder.AddColumn<string>(
                name: "CreateBy",
                table: "Resorts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "Resorts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Links",
                table: "Resorts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateDate",
                table: "Resorts",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateBy",
                table: "Resorts");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "Resorts");

            migrationBuilder.DropColumn(
                name: "Links",
                table: "Resorts");

            migrationBuilder.DropColumn(
                name: "UpdateDate",
                table: "Resorts");

            migrationBuilder.RenameColumn(
                name: "UpdateBy",
                table: "Resorts",
                newName: "link");

            migrationBuilder.RenameColumn(
                name: "Links",
                table: "Hotels",
                newName: "link");
        }
    }
}
