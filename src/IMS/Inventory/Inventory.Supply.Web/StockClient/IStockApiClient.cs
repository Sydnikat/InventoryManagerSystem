using Inventory.Supply.Web.StockClient.DTOs.Responses;
using Microsoft.AspNetCore.Mvc;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Supply.Web.StockClient
{
    public interface IStockApiClient
    {
        [Get("/api/stock/categories")]
        Task<List<CategoryResponse>> GetCategoriesAsync();
    }
}
