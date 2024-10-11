using API.Models.Entity;
using API.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApiWithRoleAuthentication.Data;
using WebApiWithRoleAuthentication.Models.DTO;

namespace API.Repository.Implement
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext context;

        public ProductRepository(AppDbContext context)
        {
            this.context = context;
        }

      

        public async Task<(List<ProductDTO>, int)> GetAllAsync(string name, string categoryId, int page, int size)
        {
            var query = context.Products.AsQueryable();

            query = query.Where(p => p.IsActive == true);

            if (!string.IsNullOrEmpty(name))
            {
                var lowerCaseName = name.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(lowerCaseName));
            }

            if (!string.IsNullOrEmpty(categoryId))
            {
                query = query.Where(p => p.CategoryId == categoryId);
            }
            query = query.OrderBy(p => p.Name);
            int total = await query.CountAsync();

            var products = await query
                .Include(p => p.Imgs)
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();

            // Map to DTOs
            var productDTOs = products.Select(p => new ProductDTO
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price ?? 0,
                Quantity = p.Quantity.Value,
                Img = p.Imgs.FirstOrDefault()?.Url
            }).ToList();

            return (productDTOs, total);
        }

        public async Task<(List<ProductDTO>, int)> GetBestSale(string name, int page, int size)
        {
            // Join OrderItems with Products and group by ProductId
            var query = context.OrderItems
                .Where(oi => oi.Product.IsActive == true) // Ensure the product is active
                .GroupBy(oi => oi.ProductId)
                .Select(g => new
                {
                    ProductId = g.Key,
                    TotalQuantity = g.Sum(oi => oi.Quantity), // Sum quantities sold
                    Product = g.FirstOrDefault().Product // Get product details
                });

            if (!string.IsNullOrEmpty(name))
            {
                var lowerCaseName = name.ToLower();
                query = query.Where(g => g.Product.Name.ToLower().Contains(lowerCaseName));
            }

            int total = await query.CountAsync();

            // Order by total quantity sold and paginate results
            var products = await query
                .OrderByDescending(g => g.TotalQuantity) // Order by total quantity sold
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();

            // Map to DTOs
            var productDTOs = products.Select(p => new ProductDTO
            {
                Id = p.Product.Id,
                Name = p.Product.Name,
                Price = p.Product.Price ?? 0,
                QuantitySold = p.TotalQuantity, // Set the total quantity sold
                Quantity = p.Product.Quantity ?? 0,
                Img = p.Product.Imgs.FirstOrDefault()?.Url
            }).ToList();

            return (productDTOs, total);
        }

        public async Task<(List<ProductDTO>, int)> GetList(string name, string categoryId, string sorting, int page, int size)
        {
            var query = context.Products.AsQueryable();
            query = query.Where(p => p.IsActive == true);

            if (!string.IsNullOrEmpty(name))
            {
                var lowerCaseName = name.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(lowerCaseName));
            }

            if (!string.IsNullOrEmpty(categoryId))
            {
                query = query.Where(p => p.CategoryId == categoryId);
            }
            

            switch (sorting.ToLower())
            {
                
                case "price_asc":
                    query = query.OrderBy(p => p.Price);
                    break;
                case "price_desc":
                    query = query.OrderByDescending(p => p.Price);
                    break;
                default:
                    query = query.OrderBy(p => p.Name);
                    break;
            }


            int total = await query.CountAsync();

            var products = await query
                .Include(p => p.Imgs)
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();

            var productDTOs = products.Select(p => new ProductDTO
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price ?? 0,
                Quantity = p.Quantity.Value,
                Img = p.Imgs.FirstOrDefault()?.Url,
                CategoryId=p.CategoryId,
                Description=p.Description,
            }).ToList();

            return (productDTOs, total);

        }
    }
}
