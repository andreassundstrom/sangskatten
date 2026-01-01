using System;

namespace Sangskatten.Api.Dtos;

public class ScoreDto
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string[] Categories { get; set; } = Array.Empty<string>();
    public required string FileName { get; set; }
}
