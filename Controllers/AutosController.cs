using Car_Dealer.Interfaces;
using Car_Dealer.Models;
using Car_Dealer.Services;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Car_Dealer.Controllers
{
    [Route("[controller]")]
    public class AutosController : ControllerBase
    {
        private readonly IAutoService _autoDatabaseService;

        public AutosController(IAutoService autoDatabaseService)
        {
            _autoDatabaseService = autoDatabaseService;
        }

        //Take an auto by Id
        [HttpGet("auto/{id}")]
        public async Task<IActionResult> GetAuto(string id)
        {
            AutoModel auto = await _autoDatabaseService.GetAutoById(id);

            if (auto == null)
            {
                return NotFound();
            }

            return Ok(auto);
        }

        [HttpGet("{Maker}/Models/Cars")]
        public async Task<IActionResult> GetAutosByMakerName(string maker)
        {
            IQueryable<AutoModel?> autosQuery = await _autoDatabaseService.GetAutosByMakerName(maker);
            List<AutoModel?> autos = await autosQuery.ToListAsync();  
            return autos.Count > 0 ? Ok(autos) : BadRequest();
        }
        //[HttpGet("AutoMakers")]
        //public async Task<IActionResult> GetAllAutoMakers()
        //{
        //    return Ok(await _autoDatabaseService.GetAllAutoMakers());

        //}
        [HttpGet("{makerName}/Models")]
        public async Task<IActionResult> GetAllGenModels(string makerName)
        {
            List<string> models = await _autoDatabaseService.GetAllGenModelByMakerName(makerName);
            return models.Count > 0 ? Ok(models) : BadRequest();
        }
        [HttpGet("{makerName}/Models/{genModel}")]
        public async Task<IActionResult> GetAllAutosFromGenModel(string makerName, string genModel)
        {
            IQueryable<AutoModel> modelsQuery = await _autoDatabaseService.GetAllAutosByGenModel(makerName, genModel);
            List<AutoModel> models = await modelsQuery.ToListAsync();
            return models.Count > 0 ? Ok(models) : BadRequest();
        }
        [HttpGet("modelInfo/{genModel}")]
        public async Task<IActionResult> GetAutoInfoByGenmodel(string genModel)
        {
            int count = await _autoDatabaseService.GetAutoCountByGenmodel(genModel);
            string bodyType = await _autoDatabaseService.GetModelBodyType(genModel);
            int topSpeed = await _autoDatabaseService.GetModelTopSpeed(genModel);
            int price = await _autoDatabaseService.GetModelAveragePrice(genModel);
            var modelInfo = new
            {
                count = count,
                bodyType = bodyType,
                topSpeed = topSpeed,
                price = price
            };

            return Ok(modelInfo);
        }

        [HttpGet("images/{id}")]
        public async Task<IActionResult> GetAutoImageNames(string id)
        {
            IQueryable<AutoImageModel> imageQuery = await _autoDatabaseService.GetAutoImagesByAutoID(id);
            List<AutoImageModel> autoImageModels = await imageQuery.ToListAsync();
            return autoImageModels.Count > 0 ? Ok(autoImageModels) : BadRequest();
        }
        [HttpGet("image/{genModel}")]
        public async Task<IActionResult> GetAutoImageName(string genModel)
        {
            AutoImageModel image = await _autoDatabaseService.GetAutoImageByAutoGenModel(genModel);
            return image == null ? BadRequest() : Ok(image);
        }

    }
}
