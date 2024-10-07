﻿using API.Models.DTO;
using API.Models.Entity;
using API.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using WebApiWithRoleAuthentication.Data;

namespace API.Repository.Implement
{
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext context;

        public CartRepository(AppDbContext context)
        {
            this.context = context;
        }

        public async Task<(List<CartDTO>, int)> getCart(string userId, int page)
        {
            if (!string.IsNullOrEmpty(userId))
            {
                

                var query = context.Carts
                                   .Where(p => p.UserId == userId)
                                   .AsQueryable();

                int totalItems = await query.CountAsync();

                // Apply pagination using Skip and Take
                var cartItems = await query
                    .Skip((page - 1) * 10)
                     .Take(10)
                    .Select(p => new CartDTO
                    {
                        Id = p.Id,
                        ProductName = p.Product.Name,
                        ProductId = p.ProductId,
                        Price = p.Product.Price.Value,
                        Quantity = p.Quantity,
                        Description = p.Product.Description,
                        Img = p.Product.Imgs.Any() ? p.Product.Imgs.FirstOrDefault().Url : null
                    })
                .ToListAsync();

                return (cartItems,totalItems);
            }

            return (new List<CartDTO>(), 0);
        }
    }

}
