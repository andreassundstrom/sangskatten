
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sangskatten.Api.Dtos;

namespace Sangskatten.Api.Controllers
{
    [Route("api/v1/sheet-music")]
    [ApiController]
    public class SheetMusicController : ControllerBase
    {
        private readonly Dictionary<int, ScoreDto> scoreIndex;

        public SheetMusicController()
        {
            var index = System.IO.File.ReadAllText("SheetMusic/_index.json");
            var score = JsonSerializer.Deserialize<ScoreDto[]>(index);
            ArgumentNullException.ThrowIfNull(score);
            scoreIndex = score.ToDictionary(e => e.Id);
        }

        [HttpGet]
        public async Task<ActionResult> GetSheetMusic()
        {
            return Ok(scoreIndex.Values);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetSheetMusic(int id)
        {
            if (!scoreIndex.TryGetValue(id, out ScoreDto? score))
            {
                return NotFound();
            }

            var fileContent = System.IO.File.ReadAllText($"SheetMusic/{score.FileName}");
            return Content(fileContent, MediaTypeNames.Application.Xml);
        }
    }
}
