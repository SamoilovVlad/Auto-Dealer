using Car_Dealer.Interfaces;
using Car_Dealer.Models;
using Car_Dealer.Services;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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

        [HttpGet("auto/info/{advId}")]
        public async Task<IActionResult> GetAuto(string advId)
        {
            AutoModel? auto = await _autoDatabaseService.GetAutoByAdvId(advId);
            return auto == null ? NotFound() : Ok(auto);
        }

        [HttpGet("{Maker}/Models/Cars")]
        public async Task<IActionResult> GetAutosByMakerName(string maker)
        {
            IQueryable<AutoModel?> autosQuery = await _autoDatabaseService.GetAutosByMakerNameAsync(maker);
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
            List<string?> models = await _autoDatabaseService.GetAllGenModelByMakerNameAsync(makerName);
            return models.Count > 0 ? Ok(models) : BadRequest();
        }

        [HttpGet("{makerName}/Models/{genModel}")]
        public async Task<IActionResult> GetAllAutosByMakerAndModelNames(string makerName, string genModel, int page = 0, int pageSize = 12, string bodyType = "", string gearBox = "", string fuelType = "", int minPrice = 0, int maxPrice = int.MaxValue)
        {
            IQueryable<AutoModel?> modelsQuery = await _autoDatabaseService.GetAllAutosByGenModelAsync(makerName, genModel);

            //Filtering
            if (!string.IsNullOrEmpty(bodyType.Trim()))
                modelsQuery = modelsQuery.Where(auto => auto.Bodytype == bodyType);
            if (!string.IsNullOrEmpty(gearBox.Trim()))
                modelsQuery = modelsQuery.Where(auto => auto.Gearbox == gearBox);
            if (!string.IsNullOrEmpty(fuelType.Trim()))
                modelsQuery = modelsQuery.Where(auto => auto.Fuel_type == fuelType);
            if (minPrice > 0 || maxPrice < int.MaxValue)
                modelsQuery = modelsQuery.Where(auto => auto.Price >= minPrice && auto.Price <= maxPrice);

            int autoCount = modelsQuery.Count();
            if (page > 0)
                modelsQuery = modelsQuery.Skip((page - 1) * pageSize).Take(pageSize);
            IEnumerable<AutoModel?> models = await modelsQuery.ToListAsync();
            return Ok(new { models, autoCount });
        }

        [HttpGet("modelInfo/{makerName}/{genModel}")]
        public async Task<IActionResult> GetAutoInfoByGenModel(string makerName, string genModel)
        {
            int count = await _autoDatabaseService.GetAutoCountByGenModelAsync(makerName, genModel);
            string bodyType = await _autoDatabaseService.GetModelBodyTypeAsync(makerName, genModel);
            int topSpeed = await _autoDatabaseService.GetModelTopSpeedAsync(makerName, genModel);
            int price = await _autoDatabaseService.GetModelAveragePriceAsync(makerName, genModel);
            var modelInfo = new
            {
                count = count,
                bodyType = bodyType,
                topSpeed = topSpeed,
                price = price
            };

            return Ok(modelInfo);
        }

        [HttpGet("images/{advId}")]
        public async Task<IActionResult> GetAutoImageNames(string advId)
        {
            IQueryable<AutoImageModel> imageQuery = await _autoDatabaseService.GetAutoImagesByAdvIdAsync(advId);
            List<AutoImageModel> autoImageModels = await imageQuery.ToListAsync();
            return autoImageModels.Count > 0 ? Ok(autoImageModels) : BadRequest();
        }

        [HttpGet("image/{makerName}/{genModel}")]
        public async Task<IActionResult> GetAutoImageName(string makerName, string genModel)
        {
            AutoImageModel? image = null;
            int numOfSkippedAuto = 0; // Variable to track the number of autos skipped when searching for an image || Not every auto have images
            while (image == null)
            {
                IQueryable<AutoModel?> autos = await _autoDatabaseService.GetAllAutosByGenModelAsync(makerName, genModel);
                string? advId = await autos
                                      .Select(auto => auto.Adv_ID)
                                      .Skip(numOfSkippedAuto)
                                      .FirstOrDefaultAsync();

                IQueryable<AutoImageModel> imagesQuery = await _autoDatabaseService.GetAutoImagesByAdvIdAsync(advId);
                image = await imagesQuery.FirstOrDefaultAsync(img => img.Predicted_viewpoint <= 90);
                numOfSkippedAuto++;
            }
            return image == null ? BadRequest("image == null") : Ok(image);
        }

        [HttpPost("filters/apply")]
        public async Task<IActionResult> FitersApply([FromBody] FilterOptions filterOptions)
        {
            IQueryable<AutoModel> autosQuery = _autoDatabaseService.GetAllAutos();
            autosQuery = autosQuery.FilterByBrand(filterOptions.Brand)
                                   .FilterByModel(filterOptions.Model);
                                   int a = autosQuery.Count();
                                   autosQuery=autosQuery.FilterByBodyType(filterOptions.BodyType)
                                   .FilterByColor(filterOptions.Color)
                                   .FilterByGearboxType(filterOptions.GearboxType)
                                   .FilterByFuelType(filterOptions.FuelType)
                                   .FilterByPriceRange(filterOptions.PriceFrom, filterOptions.PriceTo)
                                   .FilterByMilesRange(filterOptions.MilesFrom, filterOptions.MilesTo);
            a = autosQuery.Count();
            return Ok(autosQuery.Count());
        }

        [HttpPost("filteredAutos")]
        public async Task<IActionResult> GetFilteredAutos([FromBody] FilterOptions filterOptions)
        {
            IQueryable<AutoModel> autosQuery = _autoDatabaseService.GetAllAutos();
            autosQuery = autosQuery.FilterByBrand(filterOptions.Brand)
                                   .FilterByModel(filterOptions.Model)
                                   .FilterByBodyType(filterOptions.BodyType)
                                   .FilterByColor(filterOptions.Color)
                                   .FilterByGearboxType(filterOptions.GearboxType)
                                   .FilterByFuelType(filterOptions.FuelType)
                                   .FilterByPriceRange(filterOptions.PriceFrom, filterOptions.PriceTo)
                                   .FilterByMilesRange(filterOptions.MilesFrom, filterOptions.MilesTo);
            return Ok( new {autos = await autosQuery.Skip(--filterOptions.page * filterOptions.autoPerPage).Take(filterOptions.autoPerPage).ToListAsync(), totalCount=autosQuery.Count() });
        }


    }
}